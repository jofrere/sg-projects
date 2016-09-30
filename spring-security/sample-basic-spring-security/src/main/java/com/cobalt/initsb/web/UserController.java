package com.cobalt.initsb.web;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cobalt.initsb.domain.User;

@RestController
@RequestMapping("/hello")
public class UserController {
	
	@RequestMapping("")
	@Secured("ROLE_ADMIN")
	public User hello(@RequestParam(value="name") String name) {
		return new User(name, "mypassword");
	}
}
