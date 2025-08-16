export const CUSTOM_DAI_ADDR = "0x4654B31c71f84Fc2BDd9015cf57c6af4bba1C109";
export const CUSTOM_DAI_ABI = [
  "function balanceOf(address) view returns(uint256)",
  "function approve(address,uint256)"
];

export const ORK_TOKEN_ADDR = "0x59046f0F850b8b161cD746f927D68585ad6006aF";
export const ORK_TOKEN_ABI = [
  "function balanceOf(address) view returns(uint256)"
];

export const BANK_CONTRACT_ADDR = "0x7bb408CB9dB63b78Ef2d0a17825087A6468d5BaC";
export const BANK_CONTRACT_ABI = [
  "function stackAmt(address) view returns(uint256)",
  "function stack(uint256)",
  "function unStack()"
];