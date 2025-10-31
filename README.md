# GemsC - Solana Learning Platform

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![Solana](https://img.shields.io/badge/Blockchain-Solana-purple.svg) ![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)

Welcome to **GemsC** - your ultimate destination for mastering Solana blockchain development! 🚀 This interactive learning platform combines comprehensive courses, hands-on challenges, and NFT rewards to accelerate your journey from blockchain beginner to Solana expert. Learn, build, and earn in the world of Web3! 💎

## Table of Contents

- [What is GemsC?](#what-is-gemsc)
- [Key Features](#key-features)
- [How to Get Started](#how-to-get-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [How to Contribute](#how-to-contribute)
- [License](#license)

---

## What is GemsC?

**GemsC** is a revolutionary educational platform built on Solana that transforms blockchain learning into an engaging, gamified experience. Whether you're a complete beginner or an experienced developer looking to master Solana, GemsC provides:

- **Interactive Courses**: Step-by-step tutorials covering Solana fundamentals to advanced concepts
- **Hands-on Challenges**: Real-world coding challenges with instant feedback and test cases
- **NFT Rewards**: Earn unique NFTs for completing courses and challenges
- **Community Learning**: Connect with fellow learners and blockchain enthusiasts
- **Real-time Practice**: Build and deploy on Solana testnet with guided exercises

### Key Features

🎓 **Comprehensive Learning Path**

- From basic Solana concepts to advanced dApp development
- Interactive lessons with code examples and explanations
- Progress tracking and achievement system

🧪 **Practical Challenges**

- Real-world coding problems with automated testing
- Multiple difficulty levels (Beginner → Advanced)
- Instant feedback and detailed solutions

🎨 **NFT Achievement System**

- Earn unique NFTs for course completion
- Showcase your blockchain development skills
- Collectible rewards for milestones and achievements

🌐 **Community Features**

- Q&A forum for learners and developers
- User reputation and leaderboard system
- Collaborative learning environment

⚡ **Solana Integration**

- Direct integration with Solana wallets
- Testnet deployment and interaction
- Real-time blockchain data and transactions

---

## How to Get Started

Ready to start your Solana development journey? Follow these steps to set up **GemsC** locally and begin learning! 🚀

### Prerequisites

Before you begin, ensure you have:

- **Node.js**: Version 18 or higher (recommended: 20.x)
- **npm or pnpm**: Package manager (we use pnpm in this project)
- **Git**: For cloning the repository
- **Solana CLI** (optional): For advanced development and testing
- **Web Browser**: Modern browser with Web3 wallet support (Chrome, Firefox, Edge)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/youngclement/ennft-client.git
   cd ennft-client
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory and add the required variables:

   ```env
   # App Configuration
   NEXT_PUBLIC_APP_NAME="GemsC - Solana Learning Platform"

   # WalletConnect (for multi-chain support)
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

   # TinyMCE Rich Text Editor
   NEXT_PUBLIC_TINYMCE_API_KEY=your_tinymce_api_key

   # Supabase (Database)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Solana RPC Configuration (optional - defaults provided)
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   ```

4. **Start the development server**:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Access the platform**:
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
   - Connect your Solana wallet (Phantom, Solflare, etc.)
   - Start learning and earning NFTs! 🎓✨

---

## Technologies

GemsC is built with cutting-edge technologies to deliver a seamless learning experience with robust Solana integration:

### Frontend Framework

- **Next.js 13.5.1**: React framework with App Router for optimal performance and SEO
- **React 18**: Modern React with concurrent features and hooks
- **TypeScript 5.2.2**: Type-safe development for better code quality and developer experience

### UI/UX & Styling

- **Tailwind CSS 3.3.3**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Accessible, unstyled UI primitives for consistent design
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, consistent icon library
- **Next Themes**: Dark/light mode support

### Solana & Blockchain Integration

- **@solana/web3.js**: Official Solana JavaScript SDK for blockchain interactions
- **@solana/wallet-adapter-react**: React hooks for Solana wallet connections
- **@solana/wallet-adapter-wallets**: Support for popular Solana wallets (Phantom, Solflare, etc.)
- **@metaplex-foundation/mpl-core**: Metaplex SDK for NFT operations
- **@metaplex-foundation/umi**: Modern Metaplex framework for NFT management

### Additional Libraries

- **TinyMCE React**: Rich text editor for course content and Q&A
- **RainbowKit**: Wallet connection UI components
- **Wagmi**: React hooks for Ethereum-compatible chains
- **Supabase**: Backend-as-a-Service for database and authentication
- **React Query**: Powerful data fetching and caching
- **React Hook Form**: Performant forms with validation
- **Zod**: TypeScript-first schema validation

### Development Tools

- **ESLint**: Code linting for consistent code quality
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

This tech stack ensures GemsC delivers a fast, secure, and user-friendly learning experience while maintaining deep integration with the Solana ecosystem! 🚀

## Project Structure

```
gemsc-client/
├── app/                    # Next.js 13+ app directory with route-based architecture
│   ├── api/               # API routes for backend functionality
│   │   ├── certificates/  # NFT certificate minting endpoints
│   │   └── challenges/    # Challenge submission and validation
│   ├── elearning/         # Learning platform pages
│   │   ├── challenges/    # Coding challenge pages
│   │   ├── dashboard/     # Student dashboard
│   │   └── learn/         # Course learning interface
│   ├── leaderboard/       # Community leaderboard
│   ├── questions/         # Q&A forum pages
│   └── users/             # User profiles and management
├── components/            # Reusable React components
│   ├── elearning/         # Learning-specific components
│   ├── home/              # Homepage components
│   ├── questions/         # Q&A components
│   ├── ui/                # Base UI components (shadcn/ui)
│   └── wallet/            # Wallet connection components
├── configs/               # Configuration files
│   └── WalletConfig.ts    # Wallet connection setup
├── constants/             # Application constants and enums
├── contexts/              # React Context providers
│   └── providers/         # Global state management
├── lib/                   # Utility libraries and configurations
│   ├── contracts/         # Smart contract ABIs and types
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   └── validations/       # Form validation schemas
├── public/                # Static assets
│   └── imgs/              # Images and media files
├── service/               # Service layer for API calls
│   ├── dto/               # Data transfer objects
│   └── *.service.ts       # Service modules
└── types/                 # TypeScript type definitions
```

### Key Directories Explained

- **`app/`**: Next.js App Router pages with server and client components
- **`components/`**: Modular, reusable UI components organized by feature
- **`lib/`**: Core business logic, utilities, and external service integrations
- **`service/`**: API service layer with DTOs for type-safe data handling
- **`configs/`**: Configuration files for wallets, databases, and external services

---

## Environment Setup

### WalletConnect Configuration

1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/) and create a project
2. Copy your Project ID and add it to your `.env.local` file

### TinyMCE Setup

1. Sign up for a free API key at [TinyMCE](https://www.tiny.cloud/)
2. Add the API key to your environment variables

### Supabase Configuration (Optional)

GemsC uses Supabase for user data and content management:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Add your project URL and anon key to environment variables

### Solana Development (Optional)

For advanced development and testing:

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.18.4/install)"

# Configure for devnet
solana config set --url https://api.devnet.solana.com

# Create a wallet for testing
solana-keygen new --outfile ~/.config/solana/devnet.json
```

## Available Scripts

This project uses pnpm as the package manager. Here are the available scripts:

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # Run ESLint for code linting
pnpm lint:fix     # Auto-fix linting issues

# Type Checking
pnpm type-check   # Run TypeScript type checking

# Database (if using Supabase)
pnpm db:generate  # Generate database types
pnpm db:push      # Push schema changes to database
```

### Development Workflow

1. `pnpm dev` - Start the development server
2. Make changes to components in the `app/` or `components/` directories
3. The app will hot-reload automatically
4. Run `pnpm lint` periodically to ensure code quality
5. Test wallet connections and NFT minting on Solana devnet

---

## How to Contribute

We welcome contributions from developers, educators, and blockchain enthusiasts! Here's how you can help make GemsC better:

### Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? Open an issue with detailed steps to reproduce
- ✨ **Feature Requests**: Have ideas for new courses or features? Share them in Discussions
- 📝 **Content Creation**: Help create new Solana learning content or challenges
- 🔧 **Code Contributions**: Fix bugs, add features, or improve the codebase
- 📚 **Documentation**: Improve documentation, tutorials, or code comments

### Development Process

1. **Fork** the repository on GitHub
2. **Clone** your fork locally: `git clone https://github.com/your-username/ennft-client.git`
3. **Create** a feature branch: `git checkout -b feature/your-feature-name`
4. **Install** dependencies: `pnpm install`
5. **Make** your changes with proper TypeScript types and tests
6. **Test** thoroughly, especially wallet connections and NFT functionality
7. **Commit** with clear messages: `git commit -m "feat: add new Solana course module"`
8. **Push** to your branch: `git push origin feature/your-feature-name`
9. **Open** a Pull Request with a detailed description

### Contribution Guidelines

- Follow the existing code style and TypeScript conventions
- Write clear, concise commit messages
- Test your changes on both desktop and mobile
- Ensure wallet functionality works with popular Solana wallets (Phantom, Solflare)
- Add appropriate documentation for new features
- Keep PRs focused on a single feature or fix

### Areas Needing Help

- **Course Content**: Create more Solana development tutorials
- **Challenge Development**: Build interactive coding challenges
- **UI/UX Improvements**: Enhance the learning experience
- **Performance Optimization**: Improve loading times and responsiveness
- **Testing**: Add more comprehensive test coverage
- **Documentation**: Expand developer and user documentation

### Testing Your Changes

Before submitting a PR, ensure:

- ✅ Code compiles without TypeScript errors
- ✅ ESLint passes without warnings
- ✅ Wallet connections work properly
- ✅ NFT minting functionality is tested (on devnet)
- ✅ Responsive design works on mobile devices
- ✅ No console errors in the browser

Thank you for helping build the future of Solana education! 🚀

---

## License

**GemsC** is released under the **MIT License**. This permissive license allows you to use, modify, and distribute the code for both commercial and non-commercial purposes. See the [LICENSE](./LICENSE) file for the full license text.

### Third-Party Licenses

This project uses various open-source libraries and tools. Please refer to their respective licenses:

- Next.js (MIT)
- React (MIT)
- Solana Web3.js (MIT)
- Metaplex SDK (Apache 2.0)
- Tailwind CSS (MIT)
- Radix UI (MIT)

---

<div align="center">
  <p><strong>Built with ❤️ for the Solana community</strong></p>
  <p>
    <a href="#gemsc---solana-learning-platform">Back to Top</a>
  </p>
</div>
