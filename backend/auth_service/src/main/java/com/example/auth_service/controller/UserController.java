package com.example.auth_service.controller;

import org.springframework.http.MediaType;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;

import com.example.auth_service.dto.request.ApiResponse;
import com.example.auth_service.dto.request.UserCreationRequest;
import com.example.auth_service.dto.request.UserUpdate;
import com.example.auth_service.dto.response.PageResponse;
import com.example.auth_service.dto.response.UserResponse;
import com.example.auth_service.entity.User;
import com.example.auth_service.service.UserService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class UserController {

    UserService userService;

    @PostMapping("/register")
        ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
            System.err.println(request);
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping("/list")
    public ApiResponse<UserResponse> listUser(){
        return ApiResponse.<UserResponse>builder()
                .result(userService.getAllUser())
                .build();
    }
    // ApiResponse<PageResponse<UserResponse>> listUser(
    //         @RequestParam(value = "page", required = false, defaultValue = "1") int page,
    //         @RequestParam(value = "size", required = false, defaultValue = "10") int size
    //         ){
    //     return ApiResponse.<PageResponse<UserResponse>>builder()
    //             .result(userService.getAllUser(page, size))
    //             .build();
    // }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable Long id) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserById(id))
                .build();
    }

    @PostMapping("/UpdateUser/{id}")
    public ApiResponse<UserResponse> updateUser(
            @PathVariable Long id,
            @ModelAttribute UserUpdate request) {
                System.out.println(request);
        return ApiResponse.<UserResponse>builder().result(userService.updateUser(id, request))
                .build();
    }



    
}
