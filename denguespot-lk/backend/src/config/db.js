import mongoose from 'mongoose';
import dns from 'node:dns';

// Resolve SRV records using Google and Cloudflare DNS to bypass local/campus DNS restrictions
dns.setServers(['8.8.8.8', '1.1.1.1']);

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not configured. Add it to backend/.env.');
  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}
