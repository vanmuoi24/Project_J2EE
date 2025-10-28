package com.example.auth_service.controller;


import com.example.auth_service.config.CustomJwtDecoder;
import com.example.auth_service.config.SecurityConfig;
import com.example.auth_service.dto.request.AuthenticationRequest;
import com.example.auth_service.dto.response.AuthenticationResponse;
import com.example.auth_service.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.CoreMatchers.is;

@WebMvcTest(AuthController.class)
@Import(SecurityConfig.class)
public class AuthControllerTest {

    /**
     * Đây là công cụ chính để mô phỏng các lời gọi HTTP (GET, POST,...)
     * đến Controller của bạn.
     */
    @Autowired
    private MockMvc mockMvc;

    /**
     * Đây là tiện ích Spring tự động cấu hình, giúp bạn
     * chuyển đổi một Java Object (ví dụ: AuthenticationRequest)
     * thành một chuỗi JSON để gửi đi trong request body.
     */
    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Vì @WebMvcTest không tải bean @Service, chúng ta phải
     * cung cấp một phiên bản "giả" (mock) của nó.
     * Controller sẽ tiêm (autowire) mock này thay vì service thật.
     */
    @MockBean
    private AuthService authService;

    @MockBean
    private CustomJwtDecoder customJwtDecoder;

    @Test
    void login_whenValidRequest_thenReturnsToken() throws Exception {
        // Tạo một đối tượng request mà client sẽ gửi lên
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("abc123@gmail.com");
        request.setPassword("123");

        // Tạo một đối tượng response "giả" mà ta mong đợi Service trả về
        AuthenticationResponse serviceResponse = AuthenticationResponse.builder()
                .token("day-la-mot-mocked-token-12345")
                .build();

        // "Dạy" cho Mock Service:
        // "Khi phương thức 'authenticated' được gọi với BẤT KỲ (any)
        // đối tượng AuthenticationRequest nào, THÌ (then)
        // hãy trả về (Return) đối tượng 'serviceResponse' ở trên."
        when(authService.authenticated(any(AuthenticationRequest.class)))
                .thenReturn(serviceResponse);


        // Thực hiện gọi API POST /users/login
        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON) // Đặt Header Content-Type
                        .content(objectMapper.writeValueAsString(request))) // Chuyển object -> JSON string

                // Mong đợi HTTP Status Code là 200 (OK)
                .andExpect(status().isOk())

                // Dùng JSONPath để "đào" vào nội dung JSON trả về
                // Cấu trúc response của bạn là: { "result": { "token": "..." } }
                // Ký tự $ đại diện cho root (toàn bộ response)
                .andExpect(jsonPath("$.result.token", is("day-la-mot-mocked-token-12345")));
    }
}
