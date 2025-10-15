# MCP Client Setup Guide

This guide shows you how to configure the MCP Framework Server with different MCP clients.

## Quick Setup for Cursor

### 1. Copy the Configuration

Copy this configuration to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/path/to/mcp-framework-server/framework-server.js",
        "/path/to/mcp-framework-server/config-examples/ui-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

### 2. Update Paths

Replace the paths with your actual installation paths:
- Update `/path/to/mcp-framework-server/` with your actual installation path
- Or use relative paths if the server is in your project

### 3. Restart Cursor

After adding the configuration, restart Cursor to load the new MCP server.

## Configuration Options

### Option 1: UI Analysis (EDS-compatible)
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/path/to/framework-server.js",
        "/path/to/config-examples/ui-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

### Option 2: Generic Analysis
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/path/to/framework-server.js",
        "/path/to/config-examples/generic-analysis-config.json"
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
      "command": "node",
      "args": ["/path/to/framework-server.js"],
      "env": {}
    }
  }
}
```

### Option 4: Custom Configuration
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/path/to/framework-server.js",
        "/path/to/your/custom-config.json"
      ],
      "env": {}
    }
  }
}
```

## Multiple Framework Servers

You can run multiple instances with different configurations:

```json
{
  "mcpServers": {
    "ui-analysis-framework": {
      "command": "node",
      "args": [
        "/path/to/framework-server.js",
        "/path/to/config-examples/ui-analysis-config.json"
      ],
      "env": {}
    },
    "generic-analysis-framework": {
      "command": "node",
      "args": [
        "/path/to/framework-server.js",
        "/path/to/config-examples/generic-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

## Available Tools

Once configured, you'll have access to these tools:

- **`error_handling_framework`** - Error handling protocols and guidelines
- **`self_evaluation_framework`** - Quality assessment metrics and scoring
- **`security_guardrails_framework`** - Security protocols and validation
- **`required_artifacts_framework`** - Required output specifications and templates

## Testing Your Setup

### 1. Manual Test
Test the server manually:
```bash
node /path/to/framework-server.js /path/to/config.json
```

### 2. Check Tools in Client
In your MCP client, verify that the framework tools are available:
- Look for the framework tools in your tool list
- Try calling one of the framework tools to ensure it works

### 3. Example Usage
Once configured, you can use the tools like:
- "Show me the error handling framework"
- "What are the self-evaluation metrics?"
- "What security guardrails are in place?"
- "What artifacts are required?"

## Troubleshooting

### Common Issues

1. **"Command not found"**
   - Ensure Node.js is installed and in your PATH
   - Check that the paths are correct

2. **"File not found"**
   - Verify the framework-server.js path is correct
   - Check that the config file exists

3. **"Permission denied"**
   - Ensure the files are readable
   - Check file permissions

4. **Server not starting**
   - Check the console for error messages
   - Verify the configuration JSON is valid

### Debug Mode

To run in debug mode, modify the command:
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "--inspect",
        "/path/to/framework-server.js",
        "/path/to/config.json"
      ],
      "env": {}
    }
  }
}
```

## Path Examples

### macOS/Linux
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/Users/username/projects/mcp-framework-server/framework-server.js",
        "/Users/username/projects/mcp-framework-server/config-examples/ui-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

### Windows
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "C:\\Users\\username\\projects\\mcp-framework-server\\framework-server.js",
        "C:\\Users\\username\\projects\\mcp-framework-server\\config-examples\\ui-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

## Claude Desktop Setup

For Claude Desktop, use the same configuration format:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/path/to/framework-server.js",
        "/path/to/config-examples/ui-analysis-config.json"
      ]
    }
  }
}
```

## Environment Variables

You can also use environment variables:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": ["/path/to/framework-server.js"],
      "env": {
        "MCP_FRAMEWORK_CONFIG": "/path/to/your/config.json"
      }
    }
  }
}
```

## Next Steps

1. **Choose your configuration** based on your needs
2. **Update the paths** to match your installation
3. **Add to your MCP client** settings
4. **Restart your client** to load the server
5. **Test the tools** to ensure everything works
6. **Start using the frameworks** for your analysis tasks

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your paths and configuration
3. Test the server manually
4. Check the console for error messages
5. Review the documentation for your specific MCP client
