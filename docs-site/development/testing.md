# Testing Guide

This guide covers testing strategies, tools, and best practices for the Example Plugin.

## Table of Contents

- [Overview](#overview)
- [Testing Setup](#testing-setup)
- [Testing Types](#testing-types)
- [Unit Tests](#unit-tests)
- [Integration Tests](#integration-tests)
- [Test Configuration](#test-configuration)
- [Test Utilities](#test-utilities)
- [Best Practices](#best-practices)
- [Running Tests](#running-tests)

## Overview

This project uses **Vitest** as the testing framework along with **@testing-library** for testing utilities. The testing strategy follows the **Testing Pyramid** approach:

```
    /\\  Integration Tests
   /  \\  (Few)
  /____\\
 /      \\  Unit Tests
/        \\  (Many)
```

## Testing Setup

### Dependencies

The project includes these testing dependencies:

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "jsdom": "^23.0.0",
    "@testing-library/dom": "^9.0.0"
  }
}
```

### Test Structure

```
tests/
├── __mocks__/
│   └── obsidian.ts           # Obsidian API mocks
├── main.test.ts              # Plugin tests
├── settings/
│   ├── plugin-settings.test.ts  # Settings tests
│   └── settings-tab.test.ts     # Settings UI tests
└── utils/
    └── text-transform.test.ts   # Utility tests
```

## Testing Types

### Unit Tests

Test individual functions and methods in isolation.

**When to use:**
- Business logic functions
- Utility methods
- Data transformations
- Settings validation

**Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { transformText } from '../src/main';

describe('transformText', () => {
  it('should convert to uppercase', () => {
    const result = transformText('hello', 'uppercase');
    expect(result).toBe('HELLO');
  });

  it('should convert to lowercase', () => {
    const result = transformText('WORLD', 'lowercase');
    expect(result).toBe('world');
  });

  it('should convert to title case', () => {
    const result = transformText('hello world', 'title');
    expect(result).toBe('Hello World');
  });
});
```

### Integration Tests

Test how components work together.

**When to use:**
- Plugin initialization
- Settings loading/saving
- Command registration
- UI interactions

**Example:**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { ExamplePlugin } from '../src/main';
import { mockApp, mockLeaf } from '../__mocks__/obsidian';

describe('ExamplePlugin', () => {
  let plugin: ExamplePlugin;

  beforeEach(() => {
    plugin = new ExamplePlugin(mockApp, mockLeaf);
  });

  it('should initialize with default settings', async () => {
    await plugin.onload();
    expect(plugin.settings.transformMode).toBe('uppercase');
    expect(plugin.settings.showNotices).toBe(true);
  });

  it('should register commands', async () => {
    await plugin.onload();
    // Verify commands are registered
    expect(plugin.app.commands).toBeDefined();
  });
});
```

## Unit Tests

### Testing Business Logic

Test the core text transformation logic:

```typescript
// tests/utils/text-transform.test.ts
import { describe, it, expect } from 'vitest';

describe('Text Transformation', () => {
  const testCases = [
    { input: 'hello', mode: 'uppercase', expected: 'HELLO' },
    { input: 'WORLD', mode: 'lowercase', expected: 'world' },
    { input: 'hello world', mode: 'title', expected: 'Hello World' },
    { input: 'test123', mode: 'uppercase', expected: 'TEST123' },
    { input: '', mode: 'uppercase', expected: '' },
  ];

  testCases.forEach(({ input, mode, expected }) => {
    it(`should transform "${input}" to "${expected}" using ${mode}`, () => {
      const result = transformText(input, mode);
      expect(result).toBe(expected);
    });
  });
});
```

### Testing Settings Validation

```typescript
// tests/settings/plugin-settings.test.ts
import { describe, it, expect } from 'vitest';
import { migrateSettings, DEFAULT_SETTINGS } from '../src/settings/plugin-settings';

describe('Settings Migration', () => {
  it('should handle missing properties', () => {
    const incompleteSettings = {};
    migrateSettings(incompleteSettings);
    expect(incompleteSettings.transformMode).toBe(DEFAULT_SETTINGS.transformMode);
  });

  it('should validate transform mode', () => {
    const invalidSettings = {
      transformMode: 'invalid-mode',
      showNotices: true,
    };
    migrateSettings(invalidSettings);
    expect(invalidSettings.transformMode).toBe(DEFAULT_SETTINGS.transformMode);
  });
});
```

## Integration Tests

### Testing Plugin Lifecycle

```typescript
// tests/main.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ExamplePlugin } from '../src/main';
import { mockApp } from '../__mocks__/obsidian';

describe('Plugin Integration', () => {
  let plugin: ExamplePlugin;
  const mockAppInstance = mockApp();

  beforeEach(() => {
    plugin = new ExamplePlugin(mockAppInstance, null);
    vi.clearAllMocks();
  });

  it('should load settings on startup', async () => {
    const loadDataSpy = vi.spyOn(plugin, 'loadData');
    await plugin.onload();
    expect(loadDataSpy).toHaveBeenCalled();
  });

  it('should save settings when changed', async () => {
    const saveDataSpy = vi.spyOn(plugin, 'saveData');
    plugin.settings.showNotices = false;
    await plugin.saveSettings();
    expect(saveDataSpy).toHaveBeenCalledWith({ showNotices: false });
  });
});
```

### Testing Settings Tab

```typescript
// tests/settings/settings-tab.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ExamplePluginSettingsTab } from '../src/settings/settings-tab';
import { mockApp } from '../__mocks__/obsidian';

describe('Settings Tab', () => {
  let settingsTab: ExamplePluginSettingsTab;
  let mockPlugin: any;

  beforeEach(() => {
    mockPlugin = {
      settings: { transformMode: 'uppercase', showNotices: true },
      saveSettings: vi.fn().mockResolvedValue(undefined),
    };
    settingsTab = new ExamplePluginSettingsTab(mockApp(), mockPlugin);
  });

  it('should render settings UI', () => {
    const container = { empty: vi.fn(), createDiv: vi.fn(), createEl: vi.fn() };
    settingsTab.display();
    expect(container.empty).toHaveBeenCalled();
  });
});
```

## Test Configuration

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### Test Setup

```typescript
// tests/setup.ts
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/dom';

// Mock Obsidian global objects
global.requestAnimationFrame = vi.fn();
global.cancelAnimationFrame = vi.fn();

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
```

### Mock Implementation

```typescript
// tests/__mocks__/obsidian.ts
import { vi } from 'vitest';

// Mock Notice class
export class Notice {
  constructor(message: string) {
    console.log('[Notice]', message);
  }
}

// Mock app with minimal required properties
export function mockApp() {
  return {
    workspace: {
      activeLeaf: {
        view: {
          editor: {
            getSelection: vi.fn().mockReturnValue('test text'),
            replaceSelection: vi.fn(),
          },
        },
      },
      on: vi.fn(),
    },
    commands: {
      executeCommandById: vi.fn(),
    },
    vault: {
      adapter: {
        exists: vi.fn().mockResolvedValue(true),
        write: vi.fn().mockResolvedValue(undefined),
      },
    },
  };
}

// Mock plugin manifest
export const mockManifest = {
  id: 'example-plugin',
  name: 'Example Plugin',
  version: '1.0.0',
  minAppVersion: '1.0.0',
  author: 'Test Author',
  authorUrl: '',
  description: 'Test plugin',
};
```

## Test Utilities

### Helper Functions

```typescript
// tests/utils/test-helpers.ts
export function createMockPlugin(settings = {}) {
  return {
    settings: {
      transformMode: 'uppercase',
      showNotices: true,
      ...settings,
    },
    loadData: vi.fn().mockResolvedValue(settings),
    saveData: vi.fn().mockResolvedValue(undefined),
    addCommand: vi.fn(),
    addSettingTab: vi.fn(),
    registerEvent: vi.fn(),
  };
}

export function createMockEditor(selection = 'test text') {
  return {
    getSelection: vi.fn().mockReturnValue(selection),
    replaceSelection: vi.fn(),
    getValue: vi.fn().mockReturnValue('mock content'),
    setValue: vi.fn(),
  };
}
```

### Custom Matchers

```typescript
// tests/matchers.ts
import { expect } from 'vitest';

expect.extend({
  toHaveBeenCalledWithSettings(received, expectedSettings) {
    const calls = received.mock.calls;
    const lastCall = calls[calls.length - 1];
    const actualSettings = lastCall?.[0];
    
    const pass = JSON.stringify(actualSettings) === JSON.stringify(expectedSettings);
    
    return {
      pass,
      message: () => pass 
        ? `Expected settings not to match ${JSON.stringify(expectedSettings)}`
        : `Expected settings to match ${JSON.stringify(expectedSettings)}, got ${JSON.stringify(actualSettings)}`,
    };
  },
});
```

## Best Practices

### 1. Test Naming

Use descriptive test names that explain what is being tested:

```typescript
// Good
it('should transform selected text to uppercase when transformMode is uppercase');

// Bad
it('should work');
```

### 2. Test Organization

Group related tests using `describe` blocks:

```typescript
describe('Text Transformation', () => {
  describe('Uppercase', () => {
    // Uppercase-specific tests
  });
  
  describe('Lowercase', () => {
    // Lowercase-specific tests
  });
});
```

### 3. Isolated Tests

Ensure tests don't depend on each other:

```typescript
// Each test should be independent
beforeEach(() => {
  // Setup fresh state
});

afterEach(() => {
  // Cleanup
});
```

### 4. Mock External Dependencies

Mock Obsidian API calls and external dependencies:

```typescript
it('should transform text', async () => {
  const mockLoadData = vi.fn().mockResolvedValue({ transformMode: 'uppercase' });
  plugin.loadData = mockLoadData;
  
  await plugin.loadSettings();
  expect(plugin.settings.transformMode).toBe('uppercase');
});
```

### 5. Test Edge Cases

Include tests for edge cases and error conditions:

```typescript
it('should handle empty selection gracefully', () => {
  const editor = createMockEditor('');
  const result = plugin.transformSelectedText(editor);
  expect(editor.replaceSelection).not.toHaveBeenCalled();
});
```

### 6. Use Realistic Test Data

Use data that represents real usage:

```typescript
// Good
const testText = 'Hello World! This is a test.';
const expectedResult = 'Hello World! This Is A Test.';

// Avoid
const testText = 'abc';
const expectedResult = 'Abc';
```

## Running Tests

### Command Line

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui

# Run specific test file
npm test -- main.test.ts

# Run tests matching pattern
npm test -- --grep "uppercase"
```

### Test Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

### Continuous Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

## Debugging Tests

### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "--reporter=verbose"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Browser Debugging

Use Vitest's `--inspect-brk` flag:

```bash
npm test -- --inspect-brk
```

## Test Coverage

Monitor test coverage to ensure adequate testing:

```bash
npm run test:coverage
```

View coverage report in `coverage/index.html`.

**Coverage Goals:**
- **Statements**: > 80%
- **Branches**: > 70%
- **Functions**: > 80%
- **Lines**: > 80%

## Related Documentation

- [Architecture Guide](/development/architecture)
- [API Reference](/development/api)
- [Contributing Guide](/development/contributing)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)