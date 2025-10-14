package com.example.auth_service.mapper;



import org.mapstruct.Mapper;


import com.example.auth_service.dto.request.UserCreationRequest;
import com.example.auth_service.dto.response.UserResponse;
import com.example.auth_service.entity.User;


@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);
    UserResponse toUserResponse(User user);
    java.util.List<UserResponse> toUserResponseList(java.util.Set<User> users);
    

}
