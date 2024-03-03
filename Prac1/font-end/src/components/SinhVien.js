import {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import {connectWebSocket, getStompClient} from "../apis/WebsocketConfig";

const SinhVien = () =>{

    const [openModal,setOpenModal] = useState(false);

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

    const receiveAction = (message) => {
        if(JSON.parse(message.body).action === "PHAT_DE"){
            setOpenModal(true);
        }
    }

    return(
        <>
            <Button onClick={()=>{setOpenModal(true)}}>
                Mở đề thi
            </Button>
            <Modal title="Đề thi" open={openModal} onOk={()=>{setOpenModal(false)}} onCancel={()=>{setOpenModal(false)}}>
                <span>Đây là đề thi</span>
            </Modal>
        </>
    )
}

export default SinhVien