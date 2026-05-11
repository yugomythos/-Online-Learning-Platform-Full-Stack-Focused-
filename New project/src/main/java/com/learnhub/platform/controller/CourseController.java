package com.learnhub.platform.controller;

import com.learnhub.platform.model.Course;
import com.learnhub.platform.model.CourseRequest;
import com.learnhub.platform.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> allCourses() {
        return courseService.findAll();
    }

    @GetMapping("/featured")
    public List<Course> featuredCourses() {
        return courseService.findFeatured();
    }

    @GetMapping("/{id}")
    public Course courseDetails(@PathVariable String id) {
        return courseService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@Valid @RequestBody CourseRequest request) {
        return courseService.addCourse(request);
    }
}
