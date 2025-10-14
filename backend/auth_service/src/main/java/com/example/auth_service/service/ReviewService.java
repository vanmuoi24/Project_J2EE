package com.example.auth_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOServer;
import com.example.auth_service.dto.request.ReviewRequest;
import com.example.auth_service.dto.response.ReviewResponse;
import com.example.auth_service.entity.Review;
import com.example.auth_service.entity.User;
import com.example.auth_service.mapper.ReviewMapper;
import com.example.auth_service.repository.ReviewRepository;
import com.example.auth_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final SocketIOServer socketIOServer;
    private final UserRepository userRepository;

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
        return reviewMapper.toResponseList(reviews);
    }
}
