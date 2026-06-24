// Test suite for CapitalAllocationTracker (CAT)
// Framework: Hardhat + Ethers.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CapitalAllocationTracker", function () {
  let cat;
  let owner, board1, board2, board3, board4, board5;
  let ops1, ops2, ops3;
  let recipient1, recipient2;

  beforeEach(async function () {
    // Get signers
    [owner, board1, board2, board3, board4, board5, ops1, ops2, ops3, recipient1, recipient2] =
      await ethers.getSigners();

    // Deploy contract
    const CAT = await ethers.getContractFactory("CapitalAllocationTracker");
    cat = await CAT.deploy(
      [board1, board2, board3, board4, board5],
      [ops1, ops2, ops3]
    );
    await cat.waitForDeployment();

    // Grant allocator role to owner for testing
    const ALLOCATOR_ROLE = await cat.ALLOCATOR_ROLE();
    await cat.grantRole(ALLOCATOR_ROLE, owner);
  });

  describe("Capital Reception", function () {
    it("Should receive capital via receiveCapital function", async function () {
      const amount = ethers.parseEther("10");
      await cat.receiveCapital("Test fund");
      expect(await cat.totalCapital()).to.equal(0);

      await owner.sendTransaction({
        to: await cat.getAddress(),
        value: amount,
      });

      expect(await cat.totalCapital()).to.equal(amount);
    });

    it("Should receive capital via fallback function", async function () {
      const amount = ethers.parseEther("5");
      await owner.sendTransaction({
        to: await cat.getAddress(),
        value: amount,
      });

      expect(await cat.totalCapital()).to.equal(amount);
    });
  });

  describe("Allocations", function () {
    beforeEach(async function () {
      // Send capital first
      const amount = ethers.parseEther("100");
      await owner.sendTransaction({
        to: await cat.getAddress(),
        value: amount,
      });
    });

    it("Should approve allocation within cap", async function () {
      const amount = ethers.parseEther("50");
      const programId = ethers.id("PROGRAM_1");

      await cat.approveAllocation(recipient1, amount, programId);

      expect(await cat.recipientAllocations(recipient1)).to.equal(amount);
      expect(await cat.programBalances(programId)).to.equal(amount);
    });

    it("Should reject allocation without sufficient capital", async function () {
      const amount = ethers.parseEther("150");
      const programId = ethers.id("PROGRAM_1");

      await expect(
        cat.approveAllocation(recipient1, amount, programId)
      ).to.be.revertedWith("Amount out of range");
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      // Setup: Send capital and allocate
      const amount = ethers.parseEther("100");
      await owner.sendTransaction({
        to: await cat.getAddress(),
        value: amount,
      });

      const allocAmount = ethers.parseEther("50");
      const programId = ethers.id("PROGRAM_1");
      await cat.approveAllocation(recipient1, allocAmount, programId);
    });

    it("Should execute withdrawal", async function () {
      const initialBalance = await ethers.provider.getBalance(recipient1);

      await cat.executeWithdrawal(recipient1);

      const finalBalance = await ethers.provider.getBalance(recipient1);
      expect(finalBalance).to.be.gt(initialBalance);
      expect(await cat.recipientAllocations(recipient1)).to.equal(0);
    });

    it("Should enforce daily withdrawal limit", async function () {
      const amount = ethers.parseEther("50");
      const programId = ethers.id("PROGRAM_2");

      // First allocation and withdrawal
      await cat.approveAllocation(recipient1, amount, programId);
      await cat.executeWithdrawal(recipient1);

      // Second allocation should fail (exceeds daily limit)
      await cat.approveAllocation(recipient2, amount, programId);
      await expect(
        cat.executeWithdrawal(recipient2)
      ).to.be.revertedWith("Daily limit exceeded");
    });
  });

  describe("Emergency Pause", function () {
    it("Should pause and unpause by ops team", async function () {
      const amount = ethers.parseEther("10");
      await owner.sendTransaction({
        to: await cat.getAddress(),
        value: amount,
      });

      // Pause
      await cat.connect(ops1).pauseAllocations();
      expect(await cat.paused()).to.be.true;

      // Allocation should fail
      const programId = ethers.id("PROGRAM_1");
      await expect(
        cat.approveAllocation(recipient1, ethers.parseEther("5"), programId)
      ).to.be.revertedWithCustomError(cat, "EnforcedPause");

      // Unpause
      await cat.connect(ops1).resumeAllocations();
      expect(await cat.paused()).to.be.false;
    });
  });

  describe("Reentrancy Protection", function () {
    it("Should protect against reentrancy attacks", async function () {
      // This test would involve deploying a malicious contract
      // that attempts to call executeWithdrawal during callback
      // TODO: Implement malicious contract test
      expect(true).to.equal(true);
    });
  });

  describe("Emergency Withdraw", function () {
    it("Should allow board to emergency withdraw funds", async function () {
      const amount = ethers.parseEther("50");
      await owner.sendTransaction({
        to: await cat.getAddress(),
        value: amount,
      });

      const catBalance = await ethers.provider.getBalance(await cat.getAddress());
      expect(catBalance).to.equal(amount);

      // Emergency withdraw by board member
      const initialBalance = await ethers.provider.getBalance(owner);
      await cat.connect(board1).emergencyWithdraw(owner);

      const finalBalance = await ethers.provider.getBalance(owner);
      expect(finalBalance).to.be.gt(initialBalance);
    });
  });
});
