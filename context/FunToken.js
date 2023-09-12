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
            const provider = new
        } catch (error) {
            console.log('App is not connected')
        }
    }


    return (
        <ERC20ICOContext.Provider value={{ funToken }}>
            {children}
        </ERC20ICOContext.Provider>
    );
};