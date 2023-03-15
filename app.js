// menggunakan dependencies/module
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
// create server
const app = express()
const server = http.createServer(app)
const io = new Server(server)
// menggunakan midleware http - set folder public as root 
app.use(express.static("public"))
// menggunakan socket io
io.on("connection", (socket) => {
    socket.on("chat", message => {
        io.emit("chatToClient", {id: socket.id, message})
    })
    socket.on("disconnect", () => console.log("Disconnected from server."))
    console.log("Connected on port 3000")
})
// inisialisasi port server
server.listen(3000)