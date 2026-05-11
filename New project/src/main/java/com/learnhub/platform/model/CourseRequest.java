package com.learnhub.platform.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CourseRequest(
        @NotBlank String title,
        @NotBlank String description,
        @NotBlank String category,
        @NotBlank String level,
        @NotBlank String instructor,
        @Min(15) int durationMinutes
) {
}
