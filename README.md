
# GemsC - Frontend

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![Ancient8](https://img.shields.io/badge/Blockchain-Ancient8-green.svg)

Welcome to the vibrant world of **GemsC - Frontend**! This is your portal to a groundbreaking blockchain-powered Q&A platform. Whether you're a curious knowledge seeker or a problem-solving pro, this frontend brings **GemsC** to life with elegance, speed, and a dash of blockchain brilliance. Here’s everything you need to know about this project! 🧠💰



## Table of Contents
-   [What is GemsC - Frontend?](#what-is-gemsc---frontend)
-   [How to Get Started](#how-to-get-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Technologies Powering GemsC](#technologies-powering-gemsc)
-   [Project Structure](#project-structure)
-   [How to Contribute](#how-to-contribute)
-   [License](#license)

----------

## What is GemsC - Frontend?

**GemsC - Frontend** is the dynamic face of a decentralized Q&A platform built on the **Ancient8 Chain**. Picture a space where you ask burning questions, receive expert answers, and earn rewards—all secured by blockchain transparency. With a sleek, real-time interface, this frontend lets you:

-   Post questions with ease and style ✍️
-   Answer queries and stack cash + reputation 💸
-   Engage with a community-driven ecosystem 🌐
-   Experience seamless integration with the **Ancient8 Chain** ✨

It’s Q&A reimagined—perfect for knowledge enthusiasts and blockchain innovators alike!

----------

## How to Get Started

Ready to dive into the knowledge hub? Follow these steps to set up **GemsC - Frontend** on your machine and start exploring! 🚀

### Prerequisites

Before you begin, ensure you have:

-   **Node.js**: Version 16 or higher—your engine for this Q&A journey.
-   **npm or yarn**: Your tool to summon dependencies.
-   **Web Browser**: Chrome, Firefox, or any browser ready to connect!

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/youngclement/ennft-client.git
   cd ennft-client
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_APP_NAME=YourAppName
	 NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-wallet-connect-project-id
	 NEXT_PUBLIC_CONTRACT_ADDRESS=your-contract-address
	 NEXT_PUBLIC_TINYMCE_API_KEY=your-tinymce-api-key
     ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Enter GemsC**:

-   Open your browser and visit [http://localhost:3000](http://localhost:3000).
-   Sit back, ask a question, and watch the blockchain-powered magic unfold! ☕✨   


----------

## Technologies Powering GemsC

This frontend is crafted with a robust blend of modern tools and libraries, merging seamless usability with blockchain integration. Here’s the tech stack driving the experience:

-   **Next.js**: Lightning-fast React framework with SSR and SSG for top-notch performance. ⚡
-   **React**: Dynamic, responsive UI for questions, answers, and interactions. 🪄
-   **TypeScript**: Solid code with static typing to keep bugs in check. 🗡️
-   **Tailwind CSS**: Sleek, responsive designs whipped up in no time. 🌪️
-   **TinyMCE React**: Rich text editing for crafting perfect questions and answers. ✍️
-   **Ethers.js, Wagmi, Viem**: Blockchain connectivity for wallets, rewards, and smart contracts. 🔐
-   **Ancient8 Chain**: Powers decentralized storage, reputation, and reward systems. ✨

Together, these tools create an intuitive, blockchain-backed frontend ready for knowledge-sharing greatness! 📚💥

## Project Structure
```
.
├── app/         # Contains the main application logic, routing, and page components for the Q&A platform
├── components/   # Reusable UI components like question forms, answer displays, and interactive modals
├── configs/      # Configuration files for system settings, environment setups, or blockchain connections
├── constants/    # Static values such as fee structures, reward rules, or predefined settings
├── contexts/     # React contexts for managing global state, like user authentication or reputation
├── lib/          # Utility libraries and helper functions for core functionality
├── public/       # Static assets like images, fonts, or other publicly accessible files
├── service/      # Service modules for handling API calls, blockchain interactions, or business logic
└── .env         # Environment configuration file storing sensitive keys and variables
```

----------

## How to Contribute

Want to shape the future of Q&A? We’d love your input! Fork the repository, make some brilliant changes, and send us a pull request. Whether it’s squashing bugs, enhancing features, or polishing the UI, every contribution makes **GemsC** even more extraordinary! 🧠⚡

----------

## License
**GemsC - Frontend** is released under the **MIT License**. Feel free to explore, tweak, and share—just check the [LICENSE](./LICENSE) file for details.
