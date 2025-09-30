#!/usr/bin/env node
/**
 * MCP Configuration Generator
 * 
 * This script generates MCP configuration for different clients
 * based on the current installation path.
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the current directory (where this script is located)
const currentDir = __dirname;
const frameworkServerPath = resolve(currentDir, 'framework-server.js');
const uiConfigPath = resolve(currentDir, 'config-examples', 'ui-analysis-config.json');
const genericConfigPath = resolve(currentDir, 'config-examples', 'generic-analysis-config.json');

console.log('🔧 MCP Framework Server Configuration Generator\n');

// Check if files exist
const filesExist = {
  frameworkServer: existsSync(frameworkServerPath),
  uiConfig: existsSync(uiConfigPath),
  genericConfig: existsSync(genericConfigPath)
};

console.log('📁 File Status:');
console.log(`Framework Server: ${filesExist.frameworkServer ? '✅' : '❌'} ${frameworkServerPath}`);
console.log(`UI Config: ${filesExist.uiConfig ? '✅' : '❌'} ${uiConfigPath}`);
console.log(`Generic Config: ${filesExist.genericConfig ? '✅' : '❌'} ${genericConfigPath}`);

if (!filesExist.frameworkServer) {
  console.log('\n❌ Framework server not found. Please ensure you are in the correct directory.');
  process.exit(1);
}

console.log('\n📋 MCP Configuration Examples:\n');

// Generate configurations
const configs = {
  cursor: {
    name: 'Cursor Configuration',
    description: 'Add this to your Cursor MCP settings',
    configs: {
      default: {
        name: 'Default Configuration',
        config: {
          mcpServers: {
            'mcp-framework-server': {
              command: 'node',
              args: [frameworkServerPath],
              env: {}
            }
          }
        }
      },
      ui: {
        name: 'UI Analysis Configuration (EDS-compatible)',
        config: {
          mcpServers: {
            'mcp-framework-server': {
              command: 'node',
              args: [frameworkServerPath, uiConfigPath],
              env: {}
            }
          }
        }
      },
      generic: {
        name: 'Generic Analysis Configuration',
        config: {
          mcpServers: {
            'mcp-framework-server': {
              command: 'node',
              args: [frameworkServerPath, genericConfigPath],
              env: {}
            }
          }
        }
      }
    }
  },
  claude: {
    name: 'Claude Desktop Configuration',
    description: 'Add this to your Claude Desktop MCP settings',
    configs: {
      ui: {
        name: 'UI Analysis Configuration',
        config: {
          mcpServers: {
            'mcp-framework-server': {
              command: 'node',
              args: [frameworkServerPath, uiConfigPath]
            }
          }
        }
      }
    }
  }
};

// Display configurations
Object.entries(configs).forEach(([client, clientConfig]) => {
  console.log(`## ${clientConfig.name}`);
  console.log(`${clientConfig.description}\n`);
  
  Object.entries(clientConfig.configs).forEach(([configName, configData]) => {
    console.log(`### ${configData.name}`);
    console.log('```json');
    console.log(JSON.stringify(configData.config, null, 2));
    console.log('```\n');
  });
});

// Generate multiple servers configuration
console.log('## Multiple Framework Servers');
console.log('You can run multiple instances with different configurations:\n');

const multipleConfig = {
  mcpServers: {
    'ui-analysis-framework': {
      command: 'node',
      args: [frameworkServerPath, uiConfigPath],
      env: {}
    },
    'generic-analysis-framework': {
      command: 'node',
      args: [frameworkServerPath, genericConfigPath],
      env: {}
    }
  }
};

console.log('```json');
console.log(JSON.stringify(multipleConfig, null, 2));
console.log('```\n');

// Available tools
console.log('## Available Tools');
console.log('Once configured, the server will expose these tools:\n');
console.log('- `error_handling_framework` - Error handling protocols');
console.log('- `self_evaluation_framework` - Quality assessment metrics');
console.log('- `security_guardrails_framework` - Security protocols');
console.log('- `required_artifacts_framework` - Required output specifications\n');

// Installation instructions
console.log('## Installation Instructions');
console.log('1. Copy the configuration above to your MCP client settings');
console.log('2. Update the file paths to match your installation');
console.log('3. Restart your MCP client');
console.log('4. Verify the framework tools are available\n');

// Test command
console.log('## Test Your Configuration');
console.log('You can test the server manually with:\n');
console.log(`node "${frameworkServerPath}" "${uiConfigPath}"\n`);

console.log('🎉 Configuration generation complete!');
console.log('Copy the appropriate configuration to your MCP client settings.');
