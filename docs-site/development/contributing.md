# Contributing Guide

Thank you for your interest in contributing to the Example Plugin! This guide will help you get started with contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Documentation](#documentation)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Git
- Obsidian (for testing)
- Basic knowledge of TypeScript and Obsidian plugins

### Setting Up Development Environment

1. **Fork the repository**:
   ```bash
   git clone https://github.com/yourusername/obsidian-example-plugin.git
   cd obsidian-example-plugin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

### Testing Your Changes

1. **Build the plugin**:
   ```bash
   npm run build
   ```

2. **Copy files to your Obsidian vault**:
   - Copy `main.js` and `manifest.json` to your vault's plugin folder
   - Path: `YourVault/.obsidian/plugins/example-plugin/`

3. **Test in Obsidian**:
   - Enable the plugin in Obsidian settings
   - Test your changes manually
   - Check the developer console for errors

## Development Workflow

### Branch Naming Convention

Use descriptive branch names:

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/scope-of-change` - Code refactoring
- `test/test-coverage` - Test-related changes

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format: type(scope): description

# Examples:
feat(settings): add new transformation mode
fix(api): resolve text transformation bug
docs(readme): update installation instructions
test(utils): add unit tests for text transformation
refactor(main): simplify plugin initialization
```

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Build process, dependencies, etc.

### Code Review Process

1. **Create a pull request** with a clear description
2. **Ensure all tests pass** locally
3. **Update documentation** if needed
4. **Request review** from maintainers
5. **Address feedback** and make requested changes
6. **Merge** after approval

## Code Standards

### TypeScript Guidelines

1. **Use TypeScript strictly**:
   ```typescript
   // Good
   private transformText(text: string, mode: TransformMode): string {
     // Implementation
   }

   // Avoid
   private transformText(text, mode) {
     // Implementation
   }
   ```

2. **Define proper interfaces**:
   ```typescript
   interface ExamplePluginSettings {
     transformMode: TransformMode;
     showNotices: boolean;
   }
   ```

3. **Use meaningful variable names**:
   ```typescript
   // Good
   const selectedText = editor.getSelection();
   const transformedText = this.transformText(selectedText, this.settings.transformMode);

   // Avoid
   const a = editor.getSelection();
   const b = this.transformText(a, this.settings.transformMode);
   ```

### Code Style

1. **Follow existing patterns** in the codebase
2. **Use consistent indentation** (2 spaces)
3. **Add JSDoc comments** for public methods:
   ```typescript
   /**
    * Transforms text according to the specified mode
    * @param text - The text to transform
    * @param mode - The transformation mode
    * @returns The transformed text
    */
   private transformText(text: string, mode: string): string {
     // Implementation
   }
   ```

4. **Keep functions small and focused**
5. **Use meaningful class and method names**

### Error Handling

1. **Always handle errors gracefully**:
   ```typescript
   try {
     // Operation logic
   } catch (error) {
     console.error('[ExamplePlugin]', error);
     new Notice('Operation failed: ' + error.message);
   }
   ```

2. **Validate user input**:
   ```typescript
   private validateSettings(settings: ExamplePluginSettings): boolean {
     const validModes = ['uppercase', 'lowercase', 'title'];
     return validModes.includes(settings.transformMode) && 
            typeof settings.showNotices === 'boolean';
   }
   ```

## Pull Request Process

### Before Submitting

1. **Run all tests**:
   ```bash
   npm test
   npm run test:coverage
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Test manually** in Obsidian

4. **Update documentation** if needed

5. **Check for console errors**

### PR Template

Use the provided pull request template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] No console errors

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Added tests for new functionality
```

### Review Criteria

PRs will be reviewed for:

- **Functionality** - Does the code work as intended?
- **Code Quality** - Is the code clean, readable, and well-structured?
- **Tests** - Are there adequate tests?
- **Documentation** - Is documentation updated if needed?
- **Breaking Changes** - Are any breaking changes properly handled?

## Reporting Issues

### Bug Reports

Use the bug report template with the following information:

```markdown
**Describe the Bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g. macOS]
- Obsidian Version: [e.g. 1.4.0]
- Plugin Version: [e.g. 1.0.0]

**Additional Context**
Any other context about the problem
```

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

## Feature Requests

### Suggesting Features

1. **Check existing issues** to avoid duplicates
2. **Use the feature request template**:
   ```markdown
   **Is your feature request related to a problem?**
   Description of the problem
   
   **Describe the solution you'd like**
   What you want to happen
   
   **Describe alternatives you've considered**
   Other solutions you've considered
   
   **Additional context**
   Any other context or screenshots
   ```

3. **Consider the scope** - Keep features focused and manageable
4. **Discuss in issues** before implementing major changes

### Feature Acceptance Criteria

Features should be:
- **Useful** - Solve a real problem for users
- **Maintainable** - Code should be sustainable
- **Testable** - Feature can be adequately tested
- **Documented** - Feature is properly documented
- **Compatible** - Doesn't break existing functionality

## Documentation

### Updating Documentation

1. **Update relevant documentation** when making changes
2. **Use clear, concise language**
3. **Include code examples** where helpful
4. **Update API documentation** for public interfaces
5. **Keep documentation up-to-date** with code changes

### Documentation Standards

- **Use Markdown** for documentation files
- **Include code examples** in fenced code blocks
- **Link to related documentation** where appropriate
- **Keep documentation organized** and easy to navigate

### Example Documentation Update

```markdown
## New Feature: Custom Transformation Modes

Added support for custom transformation modes:

```typescript
// Example usage
const customMode = 'camelCase';
const result = plugin.transformText('hello world', customMode);
// Returns: 'helloWorld'
```

**Configuration:**
Add new modes in `src/settings/plugin-settings.ts`:

```typescript
export interface ExamplePluginSettings {
  transformMode: 'uppercase' | 'lowercase' | 'title' | 'camelCase';
}
```
```

## Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- **Be respectful** and considerate in all interactions
- **Be patient** with newcomers and questions
- **Be constructive** in feedback and criticism
- **Focus on what's best** for the community
- **Use inclusive language** and be mindful of accessibility

### Communication

- **Be clear and concise** in all communications
- **Ask questions** if something is unclear
- **Provide context** when reporting issues
- **Be helpful** to other contributors
- **Stay on topic** in discussions

### Getting Help

- **Check documentation** first
- **Search existing issues** before creating new ones
- **Ask in discussions** for general questions
- **Use labels** to categorize your questions

## Development Tips

### Useful Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run watch        # Watch mode for development

# Testing
npm test             # Run tests
npm run test:watch   # Watch mode for tests
npm run test:coverage # Coverage report

# Documentation
npm run docs:dev     # Start docs server
npm run docs:build   # Build documentation
```

### Debugging in Obsidian

1. **Enable developer mode** in Obsidian settings
2. **Check console** for errors (`Ctrl/Cmd + Shift + I`)
3. **Use console.log** for debugging:
   ```typescript
   console.log('[ExamplePlugin] Debug info:', someData);
   ```

### Plugin Testing

1. **Use a test vault** separate from your main vault
2. **Keep backups** of your data
3. **Test thoroughly** before distributing

## Release Process

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR.MINOR.PATCH**
- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version number updated in manifest.json
- [ ] Pull request reviewed and merged
- [ ] Git tag created
- [ ] GitHub release created

## Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **GitHub contributors** page
- **Release notes** for significant contributions

## Questions?

Don't hesitate to ask! You can:

- **Open an issue** for bugs or feature requests
- **Start a discussion** for general questions
- **Ask in existing issues** for clarification
- **Check the documentation** for answers

Thank you for contributing to the Example Plugin! 🎉