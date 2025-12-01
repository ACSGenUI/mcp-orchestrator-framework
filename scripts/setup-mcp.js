import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const cursorDir = path.join(os.homedir(), '.cursor');
const cursorMcpPath = path.join(cursorDir, 'mcp.json');

const ideSupportDirectories = (() => {
  const home = os.homedir();
  const platform = process.platform;

  if (platform === 'darwin') {
    const base = path.join(home, 'Library', 'Application Support');
    return [
      path.join(base, 'Cursor'),
      path.join(base, 'Code'),
      path.join(base, 'Code - Insiders')
    ];
  }

  if (platform === 'win32') {
    const base = path.join(home, 'AppData', 'Roaming');
    return [
      path.join(base, 'Cursor'),
      path.join(base, 'Code'),
      path.join(base, 'Code - Insiders')
    ];
  }

  // Default to Linux/Unix-style paths
  const configDir = path.join(home, '.config');
  return [
    path.join(configDir, 'Cursor'),
    path.join(configDir, 'Code'),
    path.join(configDir, 'Code - Insiders')
  ];
})();

const acsSettingsCandidates = ideSupportDirectories.map((supportDir) =>
  path.join(
    supportDir,
    'User',
    'globalStorage',
    'acs-copilot-agent.acs-copilot-agent',
    'settings',
    'acs_copilot_mcp_settings.json'
  )
);

const frameworkServer = path.join(repoRoot, 'framework-server.js');
const configPath = (relativePath) => path.join(repoRoot, relativePath);

const requiredServers = {
  GitKraken: {
    command: path.join(
      os.homedir(),
      'Library',
      'Application Support',
      'Cursor',
      'User',
      'globalStorage',
      'eamodio.gitlens',
      'gk'
    ),
    type: 'stdio',
    name: 'GitKraken',
    args: ['mcp', '--host=cursor', '--source=gitlens', '--scheme=cursor'],
    env: {}
  },
  'mcp-ui-audit-tool': {
    command: 'node',
    args: [frameworkServer, configPath('config-examples/ui-audit-config.json')],
    env: {}
  },
  'aem-block-collection': {
    command: 'npx',
    args: ['https://github.com/ACSGenUI/mcp-block-collection#main'],
    env: {}
  },
  webresearch: {
    command: 'npx',
    args: ['-y', '@mzxrai/mcp-webresearch@latest']
  },
  'eds-block-analysis-framework': {
    command: 'node',
    args: [frameworkServer, configPath('config-examples/eds-block-analysis-config.json')],
    env: {}
  },
  'component-inventory-framework': {
    command: 'node',
    args: [frameworkServer, configPath('config-examples/component-inventory-config.json')],
    env: {}
  },
  'chrome-devtools': {
    command: 'npx',
    args: ['chrome-devtools-mcp@latest']
  }
};

const deepMerge = (target, source) => {
  if (!source) {
    return target;
  }

  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      typeof target[key] === 'object' &&
      target[key] !== null &&
      !Array.isArray(target[key])
    ) {
      target[key] = deepMerge({ ...target[key] }, value);
    } else {
      target[key] = value;
    }
  }

  return target;
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const pathExists = async (targetPath) => {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const resolveAcsSettingsTargets = async () => {
  const resolved = [];

  for (const candidate of acsSettingsCandidates) {
    const parentDir = path.dirname(candidate);
    const fileExists = await pathExists(candidate);
    const parentExists = fileExists || (await pathExists(parentDir));

    if (parentExists) {
      resolved.push(candidate);
    }
  }

  if (resolved.length === 0 && acsSettingsCandidates.length > 0) {
    resolved.push(acsSettingsCandidates[0]);
  }

  return resolved;
};

const readConfigFile = async (targetPath) => {
  try {
    const content = await fs.readFile(targetPath, 'utf8');
    if (!content.trim()) {
      return { mcpServers: {} };
    }
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { mcpServers: {} };
    }
    throw error;
  }
};

const writeConfigFile = async (targetPath, config) => {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
};

const ensureServers = (config, overrides = {}) => {
  if (!config.mcpServers || typeof config.mcpServers !== 'object') {
    config.mcpServers = {};
  }

  const addedServers = [];
  for (const [name, serverConfig] of Object.entries(requiredServers)) {
    if (!config.mcpServers[name]) {
      const baseConfig = clone(serverConfig);
      config.mcpServers[name] = overrides[name]
        ? deepMerge(baseConfig, overrides[name])
        : baseConfig;
      addedServers.push(name);
    }
  }

  return addedServers;
};

const main = async () => {
  const acsSettingsTargets = await resolveAcsSettingsTargets();
  const targets = [
    {
      path: cursorMcpPath,
      overrides: {}
    },
    ...acsSettingsTargets.map((targetPath) => ({
      path: targetPath,
      overrides: {
        'mcp-ui-audit-tool': {
          autoApprove: ['ui_audit_analyzer']
        }
      }
    }))
  ];

  for (const { path: targetPath, overrides } of targets) {
    try {
      const config = await readConfigFile(targetPath);
      const addedServers = ensureServers(config, overrides);

      if (addedServers.length > 0) {
        await writeConfigFile(targetPath, config);
        console.log(
          `Added missing MCP servers (${addedServers.join(', ')}) to ${targetPath}`
        );
      } else {
        console.log(`All required MCP servers already exist in ${targetPath}`);
      }
    } catch (error) {
      console.warn(
        `Skipped ${targetPath} because it could not be updated (${error.message})`
      );
    }
  }
};

main().catch((error) => {
  console.error(`Failed to update MCP config: ${error.message}`);
  process.exitCode = 1;
});

