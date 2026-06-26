# Bitcoin Land Bond Smart Contracts

Phase 0 smart contract implementation for criminal asset recovery and permanent affordable housing.

## Overview

Four core contracts manage the Bitcoin Land Bond initiative:

1. **CapitalAllocationTracker (CAT)** - Manages capital from Bitcoin legacy recovery
2. **DeedRestrictionLock (DRL)** - Enforces permanent deed restrictions on properties
3. **ResidentHousingRegistry (RHR)** - Tracks resident records and compliance
4. **ImpactMetricsAggregator (IMA)** - Measures housing stability and ROI

See `/contracts/ARCHITECTURE.md` for full technical specifications.

## Quick Start

### Installation

```bash
npm install
```

### Compilation

```bash
npm run compile
```

### Testing

```bash
npm test
npm run test:gas        # With gas reporting
npm run test:coverage   # With coverage report
```

### Deployment

**Testnet (Sepolia):**
```bash
npm run deploy:sepolia
```

**Mainnet:**
```bash
npm run deploy:mainnet
```

### Verification

```bash
npm run verify:sepolia -- <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
npm run verify:mainnet -- <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

## Environment Setup

Copy `.env.example` to `.env` and fill in:
- `SEPOLIA_RPC_URL` - Sepolia testnet RPC
- `MAINNET_RPC_URL` - Ethereum mainnet RPC
- `PRIVATE_KEY` - Deployment wallet private key
- `ETHERSCAN_API_KEY` - For contract verification

## Security

- **Auditor:** OpenZeppelin Labs (Week 6, 2026)
- **Security Checklist:** See `/contracts/SECURITY.md`
- **Multi-Sig:** 3-of-5 board required for allocations >50 ETH
- **Circuit Breaker:** 500 ETH/day withdrawal limit

## Deployment Timeline

- **Week 4:** Testnet (Sepolia) deployment
- **Week 5:** Third-party audit begins
- **Week 6:** Audit findings, board approval
- **Week 8:** Mainnet (Ethereum L1) deployment

## Development

### File Structure

```
contracts/
├── contracts/               # Solidity source files
│   ├── CapitalAllocationTracker.sol
│   ├── DeedRestrictionLock.sol
│   ├── ResidentHousingRegistry.sol
│   └── ImpactMetricsAggregator.sol
├── test/                    # Hardhat test suite
├── scripts/                 # Deployment scripts
├── hardhat.config.js        # Hardhat configuration
└── package.json             # Dependencies
```

### Best Practices

- Run tests before commits: `npm test`
- Check gas usage: `npm run test:gas`
- Lint code: `npm run lint`
- Format code: `npm run format`

## Documentation

- **ARCHITECTURE.md** - Contract specifications and security model
- **DEPLOYMENT_PLAN.md** - Testnet to mainnet deployment timeline
- **SECURITY.md** - Pre-audit checklist and vulnerability scan plan

## License

MIT - See LICENSE file
