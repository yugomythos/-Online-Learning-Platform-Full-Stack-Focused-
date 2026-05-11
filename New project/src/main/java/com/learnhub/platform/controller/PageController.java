package com.learnhub.platform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping({"/", "/courses", "/courses/{id}", "/my-courses", "/admin"})
    public String app() {
        return "forward:/index.html";
    }
}
