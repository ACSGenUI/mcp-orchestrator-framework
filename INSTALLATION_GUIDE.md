# EDS Block Analyser MCP Server - Installation Guide

## Overview

The EDS Block Analyser is a Model Context Protocol (MCP) server that provides comprehensive UI architecture analysis for converting Figma designs or web pages into reusable UI code blocks. This tool integrates with VS Code through the ProGenTeam extension to provide AI-powered website analysis, component extraction, and effort estimation.

## What This Tool Does

- **Complete Website Analysis**: Automatically discovers and analyzes all website URLs
- **Component Structure Extraction**: Identifies and categorizes UI components from web pages
- **EDS Block Mapping**: Maps components to Adobe's Experience Design System (EDS) block collection
- **Effort Estimation**: Provides T-shirt sizing (S-Simple, M-Medium, C-Complex) for implementation complexity
- **Comprehensive Reporting**: Generates CSV analysis, summary reports, and evaluation logs
- **Quality Assurance**: Built-in quality gates and validation at each analysis phase

## Prerequisites

### System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux
- **Node.js**: Version 18.0.0 or higher
- **VS Code**: Latest version (1.80+)
- **Internet Connection**: Required for web scraping and analysis

### Required Software
1. **Node.js** (Download from [nodejs.org](https://nodejs.org/))
2. **VS Code** (Download from [code.visualstudio.com](https://code.visualstudio.com/))
3. **ProGenTeam Extension** (VSIX file provided)

## Installation Steps

### Step 1: Install Node.js

1. **Download Node.js**:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS version (recommended)
   - Run the installer and follow the setup wizard

2. **Verify Installation**:
   ```bash
   node --version
   npm --version
   ```
   Both commands should return version numbers (Node.js ≥18.0.0, npm ≥8.0.0)


### Step 2: Install ProGenTeam Extension in VS Code

1. **Open VS Code**
2. **Install Extension**:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
   - Type "Extensions: Install from VSIX..."
   - Select the provided `.vsix` file
   - Click "Install"

3. **Verify Installation**:
   - Go to Extensions view (`Ctrl+Shift+X`)
   - Search for "ProGenTeam"
   - Ensure it shows as "Enabled"

### Step 3: Configure MCP Server in VS Code

1. **Open VS Code Settings**:
   - Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (macOS)
   - Click "Open Settings (JSON)" in the top-right corner

2. **Add MCP Configuration**:
   Add the following configuration to your VS Code settings:

   ```json
   {
     "mcp.servers": {
       "eds-block-analyser": {
         "command": "npx",
         "args": ["eds-block-analyser-mcp-server"],
         "env": {}
       }
     }
   }
   ```

3. **Save and Restart VS Code**

### Step 4: Verify Installation

1. **Open Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. **Type**: "MCP: Connect to Server"
3. **Select**: "eds-block-analyser"
4. **Check Status**: Should show "Connected" in the MCP panel

## Usage Instructions

### Basic Usage

1. **Open a new VS Code window**
2. **Open Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. **Type**: "ProGenTeam: Analyze Website"
4. **Enter a website URL** when prompted
5. **Wait for analysis** (may take 2-5 minutes depending on site size)
6. **Review generated artifacts**:
   - `ui_blocks_analysis.csv` - Detailed component breakdown
   - `analysis_summary.md` - Executive summary
   - `evaluation_log.md` - Quality assessment


## Output Artifacts

### 1. CSV Analysis File (`ui_blocks_analysis.csv`)
- Complete component breakdown with sizing and complexity
- Columns: Page Title, Component Name, Function, T-shirt Sizing, Occurrences, Justification, URL, Source Block, Variation Type, Remarks

### 2. Summary Report (`analysis_summary.md`)
- Executive summary with URL analysis
- Component mapping results
- Effort estimation summary
- Implementation recommendations

### 3. Evaluation Log (`evaluation_log.md`)
- Quality assessment scores
- Iteration tracking
- Improvement recommendations
- Final validation results

## Troubleshooting

### Common Issues

#### 1. "Command not found: npx"
**Solution**: Ensure Node.js is properly installed and in your PATH
```bash
# Verify Node.js installation
node --version
npm --version

# If not found, reinstall Node.js from nodejs.org
```

#### 2. "MCP server connection failed"
**Solution**: Check VS Code settings and restart
1. Verify MCP configuration in VS Code settings
2. Restart VS Code
3. Check if the server is running: `npx eds-block-analyser-mcp-server`

#### 3. "Extension not found"
**Solution**: Reinstall the ProGenTeam extension
1. Uninstall the extension from VS Code
2. Reinstall using the provided `.vsix` file
3. Restart VS Code

#### 4. "Analysis timeout or failed"
**Solution**: Check network connectivity and URL accessibility
1. Ensure the target website is publicly accessible
2. Check your internet connection
3. Try with a simpler website first

#### 5. "Permission denied" errors
**Solution**: Run with appropriate permissions
```bash
# On macOS/Linux, you might need:
sudo npm install -g eds-block-analyser-mcp-server

# Or install locally without global flag:
npm install eds-block-analyser-mcp-server
```

## Version Information

- **MCP Server Version**: 1.0.9
- **Node.js Requirement**: ≥18.0.0
- **VS Code Requirement**: ≥1.80.0
- **Last Updated**: [Current Date]
