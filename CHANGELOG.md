# Changelog

## [2.0.0] - 2024-12-19

### 🎉 Major Release: Generic Framework Server

This is a complete rewrite of the EDS Block Analyser into a generic, configurable MCP Framework Server.

### ✨ New Features

- **Generic Framework Architecture**: Server can now be configured for any analysis task through JSON configuration
- **Configurable Frameworks**: All frameworks (error handling, self-evaluation, security, artifacts) are now configurable
- **JSON Configuration System**: Easy setup and customization through JSON files
- **Template Support**: Custom templates for artifact generation
- **Multiple Configuration Examples**: Pre-built configurations for different use cases
- **Modular Design**: Enable/disable frameworks as needed

### 🔧 Framework Improvements

#### Self-Evaluation Framework
- **Generic Metrics**: Configurable quality metrics instead of hardcoded EDS-specific ones
- **Custom Formulas**: Define your own scoring formulas
- **Flexible Targets**: Set custom target scores and thresholds
- **Weighted Scoring**: Assign weights to different metrics
- **Iteration Control**: Configure maximum iterations and improvement thresholds

#### Error Handling Framework
- **Configurable Error Types**: Define custom error handling for your use case
- **Escalation Rules**: Custom escalation triggers and protocols
- **Input Validation**: Configurable input validation rules

#### Security Guardrails Framework
- **Domain Restrictions**: Configure allowed/blocked domains
- **Content Type Validation**: Define acceptable content types
- **Prompt Injection Protection**: Configurable security measures
- **Output Sanitization**: Customizable output cleaning rules

#### Required Artifacts Framework
- **Dynamic Artifacts**: Define required artifacts through configuration
- **Template Integration**: Use custom templates for artifact generation
- **Multiple Formats**: Support for CSV, Markdown, and other formats
- **Dependency Management**: Define artifact dependencies

### 📦 Package Changes

- **New Name**: `mcp-framework-server` (was `eds-block-analyser-mcp-server`)
- **New Main File**: `framework-server.js` (was `index.js`)
- **New Version**: 2.0.0
- **Updated Dependencies**: Same MCP SDK dependency
- **New Scripts**: Multiple start scripts for different configurations

### 🗂️ File Structure Changes

```
├── framework-server.js          # New main server file
├── config-examples/             # New configuration examples
│   ├── ui-analysis-config.json
│   └── generic-analysis-config.json
├── templates/                   # Existing templates (unchanged)
├── test-framework.js           # New test script
├── MIGRATION_GUIDE.md          # New migration guide
├── CHANGELOG.md                # This file
├── README.md                   # Updated documentation
└── package.json                # Updated package configuration
```

### 🚀 Usage Changes

#### Before (EDS-specific)
```bash
npm install eds-block-analyser-mcp-server
node index.js
```

#### After (Generic framework)
```bash
npm install mcp-framework-server
node framework-server.js config-examples/ui-analysis-config.json
```

### 📋 Configuration Examples

#### UI Analysis Configuration
- Maintains EDS-specific metrics and thresholds
- Compatible with existing EDS analysis workflows
- Same tool names and interfaces

#### Generic Analysis Configuration
- Simplified metrics for general analysis tasks
- Flexible configuration for any analysis type
- Easy to customize for specific needs

### 🔄 Migration Path

- **Backward Compatible**: Tool names and interfaces remain the same
- **Easy Migration**: Use UI analysis configuration for EDS compatibility
- **Gradual Adoption**: Start with existing config, customize over time
- **Documentation**: Comprehensive migration guide provided

### 🛠️ Development Improvements

- **Test Script**: Automated testing of different configurations
- **Better Documentation**: Comprehensive README and examples
- **Error Handling**: Improved error handling and validation
- **Code Organization**: Cleaner, more maintainable code structure

### 📚 Documentation

- **README.md**: Complete usage guide and examples
- **MIGRATION_GUIDE.md**: Step-by-step migration instructions
- **CHANGELOG.md**: This detailed changelog
- **Configuration Examples**: Ready-to-use configuration files

### 🎯 Benefits

1. **Flexibility**: Create analysis tools for any domain
2. **Reusability**: Share configurations across projects
3. **Maintainability**: Single codebase for multiple analysis types
4. **Extensibility**: Easy to add new frameworks and features
5. **Customization**: Fine-tune every aspect of the analysis process

### 🔮 Future Roadmap

- Additional framework types
- More configuration options
- Enhanced template system
- Plugin architecture
- Community configuration sharing

---

## [1.0.9] - Previous Version

### EDS Block Analyser (Legacy)

The previous version was specifically designed for EDS (Experience Design System) block analysis with hardcoded frameworks and EDS-specific metrics.

### Features (Legacy)
- EDS-specific self-evaluation framework
- Hardcoded error handling
- Fixed security guardrails
- EDS-specific required artifacts
- Single-purpose design

### Migration
Users can migrate to the new version using the UI analysis configuration, which provides the same EDS analysis capabilities with added flexibility.
