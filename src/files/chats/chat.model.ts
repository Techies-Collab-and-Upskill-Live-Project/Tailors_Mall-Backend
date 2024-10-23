import mongoose, { model, Schema } from "mongoose";

// Chat Schema for private messages
const ChatSchema = new Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    timestamp: { type: Date, default: Date.now },
  }]
});

const Chat = model('Chat', ChatSchema);

// Community Schema
const CommunitySchema = new Schema({
  name: String,
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    timestamp: { type: Date, default: Date.now },
  }]
});

const Community = model('Community', CommunitySchema);
