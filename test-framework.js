#!/usr/bin/env node
/**
 * Test script for MCP Framework Server
 * This script tests the framework server with different configurations
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const configFiles = [
  'config-examples/ui-analysis-config.json',
  'config-examples/generic-analysis-config.json'
];

console.log('🧪 Testing MCP Framework Server...\n');

// Test 1: Check if framework-server.js exists
console.log('1. Checking framework-server.js...');
if (existsSync('framework-server.js')) {
  console.log('✅ framework-server.js exists');
} else {
  console.log('❌ framework-server.js not found');
  process.exit(1);
}

// Test 2: Check if configuration files exist
console.log('\n2. Checking configuration files...');
configFiles.forEach(configFile => {
  if (existsSync(configFile)) {
    console.log(`✅ ${configFile} exists`);
  } else {
    console.log(`❌ ${configFile} not found`);
  }
});

// Test 3: Test server startup with different configurations
console.log('\n3. Testing server startup...');

async function testServerStartup(configFile) {
  return new Promise((resolve) => {
    console.log(`\nTesting with ${configFile}...`);
    
    const server = spawn('node', ['framework-server.js', configFile], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    let errorOutput = '';

    server.stdout.on('data', (data) => {
      output += data.toString();
    });

    server.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // Give the server a moment to start
    setTimeout(() => {
      server.kill();
      
      if (errorOutput.includes('Error') || errorOutput.includes('error')) {
        console.log(`❌ ${configFile} - Server startup failed`);
        console.log('Error:', errorOutput);
        resolve(false);
      } else {
        console.log(`✅ ${configFile} - Server started successfully`);
        resolve(true);
      }
    }, 2000);
  });
}

// Test each configuration
async function runTests() {
  let allPassed = true;
  
  for (const configFile of configFiles) {
    if (existsSync(configFile)) {
      const success = await testServerStartup(configFile);
      if (!success) {
        allPassed = false;
      }
    }
  }

  console.log('\n📊 Test Results:');
  if (allPassed) {
    console.log('✅ All tests passed! Framework server is working correctly.');
  } else {
    console.log('❌ Some tests failed. Check the errors above.');
  }

  console.log('\n🚀 Usage Examples:');
  console.log('  npm start                                    # Default configuration');
  console.log('  npm run start:ui                            # UI analysis configuration');
  console.log('  npm run start:generic                       # Generic analysis configuration');
  console.log('  node framework-server.js your-config.json   # Custom configuration');
}

runTests().catch(console.error);
