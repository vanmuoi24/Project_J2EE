package com.example.auth_service.mapper;



import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.auth_service.dto.request.UserCreationRequest;
import com.example.auth_service.dto.response.UserResponse;
import com.example.auth_service.entity.User;


@Mapper(componentModel = "spring")
public interface UserMapper {
    // Convert request DTO to entity
    User toUser(UserCreationRequest request);

    // Convert entity to response DTO
    UserResponse toUserResponse(User user);
}
