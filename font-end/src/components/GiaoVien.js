import {Button} from "antd";
import {connectWebSocket, getStompClient, sendNotification, sendNotification1} from "../apis/WebsocketConfig";
import {useEffect} from "react";


const GiaoVien = () => {

    useEffect(() => {
        connectWebSocket();
        const stompClient = getStompClient();
        stompClient.connect(
            {},
            (frame)=>{
                console.log(frame);
                stompClient.subscribe("/notification/p309",receiveAction);
            },
            (error) => {
                console.log(error);
            }
        );
    },[]);

    const receiveAction = (action) => {
        console.log(action)
    }

    const handlePhatDeThi = () => {
        const phatDe ={
            action:"PHAT_DE"
        }
        sendNotification1(phatDe);
    }

    return(
        <>
            <Button onClick={handlePhatDeThi}>
                Phát đề thi
            </Button>
        </>
    )
}

export default GiaoVien