import React, { createContext, useContext, ReactNode } from 'react';
import { TOKEN_ADDRESS, TOKEN_ABI, PRESALE_ADDRESS, PRESALE_ABI } from '../config';
import { useContractReads } from 'wagmi';
import { getAccount } from '@wagmi/core';
import { Abi } from 'viem';

interface ContractContextProps {
  symbol: string;
  STAGE_BLOCKS_DURATION: number;
  STAGE_MAX_TOKENS: number;
  STAGE_MAX_WALLET_BUY: number;
  STAGE_PRICE_INCREMENT: number;
  UNIT_PRICE: number;
  blockStart: number;
  currentStage: number;
  currentStageAvailableAmount: number;
  currentStageBlockStart: number;
  currentStageMaxAmount: number;
  currentStagePrice: number;
  currentStageSoldAmount: number;
  owner: string;
  paused: boolean;
  saleToken: string;
  isFetching: boolean;
}

const ContractContext = createContext<ContractContextProps>({
  symbol: '',
  STAGE_BLOCKS_DURATION: 0,
  STAGE_MAX_TOKENS: 0,
  STAGE_MAX_WALLET_BUY: 0,
  STAGE_PRICE_INCREMENT: 0,
  UNIT_PRICE: 0,
  blockStart: 0,
  currentStage: 0,
  currentStageAvailableAmount: 0,
  currentStageBlockStart: 0,
  currentStageMaxAmount: 0,
  currentStagePrice: 0,
  currentStageSoldAmount: 0,
  owner: '',
  paused: false,
  saleToken: '',
  isFetching: false,
});

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { address } = getAccount();

  const { data, isFetching, status } = useContractReads({
    contracts: [
      {
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI as Abi,
        functionName: 'symbol', // 0
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'STAGE_BLOCKS_DURATION', // 1
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'STAGE_MAX_TOKENS', // 2
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'STAGE_MAX_WALLET_BUY', // 3
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'STAGE_PRICE_INCREMENT', // 4
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'UNIT_PRICE', // 5
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'blockStart', // 6
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'currentStage', // 7
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'currentStageAvailableAmount', // 8
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'currentStageBlockStart', // 9
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'currentStageMaxAmount', // 10
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'currentStagePrice', // 11
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        args: [address as string],
        functionName: 'currentStageSoldAmount', // 12
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'owner', // 13
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'paused', // 14
      },
      {
        address: PRESALE_ADDRESS,
        abi: PRESALE_ABI as Abi,
        functionName: 'saleToken', // 15
      },
      {
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI as Abi,
        functionName: 'decimals', // 16
      },
    ],
  });

  const values = {
    symbol: data ? (data[0].result as string) : '',
    STAGE_BLOCKS_DURATION: data ? Number(data[1].result) : 0,
    STAGE_MAX_TOKENS: data ? Number(data[2].result) : 0,
    STAGE_MAX_WALLET_BUY: data ? Number(data[3].result) : 0,
    STAGE_PRICE_INCREMENT: data ? Number(data[4].result) : 0,
    UNIT_PRICE: data ? Number(data[5].result) : 0,
    blockStart: data ? Number(data[6].result) : 0,
    currentStage: data ? Number(data[7].result) : 0,
    currentStageAvailableAmount: data ? Number(data[8].result) : 0,
    currentStageBlockStart: data ? Number(data[9].result) : 0,
    currentStageMaxAmount: data ? Number(data[10].result) : 0,
    currentStagePrice: data ? Number(data[11].result) / 10 ** Number(data[16].result) : 0,
    currentStageSoldAmount: data ? Number(data[12].result) : 0,
    owner: data ? (data[13].result as string) : '',
    paused: data ? (data[14].result as boolean) : false,
    saleToken: data ? (data[15].result as string) : '',
  };

  console.log(values);

  return (
    <ContractContext.Provider
      value={{
        ...values,
        isFetching,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
