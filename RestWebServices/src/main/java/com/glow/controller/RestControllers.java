package com.glow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class RestControllers {
	
	@Autowired
	private UserDatabase userDatabase;
	
	
	// Getting fake post from an api(JSON Placeholder)
	
	@GetMapping("/getPosts")
	public void getPosts() {
		String url = "https://jsonplaceholder.typicode.com/posts";
		
		RestTemplate template = new RestTemplate();
		
		Object[] users = template.getForObject(url, Object[].class, Void.class);
		
		for ( Object user : users ) {
			System.out.println(user);
		}
	    
	    
	}
	
	
	
	
// 
//	@GetMapping("/user/create-account/{id}/{name}")
//	public void createAccount(@PathVariable("id") int id, @PathVariable("name") String  name ) {
//		
//		User user = new User(id,name);
//		userDatabase.save(user);
//		
//	}
//	
//	@GetMapping("/getUsers")
//	public List<User> getAllUsers() {
//		System.out.println(userDatabase.findall());
//		return userDatabase.findall();
//		
//	}
//	
//	
//	@GetMapping("/findUser")
//	public User findUser() {
//		return userDatabase.find(3);
//	
//		
//	}
	
	
	
}
