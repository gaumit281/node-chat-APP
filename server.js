const express = require("express");
const { connected } = require("process");
const app = express();


const port = process.env.POrt || 3000
const http = require('http').createServer(app);
const io = require("socket.io")(http);


//static path
app.use(express.static(__dirname + "/public"));


//router
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html")
})


//Socket io setup
io.on("connection", (socket) => {
   console.log("connected");
   socket.on('message', (msg) => {
       socket.broadcast.emit('message',msg)
   })
})



http.listen(port, () => {
    console.log(`server is running ${port}`)
})