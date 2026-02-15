# Private Organ Donor Registry 🫀

A privacy-preserving organ donor registry built on the **Midnight Network**. This application allows individuals to register as organ donors and prove compatibility with recipients without revealing their sensitive medical data to the public.

Using **Zero-Knowledge (ZK) Proofs**, the registry ensures that personal information (blood type, tissue markers) remains encrypted and private, while still allowing for verifiable matching logic to execute on the blockchain.

## What It Does

- **Private Registration**: Users can register their blood type, organ type, and tissue markers. This data is stored in a private state, accessible only to the user.
- **ZK Compatibility Proofs**: Users can generate a cryptographic proof that they match specific donor requirements (e.g., "I match Blood Type A+ and have a Kidney available") without revealing their actual identity or full medical record.
- **Contract Interaction**: Connects directly to the Midnight blockchain to manage state and verify proofs.

## Features

- **🛡️ Privacy-First Design**: Built on Midnight, ensuring that sensitive donor data is never exposed on a public ledger.
- **🔐 Secure Wallet Connection**: Integrates with the **Midnight Lace Wallet** for secure key management and transaction signing.
- **⚡ Zero-Knowledge Matching**: Prove eligibility for donation (compatibility) using ZK circuits, keeping the underlying data secret.
- **🏥 User-Friendly Interface**: Simple web interface for connecting wallets, registering, and proving status.
- **✅ Real-Time Verification**: Instant verification of proofs against the deployed smart contract.

## Deployed Smart Contract

The application is interacting with the following deployed contract on the Midnight Testnet:

**Contract Address:**
```
8774e10a55d338bf6a1bf0b52e5cf57568b14ea523cdb1cafa6c426bd76e6a40
```

## Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Midnight Lace Wallet** extension installed in your browser.
- **Docker** (if running a local node, though this connects to a remote network).

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd midnight-organ-donor-registry
    ```

2.  Install dependencies for the frontend:
    ```bash
    cd frontend-vite-react
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Blockchain**: Midnight Network
- **Languages**: Compact (Smart Contracts), TypeScript (SDK)
- **Cryptography**: ZK Snarks (via Midnight SDK)

## License

This project is licensed under the MIT License.
