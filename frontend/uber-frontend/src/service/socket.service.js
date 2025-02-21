import { io } from "socket.io-client";

let socket;

export const SocketService = () => {
    // If the socket is already initialized, don't initialize it again
    if (!socket) {
        try {
            socket = io(import.meta.env.VITE_BASE_URL, {
                reconnectionDelayMax: 10000, 
                transports: ["websocket"], 
            });
            socket.on("connect", () => {
                console.log("Socket connected:", socket.id);
            });
            socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });
        } catch (err) {
            console.error("Error while connecting to the socket:", err);
        }
    }
    return socket;
};

export const getSocketInstance = () => {
    if (!socket) {
        console.error("Socket instance not initialized.");
        return null;
    }
    return socket;
};
