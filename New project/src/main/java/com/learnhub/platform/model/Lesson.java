package com.learnhub.platform.model;

public record Lesson(
        String id,
        String title,
        int minutes,
        String videoUrl
) {
}
