import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
import Message from "../models/messagescheme.js";


// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {

    const { message } = req.body;

    const sender = req.user._id;
    const receiver = new mongoose.Types.ObjectId(req.params.id);

    // find conversation
    let chats = await Conversation.findOne({
      members: { $all: [sender, receiver] }
    });

    // create conversation if not exists
    if (!chats) {
      chats = await Conversation.create({
        members: [sender, receiver]
      });
    }

    // create new message
    const newMessage = new Message({
      sender,
      receiver,
      conversationId: chats._id,
      message
    });

    console.log(newMessage);

    // push message id into conversation
    if (newMessage) {
      chats.messages.push(newMessage._id);
    }

    await Promise.all([
      newMessage.save(),
      chats.save()
    ]);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
};



// GET MESSAGES
export const getMessages = async (req, res) => {
  try {

    const sender = req.user._id;
    const receiver = new mongoose.Types.ObjectId(req.params.id);

    const chats = await Conversation.findOne({
      members: { $all: [sender, receiver] }
    }).populate("messages");

    if (!chats) {
      return res.status(200).json({
        success: false,
        message: "No conversation found"
      });
    }

    res.status(200).json({
      success: true,
      messages: chats.messages
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get messages"
    });
  }
};