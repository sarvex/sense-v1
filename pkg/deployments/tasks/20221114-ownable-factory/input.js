const {
  WETH_TOKEN,
  CHAINS,
  SENSE_MULTISIG,
  MORPHO_USDC,
  MORPHO_DAI,
  RLV_FACTORY,
} = require("../../hardhat.addresses");
const ethers = require("ethers");

// Only for hardhat, we will deploy adapters using Defender
const SAMPLE_TARGETS = [
  { name: "maDAI", address: MORPHO_DAI.get(CHAINS.MAINNET) },
  { name: "maUSDC", address: MORPHO_USDC.get(CHAINS.MAINNET) },
  // { name: "maUSDT", address: MORPHO_USDT.get(CHAINS.MAINNET) },
];

const MAINNET_FACTORIES = [
  {
    contractName: "OwnableERC4626Factory",
    ifee: ethers.utils.parseEther("0.0010"), // 0.1%
    stake: WETH_TOKEN.get(CHAINS.MAINNET),
    stakeSize: ethers.utils.parseEther("0.25"), // 0.25 WETH
    minm: ((365.25 * 24 * 60 * 60) / 12).toString(), // 1 month
    maxm: (10 * 365.25 * 24 * 60 * 60).toString(), // 10 years
    mode: 0, // 0 = monthly
    tilt: 0,
    guard: ethers.utils.parseEther("100000"), // $100'000
    targets: SAMPLE_TARGETS,
  },
];

// For Goerli
const SAMPLE_TARGETS_GOERLI = [{ name: "maDAI", address: MORPHO_DAI.get(CHAINS.GOERLI) }];

const GOERLI_FACTORIES = [
  {
    contractName: "OwnableERC4626Factory",
    ifee: ethers.utils.parseEther("0.0010"), // 0.1%
    stake: WETH_TOKEN.get(CHAINS.MAINNET),
    stakeSize: ethers.utils.parseEther("0.25"), // 0.25 WETH
    minm: ((365.25 * 24 * 60 * 60) / 12).toString(), // 1 month
    maxm: (10 * 365.25 * 24 * 60 * 60).toString(), // 10 years
    mode: 0, // 0 = monthly
    tilt: 0,
    guard: ethers.utils.parseEther("100000"), // $100'000
    targets: SAMPLE_TARGETS_GOERLI,
  },
];

module.exports = {
  // mainnet
  1: {
    divider: "0x86bA3E96Be68563E41c2f5769F1AF9fAf758e6E0",
    periphery: "0xFff11417a58781D3C72083CB45EF54d79Cd02437",
    oracle: "0x11D341d35BF95654BC7A9db59DBc557cCB4ea101",
    oldSpaceFactory: "0x5f6e8e9C888760856e22057CBc81dD9e0494aA34",
    restrictedAdmin: SENSE_MULTISIG.get(CHAINS.MAINNET),
    rewardsRecipient: SENSE_MULTISIG.get(CHAINS.MAINNET),
    rlvFactoryr: RLV_FACTORY.get(CHAINS.MAINNET),
    factories: MAINNET_FACTORIES,
  },
  5: {
    divider: "0x09B10E45A912BcD4E80a8A3119f0cfCcad1e1f12",
    periphery: "0x876CaD23753F033E5308CFcc66E7608645527a9e",
    oracle: "0xB3e70779c1d1f2637483A02f1446b211fe4183Fa",
    oldSpaceFactory: "",
    restrictedAdmin: SENSE_MULTISIG.get(CHAINS.GOERLI),
    rewardsRecipient: SENSE_MULTISIG.get(CHAINS.GOERLI),
    rlvFactory: RLV_FACTORY.get(CHAINS.GOERLI),
    factories: GOERLI_FACTORIES,
  },
};
