import React, { useState, useContext } from 'react'
import Image from 'next/image'

import Style from './NavBar.module.css'
import { ERC20ICOContext } from '../../context/FunToken'
import loader from '../../assets/loder.gif'
import funToken from "../../assets/funtoken.png"

const NavBar = () => {
    const { account, accountBalance, userId } = useContext(ERC20ICOContext)
    return (
        <div className={Style.NavBar}>
            <div className={Style.navBar_box}>
                <div className={Style.navBar_box_left}>
                    <h1>
                        Fun TOken
                    </h1>
                </div>

                <div className={Style.navBar_box_right}>
                    <p>
                        Token Balance <span>{accountBalance}</span>
                    </p>
                    <p>
                        <span>
                            {userId} {""} {account}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NavBar