package com.example.auth_service.service;

import java.util.HashSet;

import org.mapstruct.control.MappingControl;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.auth_service.dto.request.UserCreationRequest;
import com.example.auth_service.dto.response.PageResponse;
import com.example.auth_service.dto.response.UserResponse;
import com.example.auth_service.entity.User;
import com.example.auth_service.exception.AppException;
import com.example.auth_service.exception.ErrorCode;
import com.example.auth_service.mapper.UserMapper;
import com.example.auth_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreationRequest request) {
        // 1. Convert request → User entity
        User user = userMapper.toUser(request);

        // 2. Encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // 3. Save
        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // 4. Convert User entity → UserResponse DTO
        return userMapper.toUserResponse(user);
    }

    public UserResponse getAllUser() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        
    }

    public UserResponse getUserById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toUserResponse)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

}
