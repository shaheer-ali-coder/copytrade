const { Client } = require("@shyft-to/solana-grpc");

// Shyft gRPC Credentials
const GRPC_URL = "https://grpc.ny.shyft.to";
const X_TOKEN = "36e2e19a-83fd-41d5-b883-cd248454b0b6";
const TARGET_WALLET = "8nXhCbajhPi5QvgKdp7yLSiUjvKGBJ8E87xYZLsD7y3D";

// Initialize Shyft gRPC client
const client = new Client(GRPC_URL, X_TOKEN, undefined);

async function subscribeToTransactions() {
  try {
    console.log("Subscribing to transactions for wallet:", TARGET_WALLET);
    
    const stream = await client.subscribeToTransactions({
      account: TARGET_WALLET,
      commitment: "confirmed", // You can change to "finalized" if needed
    });

    stream.on("data", (txn) => {
      console.log("New transaction detected:", txn);
      // Implement sniping logic here (e.g., buying/selling logic based on txn details)
    });

    stream.on("error", (err) => {
      console.error("Stream error:", err);
    });
  } catch (error) {
    console.error("Error subscribing to transactions:", error);
  }
}

subscribeToTransactions();
