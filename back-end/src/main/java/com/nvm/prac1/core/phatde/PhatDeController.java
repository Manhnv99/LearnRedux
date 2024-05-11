package com.nvm.prac1.core.phatde;


import com.nvm.prac1.entity.PhatDe;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class PhatDeController {

    @MessageMapping("/phatde")
    @SendTo("/notification/p308")
    public PhatDe PhatDeNotification(@Payload PhatDe phatDe){
        return phatDe;
    }
}
