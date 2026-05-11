# Online Learning Platform

A mini full-stack learning platform built with Java, Spring MVC, HTML, CSS, and JavaScript.

## Features

- Featured courses on the homepage
- Searchable course listing with category filters
- Course detail pages with lesson lists and video placeholders
- Enrollments saved in `localStorage`
- My Courses dashboard with progress tracking
- Lesson completion simulation with checkboxes
- Mock login/signup state
- Certificate generation after completing a course
- Admin screen for adding local draft courses
- Responsive layout for mobile and desktop

## Run

This project uses Java 17 and Maven.

```powershell
mvn spring-boot:run
```

Then open:

```text
http://localhost:8080
```

## Project Structure

```text
src/main/java/com/learnhub/platform
  OnlineLearningPlatformApplication.java
  controller/
  model/
  service/
src/main/resources/static
  index.html
  css/styles.css
  js/app.js
```
