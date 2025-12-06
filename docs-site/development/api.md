# API Reference

This document provides a complete reference for the Example Plugin API.

## Table of Contents

- [Core Classes](#core-classes)
- [Plugin Interface](#plugin-interface)
- [Settings Interface](#settings-interface)
- [Methods](#methods)
- [Events](#events)
- [Types](#types)

## Core Classes

### ExamplePlugin

The main plugin class that extends Obsidian's `Plugin` class.

```typescript
export default class ExamplePlugin extends Plugin {
  // Properties
  settings: ExamplePluginSettings;
  
  // Methods
  async onload(): Promise<void>;
  async onunload(): Promise<void>;
  async loadSettings(): Promise<void>;
  async saveSettings(): Promise<void>;
  private transformText(text: string, mode: string): string;
}
```

### ExamplePluginSettingsTab

The settings UI class that extends Obsidian's `PluginSettingTab`.

```typescript
export class ExamplePluginSettingsTab extends PluginSettingTab {
  plugin: ExamplePlugin;
  
  // Methods
  display(): void;
}
```

## Plugin Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `settings` | `ExamplePluginSettings` | Plugin configuration settings |
| `app` | `App` | Obsidian app instance (inherited) |
| `manifest` | `PluginManifest` | Plugin metadata (inherited) |

### Methods

#### `async onload(): Promise<void>`

Called when the plugin is loaded by Obsidian.

**Responsibilities:**
- Load plugin settings
- Register settings tab
- Register commands
- Register event handlers

**Example:**
```typescript
async onload() {
  await this.loadSettings();
  this.addSettingTab(new ExamplePluginSettingsTab(this.app, this));
  
  this.addCommand({
    id: 'transform-selected-text',
    name: 'Transform selected text',
    callback: () => this.transformSelectedText(),
  });
}
```

#### `async onunload(): Promise<void>`

Called when the plugin is unloaded by Obsidian.

**Responsibilities:**
- Cleanup resources
- Unregister event handlers
- Detach custom views

#### `async loadSettings(): Promise<void>`

Load settings from disk and merge with defaults.

```typescript
async loadSettings() {
  const data = await this.loadData();
  this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
}
```

#### `async saveSettings(): Promise<void>`

Save current settings to disk.

```typescript
async saveSettings() {
  await this.saveData(this.settings);
}
```

## Settings Interface

### ExamplePluginSettings

The settings interface defining all configurable options.

```typescript
export interface ExamplePluginSettings {
  transformMode: 'uppercase' | 'lowercase' | 'title';
  showNotices: boolean;
}
```

### Settings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `transformMode` | `'uppercase' \| 'lowercase' \| 'title'` | `'uppercase'` | Default text transformation mode |
| `showNotices` | `boolean` | `true` | Show confirmation notices after transformation |

## Methods

### `transformText(text: string, mode: string): string`

Transform text according to the specified mode.

**Parameters:**
- `text` - The text to transform
- `mode` - The transformation mode ('uppercase', 'lowercase', 'title')

**Returns:** Transformed text string

**Example:**
```typescript
const result = this.transformText('hello world', 'uppercase');
// Returns: 'HELLO WORLD'
```

**Implementation:**
```typescript
private transformText(text: string, mode: string): string {
  switch (mode) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'title':
      return this.toTitleCase(text);
    default:
      return text;
  }
}

private toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}
```

### `transformSelectedText(): Promise<void>`

Transform the currently selected text in the active editor.

**Example:**
```typescript
async transformSelectedText() {
  const editor = this.app.workspace.activeLeaf?.view?.editor;
  if (!editor) return;
  
  const selection = editor.getSelection();
  if (!selection) return;
  
  const transformed = this.transformText(selection, this.settings.transformMode);
  editor.replaceSelection(transformed);
  
  if (this.settings.showNotices) {
    new Notice(`Text transformed to ${this.settings.transformMode}`);
  }
}
```

## Events

The plugin can register event handlers for Obsidian events.

### File Open Event

```typescript
this.registerEvent(
  this.app.workspace.on('file-open', (file) => {
    if (file) {
      console.log('[ExamplePlugin] File opened:', file.name);
    }
  })
);
```

### Editor Change Event

```typescript
this.registerEvent(
  this.app.workspace.on('editor-change', (editor, info) => {
    console.log('[ExamplePlugin] Editor changed:', info);
  })
);
```

## Types

### TransformMode

```typescript
type TransformMode = 'uppercase' | 'lowercase' | 'title';
```

### Settings Migration

```typescript
export function migrateSettings(settings: ExamplePluginSettings): void {
  // Handle settings schema changes
  if (typeof settings.transformMode !== 'string') {
    settings.transformMode = DEFAULT_SETTINGS.transformMode;
  }
  
  if (typeof settings.showNotices !== 'boolean') {
    settings.showNotices = DEFAULT_SETTINGS.showNotices;
  }
}
```

## Error Handling

### Try-Catch Pattern

```typescript
async someOperation(): Promise<void> {
  try {
    // Operation logic
  } catch (error) {
    console.error('[ExamplePlugin]', error);
    new Notice('Operation failed: ' + error.message);
  }
}
```

### Validation

```typescript
private validateSettings(settings: ExamplePluginSettings): boolean {
  const validModes = ['uppercase', 'lowercase', 'title'];
  return validModes.includes(settings.transformMode) && 
         typeof settings.showNotices === 'boolean';
}
```

## Utility Methods

### Debouncing

```typescript
import { debounce } from 'obsidian';

const debouncedSave = debounce(
  () => this.saveSettings(),
  500
);
```

### Notice Helper

```typescript
private showNotice(message: string, type: 'info' | 'warning' | 'error' = 'info'): void {
  const notice = new Notice(message);
  // Add styling based on type if needed
}
```

## Constants

### Default Settings

```typescript
export const DEFAULT_SETTINGS: ExamplePluginSettings = {
  transformMode: 'uppercase',
  showNotices: true,
};
```

### Command IDs

```typescript
export const COMMANDS = {
  TRANSFORM_SELECTED_TEXT: 'transform-selected-text',
} as const;
```

### Setting Keys

```typescript
export const SETTING_KEYS = {
  TRANSFORM_MODE: 'transformMode',
  SHOW_NOTICES: 'showNotices',
} as const;
```

## Integration Examples

### Custom Command

```typescript
this.addCommand({
  id: 'custom-transform',
  name: 'Custom Transform',
  callback: () => {
    // Custom transformation logic
  },
  hotkeys: [
    {
      modifiers: ['Mod', 'Shift'],
      key: 't',
    },
  ],
});
```

### Event Integration

```typescript
this.registerEvent(
  this.app.workspace.on('active-leaf-change', () => {
    // Handle workspace changes
  })
);
```

## Best Practices

1. **Always handle errors gracefully**
2. **Use TypeScript interfaces for type safety**
3. **Implement proper cleanup in `onunload`**
4. **Validate user input**
5. **Use debouncing for expensive operations**
6. **Follow Obsidian's API patterns**

## Related Documentation

- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [Architecture Guide](/development/architecture)
- [Testing Guide](/development/testing)
- [Contributing Guide](/development/contributing)