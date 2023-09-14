import React, { useState, useEffect, useContext } from 'react'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { funTokenAddress, funTokenABI } from './constants';

const fetchContractERC20 = (signerOrProvider) =>
    new ethers.Contract(funTokenAddress, funTokenABI, signerOrProvider);

export const ERC20ICOContext = React.createContext();

export const ERC20Provider = ({ children }) => {
    const funToken = "hey"

    const [holderArray, setHolderArray] = useState([]);
    const [account, setAccount] = useState('');
    const [accountBalance, setAccountBalance] = useState('');
    const [userId, setUserId] = useState('');

    const [noOfToken, setNoOfToken] = useState('');
    const [tokenName, setTokenName] = useState('');
    const [tokenStandard, setTokenStandard] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenOwner, setTokenOwner] = useState('');
    const [tokenOwnerBal, setTokenOwnerBal] = useState('');

    const checkConnection = async () => {
        try {
            if (!window.ethereum) {
                console.log('Install Metamask')
            }

            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            setAccount(accounts[0]);

            const web3modal = Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContractERC20(signer);

            const allTokenHolder = await contract.balanceOf(accounts[0]);
            setAccountBalance(allTokenHolder.toNumber());

            const totalHolder = await contract._userId();
            setUserId(totalHolder.toNumber());

        } catch (error) {
            console.log('не подключается к метамаску')
        }
    }

    const ERC20FunToken = async () => {
        try {
            const web3modal = Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
            const contract = fetchContractERC20(signer);

            const supply = await contract.totalSupply();
            const totalSupply = supply.toNumber();
            setNoOfToken(totalSupply);

            const name = await contract.name();
            setTokenName(name);

            const symbol = await contract.symbol();
            setTokenSymbol(symbol);

            const standard = await contract.standard();
            setTokenStandard(standard);

            const ownerOfContract = await contract.ownerOfContract();
            setTokenOwner(ownerOfContract);

            const balanceToken = await contract.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
            setTokenOwnerBal(balanceToken);

        } catch (error) {
            console.log("Косяк с токеном")
        }
    }

    const transferToken = async (address, value) => {
        try {
            const web3modal = Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContractERC20(signer);

            const transfer = await contract.transfer(address, BigInt(value * 1));
            transfer.wait();
            window.location.wait();

        } catch (error) {
            console.log(error);
        }
    }

    const tokenHolderData = async () => {
        try {
            const web3modal = Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContractERC20(signer);

            const allTokenHolder = await contract.getTokenHolder();

            allTokenHolder.map(async (el) => {
                const singleHolderData = await contract.getTokenHolderData(el);
                holderArray.push(singleHolderData);
                console.log(holderArray)
            })
        } catch (error) {
            console.log("косяк в трансфере токена");
        }
    }

    return (
        <ERC20ICOContext.Provider value={{
            funToken,
            checkConnection,
            ERC20FunToken,
            transferToken,
            tokenHolderData,
            account,
            accountBalance,
            userId,
            noOfToken,
            tokenName,
            tokenStandard,
            tokenSymbol,
            tokenOwner,
            tokenOwnerBal,
            holderArray
        }}>
            {children}
        </ERC20ICOContext.Provider>
    );
};