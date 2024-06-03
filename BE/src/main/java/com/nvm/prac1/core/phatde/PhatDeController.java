package com.nvm.prac1.core.phatde;


import com.nvm.prac1.entity.PhatDe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class PhatDeController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/phatde")
    @SendTo("/notification/p308")
    public PhatDe PhatDeNotification(@Payload PhatDe phatDe){
        return phatDe;
    }

    @MessageMapping("/phatde1")
    public void PhatDeNotification1(@Payload PhatDe phatDe){
        messagingTemplate.convertAndSend("/notification/p309",phatDe);
    }
}
