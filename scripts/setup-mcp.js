import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const cursorDir = path.join(os.homedir(), '.cursor');
const targetPath = path.join(cursorDir, 'mcp.json');

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

const readExistingConfig = async () => {
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

const writeConfig = async (config) => {
  await fs.mkdir(cursorDir, { recursive: true });
  await fs.writeFile(targetPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
};

const ensureServers = (config) => {
  if (!config.mcpServers || typeof config.mcpServers !== 'object') {
    config.mcpServers = {};
  }

  const addedServers = [];
  for (const [name, serverConfig] of Object.entries(requiredServers)) {
    if (!config.mcpServers[name]) {
      config.mcpServers[name] = serverConfig;
      addedServers.push(name);
    }
  }

  return addedServers;
};

const main = async () => {
  const config = await readExistingConfig();
  const addedServers = ensureServers(config);

  if (addedServers.length > 0) {
    await writeConfig(config);
    console.log(
      `Added missing MCP servers (${addedServers.join(', ')}) to ${targetPath}`
    );
  } else {
    console.log(`All required MCP servers already exist in ${targetPath}`);
  }
};

main().catch((error) => {
  console.error(`Failed to update MCP config: ${error.message}`);
  process.exitCode = 1;
});

