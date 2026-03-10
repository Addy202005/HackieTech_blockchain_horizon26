# Real-Time Settlement for Indian Stock Markets (Blockchain)

## Overview
Indian stock markets currently follow a T+1 settlement cycle. This means that when a trade is executed today, the final transfer of money and shares happens one business day later.
Although this system works reliably, it introduces several inefficiencies:

- Capital remains locked until settlement is completed
- Counterparty risk exists until both parties fulfill obligations
- Clearing corporations act as intermediaries

This project demonstrates how blockchain technology can enable real-time settlement for stock trades.

Using smart contracts, both payment and share transfer occur in a single atomic transaction implementing Delivery vs Payment (DvP):
- Buyer pays only if shares are transferred
- Seller transfers shares only if payment is received

---

# Key Features

- Real-time blockchain-based trade settlement
- Atomic Delivery vs Payment mechanism
- MetaMask wallet integration
- Smart contract based share and payment transfer
- React-based trading interface
- Node.js backend API for blockchain interaction
- Hardhat local blockchain simulation

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite

## Backend

- Node.js
- Express.js
- Ethers.js

## Blockchain

- Solidity
- Hardhat

## Wallet

- MetaMask

---

# System Architecture

The system includes the following components:

- React frontend for the trading interface
- Express backend API for processing trade requests
- Ethers.js for blockchain interaction
- Solidity smart contracts for settlement logic
- Hardhat local blockchain for testing
- MetaMask wallet for transaction signing

---

# Smart Contracts

## ShareToken.sol

- Represents tokenized shares
- Allows transfer of share ownership between traders

## INRToken.sol

- Simulates a digital INR token used for payments

## Settlement.sol

- Executes atomic settlement between buyer and seller

Trade execution process:

- Buyer sends INR tokens to the seller
- Seller transfers share tokens to the buyer
- Both actions occur within the same blockchain transaction

---

# Project Folder Structure

Blockchain-settlement

blockchain
contracts
ShareToken.sol
INRToken.sol
Settlement.sol

scripts
deploy.ts

hardhat.config.ts

backend
server.js

frontend
React application


---

# Installation and Setup

## 1 Clone the Repository

git clone https://github.com/yourusername/blockchain-settlement.git
cd blockchain-settlement

---

## 2 Start Hardhat Blockchain

cd blockchain
npx hardhat node

---

## 3 Deploy Smart Contracts

Open another terminal:
cd blockchain
npx hardhat run scripts/deploy.ts --network localhost

Example output:

ShareToken deployed to: 0x...
INRToken deployed to: 0x...
Settlement deployed to: 0x...

---

## 4 Run Backend Server

cd backend
npm install
node server.js

Expected output:
Server running on port 5000

---

## 5 Run Frontend

cd frontend
npm install
npm run dev

Open in browser:
http://localhost:5173

---

# Connect MetaMask

Add Hardhat Network in MetaMask.

Network configuration:

- Network Name: Hardhat Local
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency Symbol: ETH

Import one private key shown in the Hardhat terminal.

Example:
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

MetaMask will show a test balance of **10000 ETH**.

---

# How to Use

- Open the web application
- Connect MetaMask wallet
- Select seller
- Enter number of shares
- Enter price
- Click Execute Trade

After successful execution, the application displays the transaction hash confirming settlement.

---

# Future Improvements

- Integration with UPI or RTGS payment systems
- On-chain order book
- Multi-user trading simulation
- Trade history dashboard
- Regulatory compliance monitoring

---

# Authors

- Arman Kamble
- Harsh Gujja
- Deepaswi Bagde
- Abhishek Yadav