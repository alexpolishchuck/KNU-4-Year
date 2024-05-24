import React from 'react'
import {ethers} from 'ethers'

export function createWallet()
{
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase
    const wallet = ethers.Wallet.fromPhrase(mnemonic).address

    return {mnemonic: mnemonic, wallet: wallet}
}