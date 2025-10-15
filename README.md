# MCP Framework Server

A generic, configurable MCP (Model Context Protocol) server that provides various analysis frameworks through JSON configuration. This server can be customized to create different types of analysis tools by simply changing the configuration file.

## Features

- **Configurable Frameworks**: Create custom analysis servers through JSON configuration
- **Built-in Frameworks**: 
  - Main Analyser Framework (configurable role and prompt)
  - Error Handling Framework
  - Self-Evaluation Framework (generic and configurable)
  - Security Guardrails Framework
  - Required Artifacts Framework
  - Template Mapping Framework (for template diagram access)
- **Template Support**: Use custom templates for artifact generation
- **JSON Configuration**: Easy setup and customization
- **Modular Design**: Enable/disable frameworks as needed

## Installation

```bash
npm install mcp-framework-server
```

## Quick Start

### 1. Basic Usage (Default Configuration)

```bash
npm start
```

### 2. Custom Configuration

```bash
# Use UI analysis configuration
npm run start:ui

# Use generic analysis configuration  
npm run start:generic

# Use your own configuration
node framework-server.js path/to/your-config.json
```

## MCP Server Setup (Cursor)

To use this framework as an MCP server in Cursor, add one of the following configurations to your Cursor settings:

### Option 1: Using Node Command

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

### Option 2: Using NPX Command

```json
{
  "mcpServers": {
    "mcp-framework-server": {
      "command": "npx",
      "args": [
        "mcp-framework-server",
        "/path/to/mcp-framework-server/config-examples/ui-analysis-config.json"
      ],
      "env": {}
    }
  }
}
```

**Note**: Update the paths in the configuration to match your local setup.

## Configuration

The server is configured through JSON files. Here's the structure:

```json
{
  "name": "your-framework-name",
  "version": "1.0.0",
  "description": "Your framework description",
  "frameworks": {
    "errorHandling": {
      "enabled": true,
      "title": "Error Handling Framework",
      "description": "Error handling for analysis tasks"
    },
    "selfEvaluation": {
      "enabled": true,
      "title": "Quality Assessment Framework",
      "description": "Quality assessment for analysis tasks",
      "metrics": {
        "accuracy": {
          "name": "Accuracy Score",
          "formula": "(Correct Items / Total Items) × 100",
          "target": 95,
          "weight": 1
        }
      },
      "overallScore": {
        "formula": "Average of all metrics",
        "passingThreshold": 90,
        "maxIterations": 3,
        "improvementThreshold": 5
      }
    },
    "securityGuardrails": {
      "enabled": true,
      "title": "Security Guardrails",
      "description": "Security protocols for analysis",
      "inputValidation": {
        "allowedDomains": ["*"],
        "blockedDomains": [],
        "contentTypes": ["text/html", "application/json"]
      },
      "promptInjectionProtection": {
        "enabled": true,
        "ignoreEmbeddedInstructions": true,
        "maintainFocus": true,
        "flagSuspiciousActivity": true
      },
      "outputSanitization": {
        "escapeOutput": true,
        "validateContent": true,
        "removeHarmfulContent": true
      }
    },
    "requiredArtifacts": {
      "enabled": true,
      "title": "Required Artifacts",
      "description": "Required output artifacts",
      "artifacts": [
        {
          "name": "analysis_data",
          "type": "csv",
          "filename": "analysis_data.csv",
          "template": "analysis-template.csv",
          "required": true
        }
      ]
    }
  },
  "templates": {
    "basePath": "./templates",
    "customTemplates": {}
  }
}
```

## Framework Configuration

### Main Analyser Framework

Configurable main analyser with custom role and prompt:

```json
{
  "mainAnalyser": {
    "enabled": true,
    "title": "EDS Block Analyser",
    "description": "Analyse the site and estimate the effort to implement the EDS blocks",
    "toolName": "eds_block_analyser",
    "role": "## Role Definition\nYou are a UI Architect...",
    "mainPrompt": "# UI Architect Prompt\n## Core Task\n..."
  }
}
```

### Error Handling Framework

Controls how errors are handled during analysis:

