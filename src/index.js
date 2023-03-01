import express from "express"
import routerSocket from "./routes/socket.js"
import { __dirname } from "./path.js"
import {engine} from "express-handlebars"
import * as path from "path"
import { Server } from "socket.io"

const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`
)})

const io = new Server(server)

//Midlewares
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.engine("handlebars", engine())
  app.set("view engine", "handlebars")
  app.set("views", path.resolve(__dirname, "./views"))
//

const mensajes = []
io.on("connection", (socket) => {
  console.log("Clience conectado")
  socket.on("mensaje", info => {
    mensajes.push(info)
    io.emit("mensajesLogs", mensajes)
  })
})

//Routes
  app.use("/", express.static(__dirname + "/public"))
  app.use("/", routerSocket)
//