import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
    TOKEN_ADDRESS,
    TOKEN_ABI,
    PRESALE_ADDRESS,
    PRESALE_ABI,
    RPC_URL
} from '../config';

// Replace with your actual contract address and ABI
const tokenContractAddress = TOKEN_ADDRESS;
const tokenContractAbi = TOKEN_ABI;

const presaleContractAddress = PRESALE_ADDRESS;
const presaleContractAbi = PRESALE_ABI;

interface ContractContextProps {
    tokenContract: ethers.Contract | null;
    presaleContract: ethers.Contract | null;
}

const ContractContext = createContext<ContractContextProps>({
    tokenContract: null,
    presaleContract: null
});

export const useContract = () => {
    const context = useContext(ContractContext);
    if (!context) {
        throw new Error("useContract must be used within a ContractProvider");
    }
    return context;
};

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(null);
    const [presaleContract, setPresaleContract] = useState<ethers.Contract | null>(null);

    useEffect(() => {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const contractInstanceT = new ethers.Contract(tokenContractAddress, tokenContractAbi, provider);
        const contractInstanceS = new ethers.Contract(presaleContractAddress, presaleContractAbi, provider);
        setTokenContract(contractInstanceT);
        setPresaleContract(contractInstanceS);
    }, []);

    return (
        <ContractContext.Provider value={{
            tokenContract,
            presaleContract
        }}>
            {children}
        </ContractContext.Provider>
    );
};
