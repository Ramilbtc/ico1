import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'

import { ERC20ICOContext } from '../context/FunToken'
import Style from '../styles/index.module.css'
import banner from '../assets/home-banner.png'
import funnyToken from '../assets/funtoken.png'
import Transfer from '../components/Transfer/Transfer'
import User from '../components/User/User'

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
        tokenOwnerBal,
        holderArray
    } = useContext(ERC20ICOContext);

    useEffect(() => {
        checkConnection();
        tokenHolderData();
        ERC20FunToken();
        transferToken();
    }, [])

    return (
        <div className={Style.home}>
            <div className={Style.heroSection}>
                <div className={Style.heroSection_left}>
                    <h1>Launching FunToken</h1>

                    <p>Description</p>
                </div>

                <div className={Style.heroSection_left_btn}>
                    <button className={Style.btn}>
                        White papper
                    </button>
                    <button className={Style.btn}>
                        product
                    </button>
                </div>

                <div className={Style.heroSection_right}>
                    <Image src={funnyToken} alt='' width={300} height={300} />
                </div>
            </div>

            <Transfer
                noOfToken={noOfToken}
                tokenName={tokenName}
                tokenStandard={tokenStandard}
                tokenSymbol={tokenSymbol}
                tokenOwner={tokenOwner}
                tokenOwnerBal={tokenOwnerBal}
                transferToken={transferToken}
            />
            <User
                holderArray={holderArray}
            />
        </div >
    )
}

export default Home;