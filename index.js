import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58'
// Your private key in Base58 format (if in string format)
const privateKeyBase58 = 'XBH8BZLrGAhnk88NESUbVVSJ5XLgWQGRwgdYRyCtgYjT5n1oc82QSTguYQrpgXxsB6maRVPQMFiyWeJ2tHtaFGT'
const privateKeyUint8Array = bs58.decode(privateKeyBase58); 

// Generate Keypair from the private key
const keypair = Keypair.fromSecretKey(privateKeyUint8Array);

// Get the public key
console.log("Public Key:", keypair.publicKey.toBase58());
