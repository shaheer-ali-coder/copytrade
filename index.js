require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load environment variables
const { GRPC_ENDPOINT, X_TOKEN, WALLET_ADDRESS } = process.env;

// Load the protobuf
const PROTO_PATH = path.resolve(__dirname, 'proto/solana.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const solanaProto = grpc.loadPackageDefinition(packageDefinition).solana.rpc;

// Create a new client instance
const client = new solanaProto.Solana(
  GRPC_ENDPOINT,
  grpc.credentials.createSsl()
);

// Set up metadata with x-token
const metadata = new grpc.Metadata();
metadata.add('x-token', X_TOKEN);

// Create the subscription request
const request = {
  transactions: {
    vote: false,
    failed: false,
    account_include: [WALLET_ADDRESS],
  },
  commitment: 'CONFIRMED',
};

// Subscribe to the stream
const call = client.Subscribe(request, metadata);

call.on('data', (response) => {
  console.log('Transaction update:', response);
});

call.on('error', (error) => {
  console.error('Error in gRPC stream:', error);
});

call.on('end', () => {
  console.log('Stream ended');
});
