# Using MCP Framework Server with NPX

This guide shows you how to use the MCP Framework Server with `npx` for easier setup and usage.

## Quick Start with NPX

### 1. Direct NPX Usage (No Installation)

```bash
# Use with UI analysis configuration
npx mcp-framework-server config-examples/ui-analysis-config.json

# Use with generic analysis configuration  
npx mcp-framework-server config-examples/generic-analysis-config.json

# Use with default configuration
npx mcp-framework-server
```

### 2. NPX with MCP Client Configuration

For Cursor or other MCP clients, you can use NPX in your configuration:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "mcp-framework-server",
        "/path/to/config-examples/ui-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

## NPX Configuration Examples

### Option 1: UI Analysis Configuration
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "mcp-framework-server",
        "/Users/kalimuthua/Projects/ui-competency/mcp-framework/mcp-eds-block-analyser/config-examples/ui-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

### Option 2: Generic Analysis Configuration
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "mcp-framework-server",
        "/Users/kalimuthua/Projects/ui-competency/mcp-framework/mcp-eds-block-analyser/config-examples/generic-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

### Option 3: Default Configuration
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": ["mcp-framework-server"],
      "env": {}
    }
  }
}
```

## NPX with Custom Configurations

### Using Local Config Files
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "mcp-framework-server",
        "/path/to/your/custom-config.json"
      ],
      "env": {}
    }
  }
}
```

### Using Remote Config Files
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "mcp-framework-server",
        "https://raw.githubusercontent.com/your-repo/config.json"
      ],
      "env": {}
    }
  }
}
```

## NPX with Environment Variables

### Using Environment Variables for Config
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": ["mcp-framework-server"],
      "env": {
        "MCP_FRAMEWORK_CONFIG": "/path/to/your/config.json"
      }
    }
  }
}
```

### Using Environment Variables for Customization
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": ["mcp-framework-server"],
      "env": {
        "MCP_FRAMEWORK_CONFIG": "/path/to/config.json",
        "NODE_ENV": "production",
        "DEBUG": "mcp-framework"
      }
    }
  }
}
```

## Multiple NPX Instances

You can run multiple instances with different configurations:

```json
{
  "mcpServers": {
    "ui-analysis-framework": {
      "command": "npx",
      "args": [
        "mcp-framework-server",
        "/path/to/ui-analysis-config.json"
      ],
      "env": {}
    },
    "generic-analysis-framework": {
      "command": "npx",
      "args": [
        "mcp-framework-server",
        "/path/to/generic-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

## NPX with Different Versions

### Using Specific Version
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "mcp-framework-server@2.0.0",
        "/path/to/config.json"
      ],
      "env": {}
    }
  }
}
```

### Using Latest Version
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "mcp-framework-server@latest",
        "/path/to/config.json"
      ],
      "env": {}
    }
  }
}
```

## NPX with Global Installation

If you install globally:

```bash
npm install -g mcp-framework-server
```

Then use:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "mcp-framework-server",
      "args": ["/path/to/config.json"],
      "env": {}
    }
  }
}
```

## NPX with Local Development

For local development, you can use NPX with the local package:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "./framework-server.js",
        "./config-examples/ui-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

## NPX with Package Scripts

You can also use NPX with package scripts:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "npm",
        "run",
        "start:ui",
        "--prefix",
        "/path/to/mcp-framework-server"
      ],
      "env": {}
    }
  }
}
```

## Benefits of Using NPX

### 1. **No Installation Required**
- Run directly without installing
- Always get the latest version
- No global package pollution

### 2. **Easy Updates**
- Automatic updates when using `@latest`
- No need to manually update
- Always use the most recent version

### 3. **Version Control**
- Use specific versions with `@version`
- Test different versions easily
- Rollback to previous versions if needed

### 4. **Clean Environment**
- No global dependencies
- Isolated execution
- Easy cleanup

## NPX Troubleshooting

### Common Issues

1. **"Package not found"**
   - Ensure the package is published to npm
   - Check the package name is correct
   - Verify you have internet connection

2. **"Permission denied"**
   - Run with `--yes` flag: `npx --yes mcp-framework-server`
   - Check file permissions
   - Ensure Node.js is installed

3. **"Config file not found"**
   - Use absolute paths for config files
   - Check file exists and is readable
   - Verify JSON syntax is valid

### Debug Mode with NPX

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "--node-options=--inspect",
        "mcp-framework-server",
        "/path/to/config.json"
      ],
      "env": {}
    }
  }
}
```

## Example NPX Commands

### Test the Server
```bash
# Test with UI config
npx mcp-framework-server config-examples/ui-analysis-config.json

# Test with generic config
npx mcp-framework-server config-examples/generic-analysis-config.json

# Test with default config
npx mcp-framework-server
```

### Debug Mode
```bash
# Debug with inspect
npx --node-options=--inspect mcp-framework-server config.json

# Debug with verbose logging
DEBUG=mcp-framework npx mcp-framework-server config.json
```

## Next Steps

1. **Choose your NPX configuration** based on your needs
2. **Update the paths** to match your setup
3. **Add to your MCP client** settings
4. **Test the configuration** to ensure it works
5. **Start using the frameworks** for your analysis tasks

## Support

If you encounter issues with NPX:
1. Check the troubleshooting section above
2. Verify your configuration and paths
3. Test the server manually with NPX
4. Check the console for error messages
5. Ensure the package is published and accessible