```json
{
  "errorHandling": {
    "enabled": true,
    "title": "Custom Error Handling",
    "description": "Error handling for your specific use case"
  }
}
```

### Self-Evaluation Framework

Configurable quality assessment with custom metrics:

```json
{
  "selfEvaluation": {
    "enabled": true,
    "title": "Quality Assessment",
    "description": "Quality assessment framework",
    "metrics": {
      "customMetric": {
        "name": "Custom Metric Name",
        "formula": "Your formula here",
        "target": 95,
        "weight": 1
      }
    },
    "overallScore": {
      "formula": "Average of all metrics",
      "passingThreshold": 90,
      "maxIterations": 3,
      "improvementThreshold": 5
    }
  }
}
```

### Security Guardrails Framework

Configurable security protocols:

```json
{
  "securityGuardrails": {
    "enabled": true,
    "title": "Security Guardrails",
    "description": "Security protocols",
    "inputValidation": {
      "allowedDomains": ["example.com", "trusted-site.com"],
      "blockedDomains": ["malicious-site.com"],
      "contentTypes": ["text/html", "application/json"]
    },
    "promptInjectionProtection": {
      "enabled": true,
      "ignoreEmbeddedInstructions": true,
      "maintainFocus": true,
      "flagSuspiciousActivity": true
    },
    "outputSanitization": {
      "escapeOutput": true,
      "validateContent": true,
      "removeHarmfulContent": true
    }
  }
}
```

### Required Artifacts Framework

Define required output artifacts:

```json
{
  "requiredArtifacts": {
    "enabled": true,
    "title": "Required Artifacts",
    "description": "Required output artifacts",
    "artifacts": [
      {
        "name": "analysis_data",
        "type": "csv",
        "filename": "analysis_data.csv",
        "template": "analysis-template.csv",
        "required": true
      },
      {
        "name": "summary_report",
        "type": "markdown",
        "filename": "summary_report.md",
        "template": "summary-template.md",
        "required": true
      }
    ]
  }
}
```

### Template Mapping Framework

Provides access to template mapping diagrams:

```json
{
  "templateMapping": {
    "enabled": true,
    "title": "Template Mapping Diagram",
    "description": "Access the generic template mapping diagram for website template analysis",
    "toolName": "template_mapping_diagram",
    "templateFile": "generic_template_mapping_diagram.md"
  }
}
```

## Example Configurations

### UI Analysis Configuration

For UI component analysis with specific metrics:

```bash
node framework-server.js config-examples/ui-analysis-config.json
```

### Generic Analysis Configuration

For general analysis tasks:

```bash
node framework-server.js config-examples/generic-analysis-config.json
```

## Templates

Templates are stored in the `templates/` directory and can be referenced in the configuration:

```
templates/
├── analysis-template.csv
├── summary-template.md
├── evaluation-template.md
└── README.md
```

## Creating Custom Frameworks

1. **Create a configuration file** based on the examples
2. **Define your metrics** in the self-evaluation framework
3. **Set up security rules** for your use case
4. **Define required artifacts** and their templates
5. **Run with your configuration**:

```bash
node framework-server.js your-config.json
```

## API

The server exposes the following tools based on your configuration:

- `main_analyser` (or custom tool name) - Main analysis tool with configurable role and prompt
- `error_handling_framework` - Error handling protocols
- `self_evaluation_framework` - Quality assessment metrics
- `security_guardrails_framework` - Security protocols
- `required_artifacts_framework` - Required output specifications
- `template_mapping_diagram` (or custom tool name) - Template mapping diagram access

## Development

### Project Structure

```
├── framework-server.js          # Main server implementation
├── config-examples/             # Example configurations
│   ├── ui-analysis-config.json
│   └── generic-analysis-config.json
├── templates/                   # Template files
│   ├── analysis-template.csv
│   ├── summary-template.md
│   └── evaluation-template.md
├── package.json
└── README.md
```

### Adding New Frameworks

To add a new framework:

1. Add the framework configuration to your JSON config
2. Implement the framework setup in `framework-server.js`
3. Create the framework content generation logic

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions:
- Check the configuration examples
- Review the template documentation
- Open an issue on GitHub