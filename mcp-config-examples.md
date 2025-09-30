# MCP Configuration Examples

This document provides MCP configuration examples for different clients to use the MCP Framework Server.

## Cursor Configuration

Add this to your Cursor settings (usually in `~/.cursor/mcp.json` or similar):

### Basic Configuration (Default)
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": ["/path/to/mcp-framework-server/framework-server.js"],
      "env": {}
    }
  }
}
```

### UI Analysis Configuration (EDS-compatible)
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

### Generic Analysis Configuration
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/path/to/mcp-framework-server/framework-server.js",
        "/path/to/mcp-framework-server/config-examples/generic-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

### Custom Configuration
```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/path/to/mcp-framework-server/framework-server.js",
        "/path/to/your/custom-config.json"
      ],
      "env": {}
    }
  }
}
```

## Claude Desktop Configuration

For Claude Desktop, add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "/path/to/mcp-framework-server/framework-server.js",
        "/path/to/mcp-framework-server/config-examples/ui-analysis-config.json"
      ]
    }
  }
}
```

## Global Installation Configuration

If you install the package globally:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "mcp-framework-server",
      "args": ["/path/to/your/config.json"],
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
        "/path/to/mcp-framework-server/framework-server.js",
        "/path/to/mcp-framework-server/config-examples/ui-analysis-config.json"
      ],
      "env": {}
    },
    "generic-analysis-framework": {
      "command": "node",
      "args": [
        "/path/to/mcp-framework-server/framework-server.js",
        "/path/to/mcp-framework-server/config-examples/generic-analysis-config.json"
      ],
      "env": {}
    },
    "custom-framework": {
      "command": "node",
      "args": [
        "/path/to/mcp-framework-server/framework-server.js",
        "/path/to/your/custom-config.json"
      ],
      "env": {}
    }
  }
}
```

## Environment Variables

You can also use environment variables for configuration:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": ["/path/to/mcp-framework-server/framework-server.js"],
      "env": {
        "MCP_FRAMEWORK_CONFIG": "/path/to/your/config.json"
      }
    }
  }
}
```

## Available Tools

Once configured, the server will expose these tools based on your configuration:

- `error_handling_framework` - Error handling protocols
- `self_evaluation_framework` - Quality assessment metrics  
- `security_guardrails_framework` - Security protocols
- `required_artifacts_framework` - Required output specifications

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

## Testing Your Configuration

After adding the configuration:

1. Restart your MCP client (Cursor, Claude Desktop, etc.)
2. Check that the server starts without errors
3. Verify that the framework tools are available
4. Test with a simple query to ensure everything works

## Troubleshooting

### Common Issues

1. **Path not found**: Ensure the paths to `framework-server.js` and config files are correct
2. **Permission denied**: Make sure the files are executable and accessible
3. **Node not found**: Ensure Node.js is installed and in your PATH
4. **Config file not found**: Verify the configuration file path is correct

### Debug Mode

To run in debug mode, you can modify the command:

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "node",
      "args": [
        "--inspect",
        "/path/to/mcp-framework-server/framework-server.js",
        "/path/to/config.json"
      ],
      "env": {}
    }
  }
}
```

This will start the server in debug mode, allowing you to attach a debugger if needed.
