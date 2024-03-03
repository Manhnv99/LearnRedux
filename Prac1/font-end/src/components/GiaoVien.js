import {Button} from "antd";
import {connectWebSocket, getStompClient, receiveAction, sendNotification} from "../apis/WebsocketConfig";
import {useEffect, useState} from "react";


const GiaoVien = () => {

    useEffect(() => {
        connectWebSocket();
        const stompClient = getStompClient();
        stompClient.connect(
            {},
            (frame)=>{
                console.log(frame);
                stompClient.subscribe("/notification/p308",receiveAction);
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
        sendNotification(phatDe);
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