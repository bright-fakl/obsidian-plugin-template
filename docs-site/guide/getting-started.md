# Getting Started

Welcome to the Example Plugin! This guide will help you get started with using and customizing the plugin.

## Installation

### From Releases

1. **Download the latest release** from the [releases page](https://github.com/yourusername/obsidian-example-plugin/releases)
2. **Extract the files** to your Obsidian vault's plugins folder:
   ```
   YourVault/.obsidian/plugins/example-plugin/
   ```
3. **Enable the plugin** in Obsidian:
   - Open Settings
   - Go to "Community plugins"
   - Find "Example Plugin" and enable it

### From Source

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/obsidian-example-plugin.git
   cd obsidian-example-plugin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the plugin**:
   ```bash
   npm run build
   ```

4. **Copy files** to your Obsidian vault's plugins folder

## Basic Usage

### Transforming Text

1. **Select text** in your note
2. **Open command palette** (`Ctrl/Cmd + P`)
3. **Search for "Transform selected text"**
4. **Execute the command**

Your selected text will be transformed according to your settings.

### Available Transformations

- **UPPERCASE**: Convert text to uppercase
- **lowercase**: Convert text to lowercase
- **Title Case**: Convert text to title case

## Configuration

### Accessing Settings

1. Open Obsidian settings
2. Navigate to "Example Plugin" in the left sidebar
3. Configure your preferred options

### Settings Options

| Setting | Description | Default |
|---------|-------------|---------|
| **Transform Mode** | Choose the text transformation method | UPPERCASE |
| **Show Notices** | Display confirmation notices after transformation | Enabled |

## Customization

### Changing Default Settings

Modify the default settings in [`src/settings/plugin-settings.ts`](src/settings/plugin-settings.ts):

```typescript
export const DEFAULT_SETTINGS: ExamplePluginSettings = {
  transformMode: 'uppercase', // Change default mode
  showNotices: true,          // Change default notice behavior
};
```

### Adding New Transformations

Add new transformation modes to the settings interface and implement the logic:

```typescript
// 1. Add to interface
export interface ExamplePluginSettings {
  transformMode: 'uppercase' | 'lowercase' | 'title' | 'new-mode';
}

// 2. Add to dropdown in settings-tab.ts
.addOption('new-mode', 'New Mode')

// 3. Implement logic in main.ts
private transformText(text: string, mode: string): string {
  switch (mode) {
    case 'new-mode':
      return this.newTransformMethod(text);
    // ... other cases
  }
}
```

## Development

### Project Structure

```
src/
├── main.ts                  # Plugin entry point
└── settings/
    ├── plugin-settings.ts   # Settings schema
    └── settings-tab.ts      # Settings UI
```

### Building

```bash
# Development mode (watches for changes)
npm run dev

# Production build
npm run build
```

### Testing

```bash
# Run tests
npm test

# Run tests with watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Troubleshooting

### Plugin Not Loading

1. Check that `main.js` and `manifest.json` are in the correct folder
2. Verify the plugin is enabled in Obsidian settings
3. Check the developer console (`Ctrl/Cmd + Shift + I`) for errors

### Settings Not Saving

1. Ensure you have write permissions to your vault
2. Check that the plugin has permission to access your vault
3. Verify no errors appear in the console

### Command Not Working

1. Make sure you have text selected
2. Check that the command is properly registered
3. Verify no JavaScript errors in the console

## Next Steps

- Explore the [API Reference](/development/api) for advanced usage
- Learn about [Testing](/development/testing) your plugin
- Check out the [Contributing Guide](/development/contributing) to contribute