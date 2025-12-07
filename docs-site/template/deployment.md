# Deployment Guide

This guide covers how to build, test, and deploy your Obsidian plugin created from this template.

## Overview

Deploying your plugin involves building the TypeScript code, testing it thoroughly, and distributing it to users through GitHub releases or Obsidian's community plugin directory.

## Pre-Deployment Checklist

### Code Quality

- [ ] **All tests pass**: `npm test`
- [ ] **No TypeScript errors**: `npx tsc --noEmit`
- [ ] **Build succeeds**: `npm run build`
- [ ] **No lint errors**: `npm run lint`
- [ ] **Code coverage adequate**: Review test coverage report

### Functionality Testing

- [ ] **Manual testing completed** in Obsidian
- [ ] **Settings work correctly**
- [ ] **Commands register and execute**
- [ ] **No console errors**
- [ ] **Works on target platforms** (Desktop/Mobile)

### Documentation

- [ ] **README.md updated** with plugin-specific information
- [ ] **CHANGELOG.md updated** with version history
- [ ] **Version updated** in manifest.json and package.json
- [ ] **Documentation site updated** (if applicable)

## Building for Production

### Build Commands Comparison

| Command | Purpose | When to Use |
|---------|---------|--------------|
| `npm run dev` | Development mode with file watching | During active development |
| `npm run build` | Production build | For final deployment |
| `npm run version X.X.X` | Update version and create tag | When releasing new versions |

### 1. Production Build

```bash
# Clean previous builds
rm -rf main.js *.js.map

# Install fresh dependencies
npm install

# Run production build
npm run build
```

### 2. Verify Build Output

```bash
# Check that main.js was created
ls -la main.js

# Verify manifest.json exists
ls -la manifest.json

# Check file sizes
du -h main.js manifest.json
```

### 3. Test Production Build

```bash
# Copy to test vault
cp main.js manifest.json ~/TestVault/.obsidian/plugins/your-plugin-name/

# Test in Obsidian
# - Enable plugin
# - Test all functionality
# - Check for errors
```

## Version Management

### Using the Version Script

The template includes a version management script:

```bash
# Update to new version
npm run version 1.0.0

# This will:
# - Update version in manifest.json
# - Update version in package.json
# - Create git tag
```

### Manual Version Update

If you prefer to update manually:

#### Update `manifest.json`
```json
{
  "version": "1.0.0",
  "minAppVersion": "1.5.0",
  "id": "your-plugin-id",
  "name": "Your Plugin Name"
}
```

#### Update `package.json`
```json
{
  "version": "1.0.0",
  "name": "obsidian-your-plugin-name"
}
```

#### Update `CHANGELOG.md`
```markdown
# Changelog

## [1.0.0] - 2024-01-01

### Added
- Initial release
- Text transformation functionality
- Settings management
```

## GitHub Releases

### Creating a Release

1. **Create release notes**:
   ```bash
   git tag 1.0.0
   git push origin 1.0.0
   ```

2. **Go to GitHub releases**: https://github.com/yourusername/your-plugin/releases

3. **Create new release**:
   - Tag version: `1.0.0`
   - Release title: `v1.0.0`
   - Description: Include changelog and installation instructions

4. **Upload assets**:
   - `main.js` - Main plugin file
   - `manifest.json` - Plugin manifest

### Automated Releases (GitHub Actions)

The template includes a modern release workflow:

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - '*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: '18'
      - uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: |
            main.js
            manifest.json
      - uses: softprops/action-gh-release@v2
        with:
          tag_name: ${{ github.ref_name }}
          release_name: Release ${{ github.ref_name }}
          files: |
            main.js
            manifest.json
```

### Release Notes Template

```markdown
## What's Changed in v1.0.0

### ✨ New Features
- Feature A description
- Feature B description

### 🐛 Bug Fixes
- Fixed issue X
- Fixed issue Y

### 🔧 Improvements
- Improved performance
- Better error handling

## Installation

### Manual Installation
1. Download `main.js` and `manifest.json` from assets
2. Place in your vault's `.obsidian/plugins/your-plugin-name/` folder
3. Enable plugin in Obsidian settings

### Community Plugin (Coming Soon)
Plugin will be available in Obsidian's community plugin directory.
```

## Obsidian Community Plugin Directory

### Prerequisites

- GitHub repository with your plugin
- Plugin published with proper manifest
- Documentation site (recommended)
- Issue tracker for support

### Submission Process

1. **Prepare repository**:
   - Clean up code and documentation
   - Ensure proper licensing
   - Add installation instructions

2. **Create pull request**:
   - Fork https://github.com/obsidianmd/obsidian-releases
   - Add your plugin to `community-plugins.json`
   - Submit pull request

3. **Example entry**:
   ```json
   {
     "id": "your-plugin-id",
     "name": "Your Plugin Name",
     "author": "Your Name",
     "description": "Brief description",
     "repo": "yourusername/your-plugin-repo"
   }
   ```

## Distribution Strategies

### GitHub Releases vs Community Plugin Directory

| Aspect | GitHub Releases | Community Plugin Directory |
|-------|----------------|---------------------------|
| **Installation** | Manual download | One-click |
| **Updates** | Manual | Automatic |
| **Discoverability** | Low | High |
| **Review Process** | None | Required |
| **Best For** | Development, testing | Production, users |

### Recommended Approach

Use **both** strategies:
1. **Community Plugin Directory** - For easy user installation
2. **GitHub Releases** - For development builds and beta testing

```bash
# For Community Plugin Directory
# Submit to obsidian-releases repository

