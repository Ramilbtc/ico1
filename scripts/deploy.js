const hre = require("hardhat");

async function main() {

  const FunToken = await hre.ethers.getContractFactory("FunToken");
  const funToken = await FunToken.deploy(0);

  await funToken.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
