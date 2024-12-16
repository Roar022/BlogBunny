module.exports = ({ env }) => ({
    io: {
      enabled: true,
      config: {
        contentTypes: ['api::article.article'], // Sync for articles
        events: [
          {
            name: 'create-blog',
            handler: ({ strapi }, socket, data) => {
              strapi.log.info(`[io] New blog created: ${JSON.stringify(data)}`);
              socket.broadcast.emit('new-blog', data); // Notify other clients
            },
          },
          {
            name: 'edit-blog',
            handler: ({ strapi }, socket, data) => {
              strapi.log.info(`[io] Blog edited: ${JSON.stringify(data)}`);
              socket.broadcast.emit('edited-blog', data); // Notify other clients
            },
          },
          {
            name: 'changed-blog',
            handler: ({ strapi }, socket, data) => {
              strapi.log.info(`[io] Blog changed: ${JSON.stringify(data)}`);
              socket.broadcast.emit('nchanged-blog', data); // Notify other clients
            },
          },
        ],
      },
    },
  });
  