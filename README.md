# Coding Challenge

A modern React project built with Vite, TypeScript, Tailwind CSS, and CSS Modules.

## 🚀 Tech Stack

- **Build Tool**: Vite
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier
- **Package Manager**: pnpm

## 📦 Installation

```bash
pnpm install
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI
- `pnpm test:run` - Run tests once
- `pnpm lint` - Check for linting errors
- `pnpm lint:fix` - Fix linting errors automatically
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm type-check` - Run TypeScript type checking

## 🎨 Project Structure

```
src/
├── components/          # Reusable components
│   └── Button/         # Button component with CSS modules
│       ├── Button.tsx
│       ├── Button.module.css
│       ├── Button.test.tsx
│       └── index.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles with Tailwind
└── test-utils.ts       # Testing utilities
```

## 🧪 Testing

Tests are co-located with the components they test. The project uses:

- **Vitest** for test running
- **React Testing Library** for component testing
- **CSS Modules** for component styling
- **Tailwind CSS** for utility classes

## 🎯 Features

- **Hot Module Replacement (HMR)** for fast development
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **CSS Modules** for component-scoped styles
- **ESLint + Prettier** for code quality
- **Vitest** for fast testing
- **Modern React** with hooks and functional components

## 🚀 Getting Started

1. Install dependencies: `pnpm install`
2. Start development server: `pnpm dev`
3. Open [http://localhost:5173](http://localhost:5173) in your browser
4. Start coding!

## 📝 Development

- Edit `src/App.tsx` to modify the main application
- Add new components in `src/components/`
- Use CSS Modules for component-specific styles
- Leverage Tailwind CSS utilities for rapid styling
- Write tests alongside your components

## 🧹 Code Quality

The project includes:

- **ESLint** for code linting with React and TypeScript rules
- **Prettier** for code formatting
- **TypeScript** for static type checking
- **Pre-commit hooks** can be added for automated quality checks

## 🎨 Styling

- **Tailwind CSS** for utility classes and responsive design
- **CSS Modules** for component-scoped styles
- **PostCSS** for CSS processing
- **Autoprefixer** for browser compatibility

## 🧪 Testing Strategy

- **Unit tests** for individual components
- **Integration tests** for component interactions
- **Vitest** for fast test execution
- **React Testing Library** for user-centric testing
- **Co-located tests** for better maintainability
