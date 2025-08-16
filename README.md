<h1 align="center">🏦 BankTokenSystem using Solidity</h1>
<p align="center">
  <b>A decentralized banking system implemented with Solidity and TypeScript — blending blockchain security with a modern frontend.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/hemavardhan252004-krishnapatnam/BankTokenSystemusingSolidity?style=for-the-badge" alt="License Badge" />
  <img src="https://img.shields.io/github/languages/top/hemavardhan252004-krishnapatnam/BankTokenSystemusingSolidity?style=for-the-badge&color=brightgreen" alt="Top Language" />
  <img src="https://img.shields.io/github/commit-activity/m/hemavardhan252004-krishnapatnam/BankTokenSystemusingSolidity?style=for-the-badge&color=blue" alt="Commit Activity" />
</p>

---

##  Overview

A full-stack decentralized banking application featuring:
- A **Solidity smart contract** representing a secure token-based banking system.
- A **TypeScript + Vite** frontend for seamless interaction.
- Clean architecture with strong type safety and modular structure.

##  Tech Stack

| Component         | Stack & Tools                                     |
|------------------|---------------------------------------------------|
| Smart Contracts   |  Solidity (Ethereum)                             |
| Frontend          |  TypeScript • Vite • TailwindCSS                  |
| Local Dev         |  Hardhat or Truffle (if applicable)              |
| Styling           |  Tailwind CSS                                     |
| Testing & Linting |  ESLint • Tailwind • Tsconfig                     |

##  Project Structure

```text
/
├── contracts/            # Smart contract code (Solidity)
├── src/                  # Frontend application (TS + Vite)
├── .gitignore
├── package.json          # Frontend dependencies
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json         # TypeScript config
└── vite.config.ts        # Vite setup


Setup & Installation
Prerequisites

Node.js (v16+)

npm or Yarn

Ethereum development environment (e.g., Hardhat or Ganache)


# Clone the repo
git clone https://github.com/hemavardhan252004-krishnapatnam/BankTokenSystemusingSolidity.git
cd BankTokenSystemusingSolidity

# Install dependencies
npm install  # or yarn install


Development Workflow
# In one terminal: Compile and deploy smart contract locally
npm run dev:contract

# In another terminal: Start the frontend
npm run dev:frontend

Frontend app runs at http://localhost:3000 (or configured port).

Interacts with the deployed contract on your local Ethereum node.

Environment Variables

Create a .env file in the root (if needed):

# Smart Contract Deployment
NETWORK_URL=http://127.0.0.1:8545
PRIVATE_KEY=your_deployer_wallet_key

# Frontend API (if needed)
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddr



Available Commands
Command	Description
npm run dev:contract	Compile & deploy smart contracts
npm run dev:frontend	Launch frontend development server
npm run build	Build frontend production assets
npm run test	Run tests (smart contract/front-end)
npm run lint	Lint the project code
Contributing

We welcome contributions!

Fork the repo

Create a feature branch: git checkout -b feature/your-feature

Make your updates and commit: git commit -m "✨ Add new feature"

Push and open a Pull Request.

Please adhere to existing coding standards and include tests where relevant!
