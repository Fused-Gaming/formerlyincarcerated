// Deployment script for Bitcoin Land Bond Phase 0 contracts
// Usage: hardhat run scripts/deploy.js --network sepolia

async function main() {
  console.log("Deploying Bitcoin Land Bond Phase 0 Contracts...");
  console.log("Network:", (await ethers.provider.getNetwork()).name);

  // TODO: Replace with actual board member addresses
  const boardMembers = [
    "0x1111111111111111111111111111111111111111",
    "0x2222222222222222222222222222222222222222",
    "0x3333333333333333333333333333333333333333",
    "0x4444444444444444444444444444444444444444",
    "0x5555555555555555555555555555555555555555",
  ];

  const opsTeam = [
    "0x6666666666666666666666666666666666666666",
    "0x7777777777777777777777777777777777777777",
    "0x8888888888888888888888888888888888888888",
  ];

  // 1. Deploy Capital Allocation Tracker (CAT)
  console.log("\n1. Deploying CapitalAllocationTracker...");
  const CAT = await ethers.getContractFactory("CapitalAllocationTracker");
  const cat = await CAT.deploy(boardMembers, opsTeam);
  await cat.waitForDeployment();
  const catAddress = await cat.getAddress();
  console.log("CAT deployed to:", catAddress);

  // 2. Deploy Deed Restriction Lock (DRL)
  console.log("\n2. Deploying DeedRestrictionLock...");
  const DRL = await ethers.getContractFactory("DeedRestrictionLock");
  const drl = await DRL.deploy();
  await drl.waitForDeployment();
  const drlAddress = await drl.getAddress();
  console.log("DRL deployed to:", drlAddress);

  // Grant roles to board members
  for (const boardMember of boardMembers) {
    await drl.grantRole(await drl.BOARD_ROLE(), boardMember);
  }
  console.log("Board roles granted on DRL");

  // 3. Deploy Resident Housing Registry (RHR)
  console.log("\n3. Deploying ResidentHousingRegistry...");
  const RHR = await ethers.getContractFactory("ResidentHousingRegistry");
  const rhr = await RHR.deploy();
  await rhr.waitForDeployment();
  const rhrAddress = await rhr.getAddress();
  console.log("RHR deployed to:", rhrAddress);

  // Grant roles to board members and case workers
  for (const boardMember of boardMembers) {
    await rhr.grantRole(await rhr.CASE_WORKER_ROLE(), boardMember);
  }
  console.log("Case worker roles granted on RHR");

  // 4. Deploy Impact Metrics Aggregator (IMA)
  console.log("\n4. Deploying ImpactMetricsAggregator...");
  const IMA = await ethers.getContractFactory("ImpactMetricsAggregator");
  const ima = await IMA.deploy();
  await ima.waitForDeployment();
  const imaAddress = await ima.getAddress();
  console.log("IMA deployed to:", imaAddress);

  // Grant roles to board members and auditors
  for (const boardMember of boardMembers) {
    await ima.grantRole(await ima.METRICS_RECORDER_ROLE(), boardMember);
  }
  console.log("Metrics recorder roles granted on IMA");

  // Save deployment addresses
  console.log("\n=== DEPLOYMENT COMPLETE ===\n");
  console.log("Contract Addresses:");
  console.log("CAT (Capital Allocation Tracker):", catAddress);
  console.log("DRL (Deed Restriction Lock):", drlAddress);
  console.log("RHR (Resident Housing Registry):", rhrAddress);
  console.log("IMA (Impact Metrics Aggregator):", imaAddress);

  console.log("\nSave these addresses to your deployment configuration file.");
  console.log("Next steps: Run security audit, then deploy to mainnet.\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
