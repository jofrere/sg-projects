package com.cobalt.websocket.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.cobalt.websocket.domain.Greeting;

@Service
public class MessagePublisher implements Publisher  {
	@Autowired
	private SimpMessagingTemplate template;

	/**
	 * publishes a message to tge web client via sockjs containing the current date time
	 * @throws Exception
	 */
	public void publish() throws Exception {
		this.template.convertAndSend("/topic/greetings",
				new Greeting("Hi Team, this is a message from server. It is currently: " + LocalDateTime.now()));
	}

}