# For GitHub Releases
# Create release with main.js and manifest.json assets
```

## Testing Before Deployment

### Automated Testing

```bash
# Run full test suite
npm test

# Run with coverage
npm run test:coverage

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Manual Testing Checklist

#### Desktop Testing
- [ ] Plugin loads without errors
- [ ] All commands work
- [ ] Settings save and persist
- [ ] No console errors
- [ ] Works across different vault types

#### Mobile Testing (if applicable)
- [ ] Plugin works on mobile
- [ ] UI is responsive
- [ ] Performance is acceptable
- [ ] No mobile-specific issues

#### Cross-Version Testing
- [ ] Test on minimum supported Obsidian version
- [ ] Test on latest Obsidian version
- [ ] Test upgrade scenarios

### User Acceptance Testing

1. **Beta testing**:
   - Share with friends/colleagues
   - Gather feedback
   - Fix critical issues

2. **Documentation review**:
   - Installation instructions clear
   - Usage examples work
   - Screenshots up-to-date

## Post-Deployment

### Monitoring

1. **GitHub Issues**:
   - Monitor for bug reports
   - Respond to user questions
   - Track feature requests

2. **Analytics** (if applicable):
   - Track download counts
   - Monitor usage patterns
   - Identify popular features

### Updates and Maintenance

1. **Regular updates**:
   ```bash
   # Update dependencies
   npm update
   
   # Test updates
   npm test
   
   # Create new release
   npm run version 1.1.0
   ```

2. **Bug fixes**:
   - Quick turnaround for critical issues
   - Follow semantic versioning
   - Update changelog

3. **Feature additions**:
   - Follow user feedback
   - Maintain backwards compatibility
   - Update documentation

## Security Considerations

### Code Security

- **No hardcoded secrets** in source code
- **Validate user inputs** properly
- **Use HTTPS** for any network requests
- **Review dependencies** for vulnerabilities

```bash
# Check for security vulnerabilities
npm audit

# Fix automatically
npm audit fix
```

### Distribution Security

- **Sign releases** (optional)
- **Provide checksums** for files
- **Use official channels** for distribution
- **Monitor for unauthorized copies**

## Performance Optimization

### Build Optimization

```javascript
// rollup.config.mjs - Optimize build output
export default {
  output: {
    format: 'cjs',
    sourcemap: false, // Disable for production
    compact: true,    // Minimize output
  },
  plugins: [
    typescript({ 
      tsconfig: './tsconfig.json',
      sourceMap: false, // Disable for production
    })
  ]
};
```

### Runtime Performance

- **Lazy load** heavy components
- **Debounce** user inputs
- **Cache** computed values
- **Use efficient** data structures

```typescript
// Example: Lazy loading
async onload() {
  // Don't load heavy components immediately
}

async activateFeature() {
  // Load when needed
  const { HeavyComponent } = await import('./components/heavy');
  new HeavyComponent().init();
}
```

## Troubleshooting

### Common Build Issues

#### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit

# Fix common issues:
# - Missing type annotations
# - Incorrect imports
# - Missing null checks
```

#### Rollup Build Failures
```bash
# Check external dependencies
# - Ensure 'obsidian' is marked as external
# - Check import paths
# - Verify plugin configuration
```

#### Plugin Loading Issues
- **Check manifest.json** is valid JSON
- **Verify main.js** exists and is correct format
- **Test in clean vault** to rule out conflicts

### Testing Issues

#### Tests Not Running
```bash
# Check test configuration
# - Verify vitest.config.ts
# - Check test file patterns
# - Ensure dependencies installed
```

#### Plugin Tests Failing
```bash
# Check mock setup
# - Verify obsidian.ts mocks
# - Check plugin initialization
# - Test in isolation
```

## Legal Considerations

### Licensing

1. **Choose appropriate license** (MIT recommended)
2. **Include license file** in repository
3. **Respect third-party licenses** for dependencies

### Privacy

- **No data collection** without user consent
- **Local storage only** unless explicitly stated
- **Clear privacy policy** if applicable

## Documentation Deployment

### GitHub Pages

The template includes documentation deployment:

```yaml
# .github/workflows/deploy-docs.yml
name: Deploy Documentation

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs-site/.vitepress/dist
```

### Documentation Updates

```bash
# Update documentation
# 1. Edit markdown files in docs-site/
# 2. Build docs
npm run docs:build

# 3. Deploy to GitHub Pages
npm run docs:deploy
```

## Getting Help

1. **[GitHub Issues](https://github.com/bright-fakl/obsidian-plugin-template/issues)** - For bugs, feature requests, and general questions
2. **[Documentation](/)** - Template and API documentation
3. **[Obsidian Developer Resources](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)** - Official Obsidian plugin development guides

## Next Steps

- [Set up automated testing](/template/testing)