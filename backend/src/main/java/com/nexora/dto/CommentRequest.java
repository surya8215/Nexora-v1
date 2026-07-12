package com.nexora.dto;

import jakarta.validation.constraints.NotBlank;

public class CommentRequest {

    @NotBlank(message = "Comment text cannot be blank")
    private String text;

    public CommentRequest() {
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}
