import SockJS from "sockjs-client/dist/sockjs"
import Stomp from "stompjs"

let stompClient = null;

export const connectWebSocket = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
}

export const getStompClient = () => {
    return stompClient;
};

export const sendNotification = (message) => {
    stompClient.send("/app/phatde",{}, JSON.stringify(message));
}

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
};

