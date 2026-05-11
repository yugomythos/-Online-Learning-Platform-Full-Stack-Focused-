package com.glow.controller;




public class User {
	
  
	 public User(int id, int userId, String title, String body) {
		   this.id = id;
		   this.userId = userId;
		   this.title = title;
		   this.body = body;
	   }

   private int id;
 
   private int userId;
    
   private String title;
   
   private String body;
   
   public int getUserId() {
		return userId;
	}

	public String getTitle() {
		return title;
	}

	public String getBody() {
		return body;
	}
   
   
  

   public int getId() {
	return id;
   }

 
   
   
   
}
