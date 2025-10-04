# Contributing to DevHub

Thank you for your interest in contributing to DevHub! 🎉

This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- **Clear title** describing the issue
- **Steps to reproduce** the bug
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment** (browser, OS, device)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- **Clear description** of the proposed feature
- **Use case** - why would this be useful?
- **Implementation ideas** (if you have any)

### Pull Requests

1. **Fork the repository** and create a new branch
2. **Follow the existing code style** and conventions
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

## 🔧 Development Setup

### Prerequisites

- Node.js 20 or higher
- npm (included with Node.js)
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/devhub.git
cd devhub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
devhub/
├── app/                    # Next.js App Router
│   ├── tools/             # Utility tools
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   └── tools/            # Tool-specific components
├── lib/                  # Utility functions
│   ├── converters/       # Conversion logic
│   └── i18n/             # Internationalization
└── contexts/             # React contexts
```

## 📝 Code Guidelines

### TypeScript

- Use **TypeScript** for all new code
- Define **explicit types** for props and functions
- Avoid using `any` type

### Component Structure

```typescript
// Functional components
export default function ComponentName() {
  return (
    // JSX
  );
}

// With props
interface ComponentProps {
  title: string;
  description?: string;
}

export default function Component({ title, description }: ComponentProps) {
  // Implementation
}
```

### Styling

- Use **Tailwind CSS** utility classes
- Follow **responsive-first** approach
- Use existing design tokens for consistency
- Support **dark mode** where applicable

### File Naming

- Components: `PascalCase` (e.g., `Navbar.tsx`)
- Pages: Next.js convention (`page.tsx`, `layout.tsx`)
- Utilities: `camelCase` (e.g., `formatDate.ts`)

## 🧪 Testing

Before submitting a pull request:

1. **Test in multiple browsers** (Chrome, Firefox, Safari)
2. **Test responsive design** (mobile, tablet, desktop)
3. **Verify accessibility** (keyboard navigation, screen readers)
4. **Run the linter** (`npm run lint`)

## 🌐 Internationalization

DevHub supports multiple languages. When adding new features:

1. Add translations to `lib/i18n/locales/en.ts`
2. Add Korean translations to `lib/i18n/locales/ko.ts`
3. Use the `useTranslation` hook for text content

## 🚀 Adding a New Tool

To add a new utility tool:

1. Create a new directory in `app/tools/[tool-name]/`
2. Add `page.tsx`, `layout.tsx`, and `metadata.ts`
3. Implement the tool logic in `lib/converters/`
4. Add translations to both `en.ts` and `ko.ts`
5. Update the tools list in `lib/i18n/locales/*/toolsPage.items`

## 📋 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add new UUID generator tool
fix: Fix timestamp conversion for negative values
docs: Update README with new tool
style: Format code with prettier
refactor: Simplify color conversion logic
perf: Optimize JSON formatter performance
test: Add tests for regex tester
chore: Update dependencies
```

## 🔄 Pull Request Process

1. **Create an issue** first (if one doesn't exist)
2. **Fork and clone** the repository
3. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/tool-name-#issue-number
   ```
4. **Make your changes** following the guidelines
5. **Test thoroughly**
6. **Commit with clear messages**
7. **Push to your fork**
8. **Create a Pull Request** with:
   - Clear title and description
   - Reference to the issue (`Closes #123`)
   - Screenshots if UI changes

## ⚖️ Code of Conduct

### Our Standards

- Be **respectful** and **inclusive**
- Welcome **constructive feedback**
- Focus on what is **best for the community**
- Show **empathy** towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information

## 📞 Questions?

If you have questions about contributing:

- Open a [GitHub Discussion](https://github.com/devlikebear/devhub/discussions)
- Create an [issue](https://github.com/devlikebear/devhub/issues)
- Contact via email: devlikebear@gmail.com

## 📄 License

By contributing to DevHub, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

**Thank you for contributing to DevHub!** 🚀
