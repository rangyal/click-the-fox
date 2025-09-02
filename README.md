# 🦊 Click the Fox! Game

A fast-paced browser game where players must quickly identify and click on fox images while avoiding cats and dogs.

## 🌐 Live App

Available here: [click-the-fox-nine.vercel.app](https://click-the-fox-nine.vercel.app/)

## 🎮 How to Play

1. **Enter your name** on the welcome screen
2. **Click the PLAY! button** to start playing
3. **Click on foxes** to earn +1 point
4. **Avoid cats and dogs** (they cost -1 point each)
5. **Race against time** to achieve the highest score possible
6. **View your score** on the leaderboard when time runs out

## 🔧 Development

### 🚀 Getting Started

1. **Install dependencies**: `pnpm install`
2. **Start development server**: `pnpm dev`
3. **Open your browser**: Navigate to [http://localhost:5173](http://localhost:5173)
4. **Start playing**: Enter your name and click PLAY!

Note: Other package managers (npm, yarn) should work with equivalent commands.

### Key Development Commands

```bash
# Run type checking
pnpm type-check
# Run tests
pnpm test:run
# Lint code
pnpm lint
```

### 🚀 Tech Stack

- **Build Tool**: Vite
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier
- **External APIs**
  - _Foxes_: [Random Fox API](https://randomfox.ca/floof/)
  - _Cats_: [The Cat API](https://api.thecatapi.com/v1/images/search)
  - _Dogs_: [Dog CEO API](https://dog.ceo/api/breeds/image/random)

### 🎨 Project Structure

```
src/
├── api/                  # External API integrations
│   ├── cats.ts           # The Cat API integration
│   ├── dogs.ts           # Dog CEO API integration
│   ├── foxes.ts          # Random Fox API integration
│   ├── types.ts          # Animal type definitions
│   └── utils.ts          # API utility functions
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── screens/              # Game screens
├── utils/                # Utility functions
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```
