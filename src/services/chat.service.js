const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");


const getChats = async (userId) =>{
    const conversations = await Conversation.find({participants: userId}).sort({lastMessageAt: -1})
    .populate('participants', 'name image').populate('lastMessage');
    return conversations.map(conv => {
    const otherUser = conv.participants.find(
      p => p._id.toString() !== userId.toString()
    );

    return {
      conversationId: conv._id,
      user: otherUser,
      lastMessage: conv.lastMessage,
      lastMessageAt: conv.lastMessageAt
    };
  });
}

const getMessage = async (conversationId) =>{
    const conversation = await Conversation.findById(conversationId);
    if(!conversation){
        throw new Error("Conversation not found");
    }
    const messages = await Message.find({conversationId: conversation._id}).sort({createdAt: -1});
    return messages;
}

module.exports = {getChats, getMessage}
