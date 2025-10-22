package com.example.auth_service.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOServer;
import com.example.auth_service.dto.FileInfo;
import com.example.auth_service.dto.request.ReviewRequest;
import com.example.auth_service.dto.response.ReviewResponse;
import com.example.auth_service.dto.response.UserResponse;
import com.example.auth_service.entity.Review;
import com.example.auth_service.entity.User;
import com.example.auth_service.mapper.ReviewMapper;
import com.example.auth_service.mapper.UserMapper;
import com.example.auth_service.repository.ReviewRepository;
import com.example.auth_service.repository.UserRepository;
import com.example.auth_service.repository.httpclient.FileServiceClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final SocketIOServer socketIOServer;
    private final UserRepository userRepository;
    private final FileServiceClient fileServiceClient;
    private final UserMapper userMapper;
    public ReviewResponse createReview(ReviewRequest req) {
        Review review = Review.builder()
                .tourId(req.getTourId())
                .user(User.builder().id(req.getUserId()).build())
                .content(req.getContent())
                .rating(req.getRating())
                .build();

        reviewRepository.save(review);

        ReviewResponse response = reviewMapper.toResponse(review);

        // ⚡️ Phát realtime đến đúng room mà frontend join
        socketIOServer.getRoomOperations("tour_" + req.getTourId())
                .sendEvent("new_review", response);

        return response;
    }

public List<ReviewResponse> getReviewsByTour(Long tourId) {
    List<Review> reviews = reviewRepository.findByTourIdOrderByCreatedAtDesc(tourId);

    // Duyệt từng review để xử lý avatar
    List<ReviewResponse> responseList = new ArrayList<>();
    for (Review review : reviews) {
        User user = review.getUser();
        UserResponse userResponse = userMapper.toUserResponse(user);
        try {
            FileInfo fileInfo = fileServiceClient.getFileByOwnerId(String.valueOf(user.getId()));
            System.err.println(fileInfo);
            if (fileInfo != null && fileInfo.getUrl() != null) {
                userResponse.setAvatar(fileInfo.getUrl());
            } else {
                userResponse.setAvatar(null);
            }
        } catch (Exception e) {
            userResponse.setAvatar(null);
        }

        ReviewResponse reviewResponse = reviewMapper.toResponse(review);
        reviewResponse.setUser(userResponse);
        responseList.add(reviewResponse);
    }

    return responseList;
}

}
