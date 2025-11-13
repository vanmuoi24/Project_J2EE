package com.example.auth_service.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponse {
  private Long id;
  private Long tourId;
  private UserResponse user;
  private String content;
  private Integer rating;
  private String createdAt; 
}
