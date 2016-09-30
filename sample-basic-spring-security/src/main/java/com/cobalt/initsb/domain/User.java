package com.cobalt.initsb.domain;

public class User {
	private final String name;
	private String password;
	
	public User(String name, String password) {
		this.name = name;
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}
	
	
	
	
}
