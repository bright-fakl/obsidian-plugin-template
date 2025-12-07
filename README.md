# Obsidian Plugin Template

A **production-ready** template for building Obsidian plugins with complete infrastructure.

## 🚀 Quick Start

### 1. Clone the template

```bash
git clone https://github.com/yourusername/obsidian-plugin-template.git your-plugin-name
cd your-plugin-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Convert to your own repository (Optional)

To create a separate repository for your plugin:

```bash
# Remove the existing .git folder
rm -rf .git

# Initialize new git repository
git init

# Create new repository on GitHub/GitLab
# Then add the remote:
git remote add origin https://github.com/yourusername/your-plugin-name.git

# Commit and push
git add .
git commit -m "Initial commit: Obsidian plugin template"
git push -u origin main
```

### 4. Customize the plugin

- Update [`manifest.json`](manifest.json) with your plugin details
- Modify [`src/main.ts`](src/main.ts) with your functionality
- Update settings in [`src/settings/`](src/settings/)

### 4. Build and test

```bash
npm run build
npm test
```

### 5. Load in Obsidian

**For development**: You can place the entire local repository folder in your Obsidian vault's plugins folder during development:

```
YourVault/.obsidian/plugins/your-plugin-name/
```

**For production**: Copy just `main.js` and `manifest.json` to your Obsidian vault's plugins folder.

## 📦 What's Included

This template provides a **complete, production-ready foundation**:

- ✅ **TypeScript** - Type-safe development with strict mode
- ✅ **Vitest** - Testing framework with Obsidian API mocks
- ✅ **VitePress** - Professional documentation site
- ✅ **GitHub Actions** - Automated releases and docs deployment
- ✅ **Settings System** - Robust settings with migration support
- ✅ **Example Plugin** - Working plugin demonstrating best practices

### Core Components

- **Plugin Architecture** - Clean separation of concerns
- **Settings Management** - Persistent configuration with defaults
- **Command System** - Easy command registration
- **Build Pipeline** - Optimized production builds
- **Testing Setup** - Comprehensive test infrastructure
- **Documentation** - Multi-audience documentation structure

## 🏗️ Architecture

This template follows **professional plugin architecture**:

```
┌─────────────────────────────────────┐
│        Plugin Layer                 │
│  - Lifecycle management             │
│  - Command registration             │
│  - Event handling                   │
└─────────────────────────────────────┘
                 ↕
┌─────────────────────────────────────┐
│      Settings Layer                 │
│  - Settings schema                  │
│  - Settings persistence             │
│  - Settings UI                      │
└─────────────────────────────────────┘
```

### Key Design Patterns

- **Singleton**: Plugin class managed by Obsidian
- **Strategy**: Text transformation modes
- **Observer**: Event handling system
- **Factory**: Settings migration

## 🤝 Contributing

Contributions are welcome! Help improve this template for everyone.

[Contributing guide](https://bright-fakl.github.io/obsidian-plugin-template/contributing/) • [Development setup](https://bright-fakl.github.io/obsidian-plugin-template/contributing/development-setup)

## 🚀 Development Workflow

### Build Commands

```bash
# Development mode (watches for changes)
npm run dev

# Production build
npm run build

# Run tests
npm test

# Run tests with watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Documentation Commands

```bash
# Development server
npm run docs:dev

# Build documentation
npm run docs:build

# Preview documentation
npm run docs:preview
```

## 📦 Publishing

### Version Management

Use the version script to update all version numbers:

```bash
npm run version 1.0.0
```

### Release Process

1. Update [`CHANGELOG.md`](CHANGELOG.md)
2. Run version script: `npm run version 1.0.0`
3. Commit changes: `git commit -am "Release v1.0.0"`
4. Create tag: `git tag 1.0.0`
5. Push: `git push origin main --tags`

GitHub Actions will automatically:
- Build the plugin
- Create a GitHub release
- Upload `main.js` and `manifest.json`
- Deploy documentation to GitHub Pages

## 🧪 Testing

This template includes comprehensive testing setup:

- **Vitest** configured with JSDOM environment
- **Mock Obsidian API** for unit testing
- **Code coverage** reporting
- **Testing guidelines** in [`tests/TESTING.md`](tests/TESTING.md)

Run tests with:

```bash
npm test          # Run all tests
npm run test:watch # Watch mode
npm run test:ui    # Web UI
npm run test:coverage # Coverage report
```

## 📚 Documentation

### Internal Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - Architecture deep dive
- [`tests/TESTING.md`](tests/TESTING.md) - Testing best practices

### User Documentation

- [`docs-site/`](docs-site/) - VitePress documentation site
- [`README.md`](README.md) - This file

## 🎯 Features

### ✅ Production Ready

- Complete build pipeline
- Automated releases
- Documentation deployment
- Testing infrastructure

### 🔧 Easy Customization

- Clear file structure
- Well-documented code
- Example functionality
- Customization points marked

### 📦 Minimal Core

- Only essential files
- No unnecessary complexity
- Focused on core functionality

### 🧪 Tested

- Vitest configured
- Mock Obsidian API
- Testing guidelines
- Code coverage

## 📖 Resources

- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [Obsidian Developer Docs](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vitest Documentation](https://vitest.dev/)

## 🤝 Contributing

Contributions welcome! See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines.

## 📜 License

This template is released under the [MIT License](LICENSE).

---

**Happy plugin development!** 🎉