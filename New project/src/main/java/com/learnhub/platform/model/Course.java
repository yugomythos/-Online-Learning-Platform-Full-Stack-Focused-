package com.learnhub.platform.model;

import java.util.List;

public record Course(
        String id,
        String title,
        String description,
        String category,
        String level,
        String instructor,
        int durationMinutes,
        boolean featured,
        List<Lesson> lessons
) {
}
