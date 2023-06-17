import mongoose from "mongoose";

export default async function connectToDB() {
  await mongoose.connect(
    "mongodb://chat_user:chat_123@localhost:27017/chat_backend"
  );
}
