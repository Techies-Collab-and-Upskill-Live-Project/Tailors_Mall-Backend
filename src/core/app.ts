import express, { NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { routes } from "./routes";
import { handleApplicationErrors, notFound } from "./response";
import passport from 'passport';
import session from 'express-session';
import ClientRoute from "../files/user/clients/client.routes";
import DesignerRoute from "../files/user/designer/designer.routes";
import passportConfig from "../utils/passportConfig";
import designer from "../files/user/designer/designer.model";
import client from "../files/user/clients/client.model";
import http from 'http'; // Import http module
import { Server as SocketIOServer } from "socket.io";
// import swaggerJsDocs from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import swaggerJSON from "../openapi.json"

export const app = express();

// Create the HTTP server and integrate with Socket.io
const server = http.createServer(app);
const io = new SocketIOServer(server);

export const application = async () => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(helmet())
  app.use(compression())
  app.use(cors())
  app.use(express.static("public"))
  app.use("/images", express.static("images"))

  // const docs = swaggerJsDocs(swaggerJSON)

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON))

  app.set('view engine','ejs');

  // Route for Client Authentication
  app.use('/auth/client', ClientRoute);

  // Route for Designer Authentication
  app.use('/auth/designer', DesignerRoute);

  app.use(
    session({ 
      secret: 'I am Batman', 
      resave: false, 
      saveUninitialized: true 
    })
  );

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/home", (req, res) => {
    res.status(200).json({ message: "App working fine. Welcome" })
  })

  app.get("/", (req, res) => {
    res.render("login");
  })

  app.get("/log", (req,res)=>{
    res.render('index',{userinfo:req.user})
  })

  routes(app)
  app.use(handleApplicationErrors) //application errors handler
  app.use(notFound) //not found route

  // Socket.io setup
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join private chat
    socket.on('join_private_chat', ({ userId1, userId2 }) => {
      const roomName = [userId1, userId2].sort().join('-');
      socket.join(roomName);
    });

    // Private messaging
    socket.on('private_message', ({ userId1, userId2, message }) => {
      const roomName = [userId1, userId2].sort().join('-');
      io.to(roomName).emit('private_message', { userId: userId1, message });
    });

    // Join community
    socket.on('join_community', (communityId) => {
      socket.join(`community_${communityId}`);
      io.to(`community_${communityId}`).emit('user_joined', socket.id);
    });

    // Community messaging
    socket.on('community_message', ({ communityId, userId, message }) => {
      io.to(`community_${communityId}`).emit('community_message', { userId, message });
    });

    // Leave community
    socket.on('leave_community', (communityId) => {
      socket.leave(`community_${communityId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}