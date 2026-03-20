const WebSocket = require("ws");
const {handleSendMessage} = require("./socketHandler");

const setupWebsocket =  (server) =>{

    const wss = new WebSocket.Server({server});

    const clients = new Map(); // UserId ws

    wss.on("connection", (ws, req)=>{
        console.log("New client connected")

        ws.on("message", (message) =>{
            
            // handle events
            const data = JSON.parse(message);
            if(data.type == "register"){
                clients.set(data.userId, ws)
            }
            if(data.type == "sendMessage"){
                handleSendMessage(data, clients)
            }
        })

        // close ws
        ws.on("close", () => {
          for (let [userId, socket] of clients.entries()) {
          if (socket === ws) {
            clients.delete(userId);
            break;
           }
         }
         console.log("Client disconnected");
        });
    })
}

module.exports = setupWebsocket;