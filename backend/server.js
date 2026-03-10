const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const shareABI = require("./contracts/ShareToken.json").abi;
const inrABI = require("./contracts/INRToken.json").abi;
const settlementABI = require("./contracts/Settlement.json").abi;

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- BLOCKCHAIN CONNECTION ---------------- */

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

const privateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const wallet = new ethers.Wallet(privateKey, provider);

/* 🔑 Nonce Manager (fix nonce issues) */
const nonceManager = new ethers.NonceManager(wallet);

/* ---------------- CONTRACT ADDRESSES ---------------- */

const shareAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const inrAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const settlementAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

/* ---------------- CONTRACT INSTANCES ---------------- */

const shareContract = new ethers.Contract(
  shareAddress,
  shareABI,
  nonceManager
);

const inrContract = new ethers.Contract(
  inrAddress,
  inrABI,
  nonceManager
);

const settlementContract = new ethers.Contract(
  settlementAddress,
  settlementABI,
  nonceManager
);

/* ---------------- ROOT TEST ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("Blockchain Settlement Backend Running");
});

/* ---------------- SETUP TOKENS (RUN ONCE) ---------------- */

app.get("/setup", async (req, res) => {

  try {

    const buyer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const seller = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

    const sellerWallet = new ethers.Wallet(
      "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
      provider
    );

    const sellerShare = shareContract.connect(sellerWallet);

    /* give shares to seller */
    const tx1 = await shareContract.transfer(seller, 100);
    await tx1.wait();

    /* give INR to buyer */
    const tx2 = await inrContract.transfer(buyer, 10000);
    await tx2.wait();

    /* seller approves settlement contract */
    const tx3 = await sellerShare.approve(settlementAddress, 100);
    await tx3.wait();

    /* buyer approves settlement contract */
    const tx4 = await inrContract.approve(settlementAddress, 10000);
    await tx4.wait();

    res.json({ status: "Setup complete" });

  } catch (error) {

    res.json({ error: error.message });

  }

});

/* ---------------- EXECUTE TRADE ---------------- */

app.post("/settleTrade", async (req, res) => {
  try {
    const buyer = ethers.getAddress(req.body.buyer);
    const seller = ethers.getAddress(req.body.seller);
    const shares = Number(req.body.shares);
    const price = Number(req.body.price);

    console.log("Executing trade...");

    const tx = await settlementContract.settleTrade(
      buyer,
      seller,
      shares,
      price
    );

    await tx.wait();

    res.json({
      status: "Trade Settled Successfully",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: error.message,
    });
  }
});

/* ---------------- START SERVER ---------------- */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});