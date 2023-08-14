# Lotus - Decentralized Grant Platform

![Lotus Logo](./logo.jpeg)

Welcome to the Lotus - A decentralized Grant Platform! This platform is designed to empower innovators, creators, and change-makers by providing a transparent and decentralized way to fund and support projects that drive positive impact. It is your gateway to decentralized innovation. Here, visionary project concepts find their wings as they journey through the expert evaluation of seasoned project managers and developers. Our platform offers a unique opportunity for these ideas to not only secure funding but also be nurtured to life.

With Lotus, the path from ideation to fruition becomes a collaborative voyage. Project proposals are meticulously assessed by industry experts who bring their insights to the table. Once greenlit, ideas receive the financial backing they deserve, coupled with the guidance to navigate the complex terrain of innovation. Amidst a vibrant ecosystem, Lotus Connect serves as a catalyst for transformation. We empower dreamers, creators, and disruptors to rewrite the rules and redefine progress. Join us in crafting a future where pioneering concepts thrive, and together, we'll light up the landscape of possibility.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Architecture Overview](#architecture-overview)
- [Smart Contracts](#smart-contracts)
- [Frontend](#frontend)
- [Backend](#backend)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Hardhat
- Foundry
- AWS CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dulaz41/Lotus-ETHGlobal_Superhack.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Lotus-ETHGlobal_Superhack
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Architecture Overview

Lotus is built with a multi-layered architecture:

- **Smart Contracts**: The foundation of the platform, written in Solidity, governing grant allocation and management.

- **Frontend**: The user interface, developed using Next.js, providing a seamless and intuitive experience for users to interact with the platform.

- **Backend**: Handles authentication, API integration, and communication between the frontend and the blockchain.

## Smart Contracts

The core of Lotus is its smart contracts, found in the `contracts` directory. These contracts define the logic for grant proposals, funding, and withdrawal processes.

## Frontend

The `frontend` directory houses the Next.js application responsible for user interaction. It includes components for proposal submission, campaign, and project tracking.

## Backend

The backend, located in the `backend` directory, facilitates communication between the frontend and the smart contracts. It handles user authentication, API requests, and contract interaction.

## Deployment

Lotus leverages Hardhat for local development and Foundry for deploying smart contracts to various networks. The application is deployed on AWS using services like EC2, S3, and RDS.

- [Optimism Mainnet](https://optimistic.etherscan.io/address/0x07cf7edf03e6ed1d3ad236ccf87244ac818b1c42)
- [BASE Goerli Testnet](https://goerli.basescan.org/address/0xa52a2fb8457f8beb875a4721a24f590580f86964)
- [ZORA Testnet](https://testnet.explorer.zora.energy/address/0x376b0c4395ceD6Bb662e54aEA0986a49794cC7a1)
- [MODE Testnet](https://sepolia.explorer.mode.network/address/0xe34da804a1FC1D16045f589eFa5D649612180dDD)

## Contributing

We welcome contributions from the community! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Submit a pull request.

Please review our [Contribution Guidelines](./smart%20contract/CONTRIBUTING.md) for detailed information on the contribution process.

## License

This project is licensed under the [MIT License](./smart%20contract/LICENSE).

---

Thank you for choosing Lotus Decentralized Grant Platform. Your journey towards collaborative innovation starts here. Feel free to reach out to our team with any questions or feedback. Together, we can drive positive change and transform ideas into reality.
