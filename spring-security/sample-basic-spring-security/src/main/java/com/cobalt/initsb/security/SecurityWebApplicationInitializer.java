package com.cobalt.initsb.security;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

import com.cobalt.initsb.config.WebSecurityConfig;

public class SecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer {

	public SecurityWebApplicationInitializer() {
		super(WebSecurityConfig.class);
	}
	
	

}
