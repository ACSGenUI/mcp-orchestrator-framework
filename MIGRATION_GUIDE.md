# Migration Guide: From EDS Block Analyser to MCP Framework Server

This guide helps you migrate from the EDS-specific block analyser to the new generic MCP Framework Server.

## What Changed

### Package Name
- **Old**: `eds-block-analyser-mcp-server`
- **New**: `mcp-framework-server`

### Main File
- **Old**: `index.js`
- **New**: `framework-server.js`

### Configuration
- **Old**: Hardcoded EDS-specific frameworks
- **New**: JSON configuration files

## Migration Steps

### 1. Update Package

```bash
# Uninstall old package
npm uninstall eds-block-analyser-mcp-server

# Install new package
npm install mcp-framework-server
```

### 2. Update Scripts

**Old package.json:**
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

**New package.json:**
```json
{
  "scripts": {
    "start": "node framework-server.js",
    "start:ui": "node framework-server.js config-examples/ui-analysis-config.json",
    "start:generic": "node framework-server.js config-examples/generic-analysis-config.json"
  }
}
```

### 3. Use UI Analysis Configuration

For EDS block analysis, use the UI analysis configuration:

```bash
# Start with UI analysis configuration (equivalent to old EDS analyser)
npm run start:ui

# Or directly
node framework-server.js config-examples/ui-analysis-config.json
```

### 4. Customize Configuration

Create your own configuration file based on the UI analysis example:

```json
{
  "name": "my-eds-analyser",
  "version": "1.0.0",
  "description": "My custom EDS block analyser",
  "frameworks": {
    "errorHandling": {
      "enabled": true,
      "title": "EDS Analysis Error Handling",
      "description": "Error handling for EDS block analysis"
    },
    "selfEvaluation": {
      "enabled": true,
      "title": "EDS Component Quality Assessment",
      "description": "Quality assessment for EDS components",
      "metrics": {
        "componentCoverage": {
          "name": "Component Coverage Score",
          "formula": "(Identified Components / Total Visible Components) × 100",
          "target": 100,
          "weight": 1
        },
        "sizingConsistency": {
          "name": "Sizing Consistency Score",
          "formula": "100 - (Standard Deviation of Similar Component Sizes × 20)",
          "target": 95,
          "weight": 1
        },
        "reusabilityAssessment": {
          "name": "Reusability Assessment Score",
          "formula": "(Reusable Components / Total Components) × 100",
          "target": 90,
          "weight": 1
        },
        "technicalFeasibility": {
          "name": "Technical Feasibility Score",
          "formula": "(Feasible Components / Total Components) × 100",
          "target": 100,
          "weight": 1
        },
        "accessibilityCoverage": {
          "name": "Accessibility Coverage Score",
          "formula": "(Components with A11y Notes / Interactive Components) × 100",
          "target": 100,
          "weight": 1
        },
        "performanceOptimization": {
          "name": "Performance Optimization Score",
          "formula": "(Components with Perf Considerations / Total Components) × 100",
          "target": 80,
          "weight": 1
        }
      },
      "overallScore": {
        "formula": "Average of all metrics",
        "passingThreshold": 95,
        "maxIterations": 3,
        "improvementThreshold": 5
      }
    },
    "securityGuardrails": {
      "enabled": true,
      "title": "EDS Analysis Security Guardrails",
      "description": "Security guardrails for EDS block analysis",
      "inputValidation": {
        "allowedDomains": ["*"],
        "blockedDomains": [],
        "contentTypes": ["text/html", "application/json", "text/plain"]
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
      "title": "EDS Analysis Required Artifacts",
      "description": "Required artifacts for EDS block analysis",
      "artifacts": [
        {
          "name": "ui_blocks_analysis",
          "type": "csv",
          "filename": "ui_blocks_analysis.csv",
          "template": "ui-blocks-analysis-template.csv",
          "required": true
        },
        {
          "name": "analysis_summary",
          "type": "markdown",
          "filename": "analysis_summary.md",
          "template": "analysis-summary-template.md",
          "required": true
        },
        {
          "name": "evaluation_log",
          "type": "markdown",
          "filename": "evaluation_log.md",
          "template": "evaluation-log-template.md",
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

## Framework Mapping

### Old EDS-Specific Frameworks → New Generic Frameworks

| Old Framework | New Framework | Configuration |
|---------------|---------------|---------------|
| `self_evaluation_framework` | `selfEvaluation` | Customizable metrics |
| `error_handling_framework` | `errorHandling` | Configurable error handling |
| `security_guardrails_framework` | `securityGuardrails` | Configurable security rules |
| `required_artifacts_framework` | `requiredArtifacts` | Configurable artifacts |

### Tool Names

The tool names remain the same:
- `error_handling_framework`
- `self_evaluation_framework`
- `security_guardrails_framework`
- `required_artifacts_framework`

## Benefits of Migration

### 1. Flexibility
- Configure frameworks for any analysis task
- Customize metrics and thresholds
- Add/remove frameworks as needed

### 2. Reusability
- Use the same server for different analysis types
- Share configurations across projects
- Easy to create new analysis tools

### 3. Maintainability
- Single codebase for multiple analysis types
- Centralized framework management
- Easier updates and bug fixes

## Backward Compatibility

The new server maintains backward compatibility for:
- Tool names and interfaces
- Framework content structure
- Template usage

## Troubleshooting

### Common Issues

1. **Configuration not found**
   - Ensure the config file path is correct
   - Check JSON syntax is valid

2. **Frameworks not loading**
   - Verify framework is enabled in config
   - Check framework configuration structure

3. **Templates not found**
   - Ensure template files exist in the specified path
   - Check template file names match configuration

### Getting Help

- Check the configuration examples
- Review the README.md
- Open an issue on GitHub

## Example Migration

### Before (EDS-specific)
```bash
# Old way
npm install eds-block-analyser-mcp-server
node index.js
```

### After (Generic framework)
```bash
# New way
npm install mcp-framework-server
node framework-server.js config-examples/ui-analysis-config.json
```

The new approach gives you the same EDS analysis capabilities but with the flexibility to customize and extend the frameworks as needed.
