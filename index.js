const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const bs58 = require('bs58');
const { Keypair, Connection } = require('@solana/web3.js');
const { SolanaTracker } = require('solana-swap');

// const TARGET_WALLET = "TARGET_WALLET_ADDRESS"; // Replace with the wallet to copy trades from
const GRPC_URL = "https://grpc.ny.shyft.to";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY"; // Replace with your own private key
// Your private key in Base58 format (if in string format)
const privateKeyBase58 = 'XBH8BZLrGAhnk88NESUbVVSJ5XLgWQGRwgdYRyCtgYjT5n1oc82QSTguYQrpgXxsB6maRVPQMFiyWeJ2tHtaFGT'
const privateKeyUint8Array = bs58.decode(privateKeyUint8Array)

// Generate Keypair from the private key
const TARGET_WALLET = Keypair.fromSecretKey(privateKeyBase58)
const packageDefinition = protoLoader.loadSync("shyft.proto", {});
const proto = grpc.loadPackageDefinition(packageDefinition);
const client = new proto.SolanaService(GRPC_URL, grpc.credentials.createSsl());

async function monitorTrades() {
    const request = { address: TARGET_WALLET };
    const stream = client.SubscribeTransactions(request);

    stream.on('data', async (data) => {
        for (const tx of data.transactions) {
            if (tx.type === "swap") {
                const tokenMint = tx.tokenMint;
                const amount = tx.amount;
                const side = tx.direction; // 'buy' or 'sell'

                console.log(`Detected trade: ${side} ${amount} of ${tokenMint}`);

                // if (side === "buy") {
                //     await buyToken(PRIVATE_KEY, tokenMint, amount);
                // } else if (side === "sell") {
                //     await sellToken(PRIVATE_KEY, tokenMint, amount);
                // }
            }
        }
    });

    stream.on('error', (error) => {
        console.error("Error in gRPC stream:", error);
    });
}

monitorTrades(); 
