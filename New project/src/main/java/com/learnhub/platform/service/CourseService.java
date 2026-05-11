package com.learnhub.platform.service;

import com.learnhub.platform.model.Course;
import com.learnhub.platform.model.CourseRequest;
import com.learnhub.platform.model.Lesson;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class CourseService {
    private final CopyOnWriteArrayList<Course> courses = new CopyOnWriteArrayList<>(seedCourses());

    public List<Course> findAll() {
        return courses.stream()
                .sorted(Comparator.comparing(Course::title))
                .toList();
    }

    public List<Course> findFeatured() {
        return courses.stream()
                .filter(Course::featured)
                .sorted(Comparator.comparing(Course::title))
                .toList();
    }

    public Optional<Course> findById(String id) {
        return courses.stream()
                .filter(course -> course.id().equalsIgnoreCase(id))
                .findFirst();
    }

    public Course addCourse(CourseRequest request) {
        String id = slugify(request.title());
        int suffix = 2;
        String candidate = id;
        while (findById(candidate).isPresent()) {
            candidate = id + "-" + suffix;
            suffix++;
        }

        Course course = new Course(
                candidate,
                request.title(),
                request.description(),
                request.category(),
                request.level(),
                request.instructor(),
                request.durationMinutes(),
                false,
                List.of(
                        new Lesson(candidate + "-intro", "Course overview", 12, "https://www.youtube.com/embed/dQw4w9WgXcQ"),
                        new Lesson(candidate + "-practice", "Guided practice", Math.max(18, request.durationMinutes() / 2), "https://www.youtube.com/embed/dQw4w9WgXcQ"),
                        new Lesson(candidate + "-project", "Mini project", Math.max(20, request.durationMinutes() / 3), "https://www.youtube.com/embed/dQw4w9WgXcQ")
                )
        );
        courses.add(course);
        return course;
    }

    private static String slugify(String value) {
        String normalized = Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
        return normalized.isBlank() ? "course" : normalized;
    }

    private static List<Course> seedCourses() {
        List<Course> data = new ArrayList<>();
        data.add(new Course(
                "spring-mvc-foundations",
                "Spring MVC Foundations",
                "Build controller-based Java web apps, expose REST endpoints, and organize a clean service layer.",
                "Backend",
                "Beginner",
                "Aarav Menon",
                180,
                true,
                List.of(
                        new Lesson("mvc-1", "Request flow and controllers", 32, "https://www.youtube.com/embed/31KTdfRH6nY"),
                        new Lesson("mvc-2", "Models, services, and validation", 44, "https://www.youtube.com/embed/31KTdfRH6nY"),
                        new Lesson("mvc-3", "Building REST APIs", 52, "https://www.youtube.com/embed/31KTdfRH6nY"),
                        new Lesson("mvc-4", "Final MVC project", 52, "https://www.youtube.com/embed/31KTdfRH6nY")
                )
        ));
        data.add(new Course(
                "javascript-interactivity",
                "JavaScript Interactivity",
                "Create dynamic browser experiences with DOM rendering, events, forms, and local persistence.",
                "Frontend",
                "Beginner",
                "Maya Rao",
                150,
                true,
                List.of(
                        new Lesson("js-1", "DOM rendering basics", 28, "https://www.youtube.com/embed/W6NZfCO5SIk"),
                        new Lesson("js-2", "Events and state", 36, "https://www.youtube.com/embed/W6NZfCO5SIk"),
                        new Lesson("js-3", "LocalStorage patterns", 40, "https://www.youtube.com/embed/W6NZfCO5SIk"),
                        new Lesson("js-4", "Interactive dashboard build", 46, "https://www.youtube.com/embed/W6NZfCO5SIk")
                )
        ));
        data.add(new Course(
                "mysql-data-design",
                "MySQL Data Design",
                "Model relational data, write practical SQL queries, and plan persistence for learning apps.",
                "Database",
                "Intermediate",
                "Neha Kapoor",
                210,
                false,
                List.of(
                        new Lesson("sql-1", "Tables and relationships", 42, "https://www.youtube.com/embed/7S_tz1z_5bA"),
                        new Lesson("sql-2", "Queries for dashboards", 50, "https://www.youtube.com/embed/7S_tz1z_5bA"),
                        new Lesson("sql-3", "JDBC integration plan", 56, "https://www.youtube.com/embed/7S_tz1z_5bA"),
                        new Lesson("sql-4", "Schema review", 62, "https://www.youtube.com/embed/7S_tz1z_5bA")
                )
        ));
        data.add(new Course(
                "responsive-ui-systems",
                "Responsive UI Systems",
                "Design course cards, dashboards, and detail views that stay clear on phone, tablet, and desktop.",
                "Design",
                "Intermediate",
                "Leah Fernandes",
                165,
                true,
                List.of(
                        new Lesson("ui-1", "Layout fundamentals", 30, "https://www.youtube.com/embed/srvUrASNj0s"),
                        new Lesson("ui-2", "Responsive grids", 42, "https://www.youtube.com/embed/srvUrASNj0s"),
                        new Lesson("ui-3", "Accessible controls", 38, "https://www.youtube.com/embed/srvUrASNj0s"),
                        new Lesson("ui-4", "Polished dashboard states", 55, "https://www.youtube.com/embed/srvUrASNj0s")
                )
        ));
        data.add(new Course(
                "full-stack-capstone",
                "Full Stack Capstone",
                "Combine MVC APIs, browser state, progress tracking, and admin workflows into one project.",
                "Full Stack",
                "Advanced",
                "Rohan Shah",
                240,
                false,
                List.of(
                        new Lesson("cap-1", "App architecture", 45, "https://www.youtube.com/embed/zJSY8tbf_ys"),
                        new Lesson("cap-2", "Enrollment flows", 55, "https://www.youtube.com/embed/zJSY8tbf_ys"),
                        new Lesson("cap-3", "Progress and certificates", 60, "https://www.youtube.com/embed/zJSY8tbf_ys"),
                        new Lesson("cap-4", "Deployment checklist", 80, "https://www.youtube.com/embed/zJSY8tbf_ys")
                )
        ));
        return data;
    }
}
