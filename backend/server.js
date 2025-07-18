
require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractABI = require("./artifacts/contracts/RealEstateToken.sol/RealEstateToken.json").abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

app.post("/transfer", async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (!ethers.isAddress(to)) {
      return res.status(400).json({ error: "Dirección inválida" });
    }

    const tx = await contract.transfer(to, ethers.parseUnits(amount.toString(), 18));
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transferencia fallida" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
