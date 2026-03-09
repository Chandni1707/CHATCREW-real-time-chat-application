import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
{
    receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
    message: {
    type: String,
    required: true,
  }
},
{ timestamps: true }
);
 const Message = mongoose.model("Message", messageSchema);


export default Message;