package com.example.auth_service.service;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.control.MappingControl;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.auth_service.dto.request.UserCreationRequest;
import com.example.auth_service.dto.request.UserUpdate;
import com.example.auth_service.dto.response.FileResponse;
import com.example.auth_service.dto.response.PageResponse;
import com.example.auth_service.dto.response.UserResponse;
import com.example.auth_service.entity.User;
import com.example.auth_service.exception.AppException;
import com.example.auth_service.exception.ErrorCode;
import com.example.auth_service.mapper.UserMapper;
import com.example.auth_service.repository.UserRepository;
import com.example.auth_service.repository.httpclient.FileServiceClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final FileServiceClient fileServiceClient;

    public UserResponse createUser(UserCreationRequest request) {

        System.out.println("uerservice check check");
        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new AppException(ErrorCode.User_name);
        }

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword())); 

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        return userMapper.toUserResponse(user);
    }

    public List<UserResponse> getAllUser() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toUserResponse)
                .orElseThrow(() -> new AppException(ErrorCode.User_name));

    }

    public UserResponse updateUser(Long id, UserUpdate req) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        FileResponse fileResponse = fileServiceClient.uploadFile(req.getFile());
        if (fileResponse != null && fileResponse.getUrl() != null) {
            user.setAvatar(fileResponse.getUrl());
        } else {
            log.warn("Upload file thất bại hoặc trả về null!");
        }

        userMapper.updateUserFromRequest(req, user);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    public FileResponse uploadAvatar(String userId, MultipartFile file) throws IOException {
        // 1️⃣ Gọi qua Feign client
        FileResponse fileResponse = fileServiceClient.uploadAvt(userId, file);

        // 2️⃣ Cập nhật URL avatar cho user
        var user = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setAvatar(fileResponse.getUrl());
        userRepository.save(user);

        return fileResponse;
    }

}
