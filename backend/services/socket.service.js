module.exports = (httpServer)=>{
    const io = require('socket.io')(httpServer);
    io.on('connection', (socket) => {

        console.log('user is connected',socket.id);
    
        socket.on('chat message', (msg) => {
            console.log('Message: ' + msg);
            io.to(socket.id).emit('chat message','hcfhvbh')
        });
    
        socket.on('disconnect', () => {
            console.log('User  disconnected');
        });
    });
}