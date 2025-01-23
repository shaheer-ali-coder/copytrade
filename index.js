import { Client, CommitmentLevel } from "@triton-one/yellowstone-grpc";

const GRPC_URL = "https://grpc.ny.shyft.to";
const X_TOKEN = "36e2e19a-83fd-41d5-b883-cd248454b0b6";
const TARGET_WALLET = "8nXhCbajhPi5QvgKdp7yLSiUjvKGBJ8E87xYZLsD7y3D";

const client = new Client(GRPC_URL, X_TOKEN, undefined);

async function subscribeToTransactions() {
    try {
        console.log(`Listening for transactions involving: ${TARGET_WALLET}`);

        const subscription = await client.transactionSubscribe({
            commitment: CommitmentLevel.Confirmed,
            filter: {
                accountInclude: [TARGET_WALLET]
            }
        });

        subscription.on("data", (txn) => {
            console.log("New transaction detected:", txn);
        });

        subscription.on("error", (error) => {
            console.error("Subscription error:", error);
        });
    } catch (error) {
        console.error("Error subscribing to transactions:", error);
    }
}

subscribeToTransactions();
