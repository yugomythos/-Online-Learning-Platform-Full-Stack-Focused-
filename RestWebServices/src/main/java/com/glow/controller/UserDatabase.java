package com.glow.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import jakarta.annotation.PostConstruct;



@Repository
public class UserDatabase {
	
   private Map<Integer,User> users = new HashMap<Integer, User>();
   
 
//  @PostConstruct
//  public void setup() {
//	  
//	   User user1 = new User(1,"Sachin");
//	   users.put(1, user1);
//	   
//	   User user2= new User(2,"Bhim");
//	   users.put(2, user2);
//	   
//  }
//  
//  
//  public void save(User user) {
//	  users.put(user.getId(), user);
//  }
//	  
//  public ArrayList<User> findall(){
//	  return new ArrayList<User> (users.values());
//  }
//  
//  public User find(int id) {
//	  return users.get(id);
//  }
 
   
}
