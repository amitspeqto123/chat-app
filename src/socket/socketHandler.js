const Conversation = require('../models/conversation.model');
const Message = require("../models/message.model");


const handleSendMessage = async (data, clients) =>{
    const {senderId, receiverId, text, image} = data;
    if(!text && !image) return
    // find conversation
    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
    });

    // if not found conversation then create
    if(!conversation){
        conversation = new Conversation({
            participants: [senderId, receiverId]
        })
    }

    // create a message 
    const message = await Message.create({
        conversationId: conversation._id,
        senderId,
        type: image ? "image" : "text",
        text: text || "",
        image: image || null
    })
    
    // update conversation
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    // send message to receiver
    const receiverWs = clients.get(receiverId);
     if (receiverWs) {
    receiverWs.send(JSON.stringify({
        type: "newMessage",
        data: {
            text: message.text,
            image: message.image,
            senderId: message.senderId
        }
    }));
   } else {
      console.log("Receiver not connected:", receiverId);
    }
} 

module.exports = {handleSendMessage}; 