import React, { createContext, useContext, useMemo, ReactNode, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { TOKEN_ADDRESS, TOKEN_ABI, PRESALE_ADDRESS, PRESALE_ABI, RPC_URL } from '../config';
import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi';
// Replace with your actual contract address and ABI
const tokenContractAddress = TOKEN_ADDRESS;
const tokenContractAbi = TOKEN_ABI;

const presaleContractAddress = PRESALE_ADDRESS;
const presaleContractAbi = PRESALE_ABI;

interface ContractContextProps {
  tokenContract: ethers.Contract | null;
  presaleContract: ethers.Contract | null;
  tokenDecimals: number;
  stageBlocksDuration: number;
  stageMaxTokens: number;
  stageMaxWalletBuy: number;
  unitPrice: number;
  blockStart: number;
  currentStage: number;
  currentStageAvailableAmount: number;
  currentStageBlockStart: number;
  currentStageMaxAmount: number;
  paused: string;
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  currentBlockNumber: number;
  getTokenInfo: () => void;
  currentStageStartTimeStamp: number;
}

const ContractContext = createContext<ContractContextProps>({
  tokenContract: null,
  presaleContract: null,
  tokenDecimals: 0,
  stageBlocksDuration: 0,
  stageMaxTokens: 0,
  stageMaxWalletBuy: 0,
  unitPrice: 0,
  blockStart: 0,
  currentStage: 0,
  currentStageAvailableAmount: 0,
  currentStageBlockStart: 0,
  currentStageMaxAmount: 0,
  paused: 'False',
  tokenName: '',
  tokenSymbol: '',
  totalSupply: 0,
  getTokenInfo: () => {},
  currentBlockNumber: 3882142,
  currentStageStartTimeStamp: 0,
});

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  let provider: ethers.Provider;

  if (typeof window !== 'undefined' && window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
  } else {
    provider = new ethers.JsonRpcProvider(RPC_URL);
  }
  const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, provider);
  const presaleContract = new ethers.Contract(presaleContractAddress, presaleContractAbi, provider);
  const [currentBlockNumber, setCurrentBlockNumber] = useState(38882142);
  const [currentStageStartTimeStamp, setCurrentStageStartTimeStamp] = useState(0);

  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);

  const [stageBlocksDuration, setStageBlocksDuration] = useState(0);
  const [stageMaxTokens, setStageMaxTokens] = useState(0);
  const [stageMaxWalletBuy, setStageMaxWalletBuy] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [blockStart, setBlockStart] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [currentStageAvailableAmount, setCurrentStageAvailableAmount] = useState(0);
  const [currentStageBlockStart, setCurrentStageBlockStart] = useState(0);
  const [currentStageMaxAmount, setCurrentStageMaxAmount] = useState(0);
  const [paused, setPaused] = useState('False');

  const getTokenInfo = async () => {
    const decimals = await tokenContract.decimals();
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const supply = await tokenContract.totalSupply();

    const blockDuration = await presaleContract.STAGE_BLOCKS_DURATION();
    const maxTokens = await presaleContract.STAGE_MAX_TOKENS();
    const maxWalletBy = await presaleContract.STAGE_MAX_WALLET_BUY();
    const unitP = await presaleContract.UNIT_PRICE();
    const start = await presaleContract.blockStart();
    const cuStage = await presaleContract.currentStage();
    const ableAmount = await presaleContract.currentStageAvailableAmount();
    const cuBlockStart = await presaleContract.currentStageBlockStart();
    const cuMaxAmount = await presaleContract.currentStageMaxAmount();
    const paus = await presaleContract.paused();

    setStageBlocksDuration(Number(blockDuration));
    setStageMaxTokens(Number(maxTokens) / Math.pow(10, Number(decimals)));
    setStageMaxWalletBuy(Number(maxWalletBy) / Math.pow(10, Number(decimals)));
    setUnitPrice(Number(unitP));
    setBlockStart(Number(start));
    setCurrentStage(Number(cuStage));
    setCurrentStageAvailableAmount(Number(ableAmount) / Math.pow(10, Number(decimals)));
    setCurrentStageBlockStart(Number(cuBlockStart));
    setCurrentStageMaxAmount(Number(cuMaxAmount) / Math.pow(10, Number(decimals)));
    setPaused(paus);

    setTokenDecimals(Number(decimals));
    setTokenName(name);
    setTokenSymbol(symbol);
    setTotalSupply(Number(supply));

    const blockNum = await provider.getBlockNumber();
    const blockData = await provider.getBlock(Number(cuBlockStart));

    if (blockData) {
      setCurrentStageStartTimeStamp(blockData.timestamp);
    }
    setCurrentBlockNumber(blockNum);
  };

  useEffect(() => {
    getTokenInfo();
  }, [tokenContract, presaleContract]);

  return (
    <ContractContext.Provider
      value={{
        currentBlockNumber,
        currentStageStartTimeStamp,
        tokenContract,
        presaleContract,
        tokenDecimals,
        tokenName,
        tokenSymbol,
        totalSupply,
        getTokenInfo,
        stageBlocksDuration,
        stageMaxTokens,
        stageMaxWalletBuy,
        unitPrice,
        blockStart,
        currentStage,
        currentStageAvailableAmount,
        currentStageBlockStart,
        currentStageMaxAmount,
        paused,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
