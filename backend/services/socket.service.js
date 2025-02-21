module.exports = (httpServer)=>{
    const io = require('socket.io')(httpServer);
    io.on('connection', (socket) => {

        console.log('user is connected',socket.id);
    
        socket.on('chat_message', (msg) => {
            console.log('Message: ' + msg);
            io.to(socket.id).emit('receive_ride','hcfhvbh')
        });
        socket.on('SEARCH_CAPTAIN',(data)=>{
            console.log(data);
        })
    
        socket.on('disconnect', () => {
            console.log('User  disconnected');
        });
    });
}