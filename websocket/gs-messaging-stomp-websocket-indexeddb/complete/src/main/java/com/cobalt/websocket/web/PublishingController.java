package com.cobalt.websocket.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cobalt.websocket.domain.Greeting;
import com.cobalt.websocket.domain.HelloMessage;
import com.cobalt.websocket.service.Publisher;

@RestController
public class PublishingController {

	@Autowired
	Publisher publisher;

	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000); // simulated delay
		return new Greeting("Hello, " + message.getName() + "!");
	}

	@RequestMapping(value = "/sendMessage", method = { RequestMethod.GET })
	public void publish() throws Exception {
		for (int i = 0; i < 10; i++) {
			Thread.sleep(3000); // simulated delay
			this.publisher.publish();
		}
	}

}
