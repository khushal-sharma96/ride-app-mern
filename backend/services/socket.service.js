const rideModel = require('../models/ride.model');

module.exports = (httpServer) => {
    const io = require('socket.io')(httpServer);
    io.on('connection', (socket) => {

        console.log('user is connected', socket.id);
        socket.on('SEARCH_CAPTAIN', async (rideId) => {
            const UserModel = require('../models/user.model');
            const rideData = await rideModel.findById(rideId).select('-otp').populate('userId','fullname image email');
            const ids = await UserModel.find({ userType: 2 }).select('socketId');
            const socketIds = ids.map(row => row.socketId);
            io.to(socketIds).emit("receive_ride", rideData);
        })
        socket.on('ACCEPT_RIDE',async(ride)=>{
            const  actualRide = await rideModel.findById(ride._id).populate('captainId','fullname image vehicleNumber').populate('userId','socketId');
            if(actualRide){
                socket.to(actualRide?.userId?.socketId).emit("RIDE_ACCEPTED",actualRide)
            }
        })
        socket.on("RIDE_STARTED",async(ride_id)=>{
            const  actualRide = await rideModel.findById(ride_id).populate('userId');
            if(actualRide){
                socket.to(actualRide.userId.socketId).emit("RIDE_STARTED",actualRide)
            }
        })
        socket.on("PAY_CASH",async(data)=>{
            const actualRide = await rideModel.findById(data.rideId).populate('userId').populate('captainId');
            if(actualRide && actualRide?.status=='started'){
                socket.to(actualRide.captainId.socketId).emit("PAY_CASH",{socketId:actualRide.userId.socketId})
            }
        })
        socket.on("RIDE_COMPLETED",async(rideId)=>{
            const actualRide = await rideModel.findById(rideId).populate('userId');
            if(actualRide && actualRide?.status=='completed'){
                socket.to(actualRide.userId.socketId).emit("RIDE_COMPLETED")
            }
        })

        socket.on('disconnect', () => {
            console.log('User  disconnected');
        });
    });
}