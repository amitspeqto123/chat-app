const { getChats , getMessage} = require("../services/chat.service");


const chatList = async (req, res) =>{
    const userId = req.user.id;
    try{
       const chatlist = await getChats(userId);
       res.status(200).json({
        message: "Chat list fetched successfully",
        data: chatlist
       })
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

const messageList = async (req, res) =>{
    const conversationId = req.params.conversationId;
    try{
        const messages = await getMessage(conversationId);
        res.status(200).json({
            message: "Messages fetched successfully",
            data: messages
        })
    }catch(error){
       console.log(error)
       res.status(500).json({message: error.message})
    
    }
}

module.exports = {chatList, messageList}