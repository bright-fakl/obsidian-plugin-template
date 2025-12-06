# Development Guide

Welcome to the development section! This guide will help you understand, customize, and contribute to the Example Plugin.

## Quick Navigation

- **[Architecture](/development/architecture)** - Understand the plugin's design and structure
- **[API Reference](/development/api)** - Complete API documentation
- **[Testing](/development/testing)** - Testing strategies and best practices
- **[Contributing](/development/contributing)** - How to contribute to the project

## Overview

This plugin serves as a comprehensive template for building Obsidian plugins. It's designed to demonstrate:

- **Clean Architecture**: Layered design with clear separation of concerns
- **Type Safety**: Full TypeScript support with proper interfaces
- **Settings Management**: Robust settings system with migration support
- **Testing Strategy**: Unit and integration tests using Vitest
- **Documentation**: Complete documentation with VitePress

## Development Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Obsidian (for testing)

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/obsidian-example-plugin.git
   cd obsidian-example-plugin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

## Project Structure

```
src/
├── main.ts                  # Plugin entry point
└── settings/
    ├── plugin-settings.ts   # Settings schema and defaults
    └── settings-tab.ts      # Settings UI

tests/
├── __mocks__/               # Test mocks
└── *.test.ts               # Test files

docs-site/                  # Documentation site
├── index.md               # Main page
├── guide/                 # User guide
└── development/           # Development docs
    ├── index.md           # This page
    ├── architecture.md    # Architecture guide
    ├── api.md            # API reference
    ├── testing.md        # Testing guide
    └── contributing.md   # Contributing guide
```

## Key Technologies

- **TypeScript** - Type-safe development
- **Obsidian API** - Plugin framework
- **VitePress** - Documentation site
- **Vitest** - Testing framework
- **Rollup** - Build system

## Next Steps

- Explore the [Architecture Guide](/development/architecture) to understand the design
- Check the [API Reference](/development/api) for detailed documentation
- Learn about [Testing](/development/testing) your plugin
- Read the [Contributing Guide](/development/contributing) to help improve the project

## Common Development Tasks

### Adding a New Setting

1. Update the interface in `src/settings/plugin-settings.ts`
2. Add the default value to `DEFAULT_SETTINGS`
3. Add UI elements in `src/settings/settings-tab.ts`
4. Handle the setting in your plugin logic

### Adding a New Command

```typescript
this.addCommand({
  id: 'your-command-id',
  name: 'Your Command Name',
  callback: () => {
    // Command logic here
  },
});
```

### Adding Tests

Create test files in the `tests/` directory following the naming convention `*.test.ts`.

## Getting Help

- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/obsidian-example-plugin/issues)
- **Discussions**: Join discussions on [GitHub Discussions](https://github.com/yourusername/obsidian-example-plugin/discussions)
- **API Documentation**: Refer to [Obsidian API docs](https://github.com/obsidianmd/obsidian-api)