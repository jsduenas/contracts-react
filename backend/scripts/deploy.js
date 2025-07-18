require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying from account: ${deployer.address}`);

  const uri = process.env.PROPERTY_URI; 
  const initialSupply = parseInt(process.env.INITIAL_SUPPLY || "1000");

  const RealEstateTokenFactory = await hre.ethers.getContractFactory("RealEstateToken");
  const token = await RealEstateTokenFactory.deploy(initialSupply, uri);

  await token.waitForDeployment();

  console.log(`Token deployed at address: ${token.target}`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
