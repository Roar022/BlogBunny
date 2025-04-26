export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: { // cors setup
        origin: "http://localhost:3000",// frontend url
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection",function(socket){
      socket.on("create-blog",(valued)=>{
        console.log("object");
        io.sockets.emit("new-blog",valued)
      })
      socket.on("edit-blog",(value)=>{
        io.sockets.emit("edited-blog",value)
      })
      socket.on("changed-blog",(val)=>{
        io.sockets.emit("nchanged-blog",val)
      })
    })
  },
};