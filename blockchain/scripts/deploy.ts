import { ethers } from "ethers";
import hre from "hardhat";

async function main() {

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  const signer = await provider.getSigner();

  const ShareToken = await hre.artifacts.readArtifact("ShareToken");
  const INRToken = await hre.artifacts.readArtifact("INRToken");
  const Settlement = await hre.artifacts.readArtifact("Settlement");

  const shareFactory = new ethers.ContractFactory(
    ShareToken.abi,
    ShareToken.bytecode,
    signer
  );

  const share = await shareFactory.deploy();
  await share.waitForDeployment();

  const inrFactory = new ethers.ContractFactory(
    INRToken.abi,
    INRToken.bytecode,
    signer
  );

  const inr = await inrFactory.deploy();
  await inr.waitForDeployment();

  const settlementFactory = new ethers.ContractFactory(
    Settlement.abi,
    Settlement.bytecode,
    signer
  );

  const settlement = await settlementFactory.deploy(
    await share.getAddress(),
    await inr.getAddress()
  );

  await settlement.waitForDeployment();

  console.log("ShareToken deployed to:", await share.getAddress());
  console.log("INRToken deployed to:", await inr.getAddress());
  console.log("Settlement deployed to:", await settlement.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});