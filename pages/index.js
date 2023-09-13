import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'

import { ERC20ICOContext } from '../context/FunToken'
import Style from '../styles/index.module.css'

const Home = () => {
    const {
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
        tokenOwnerBal
    } = useContext(ERC20ICOContext);

    useEffect(() => {
        checkConnection();
        tokenHolderData();
        ERC20FunToken();
        transferToken();
    }, [])

    return (
        <div>HOME</div>
    )
}

export default Home;