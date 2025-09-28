package com.example.booking_service.service;

import com.example.booking_service.dto.request.request.CustomerRequest;
import com.example.booking_service.dto.request.response.CustomerResponse;
import com.example.booking_service.entity.Customer;
import com.example.booking_service.exception.AppException;
import com.example.booking_service.exception.ErrorCode;
import com.example.booking_service.mapper.CustomerMapper;
import com.example.booking_service.repository.CustomerRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public List<CustomerResponse> getAllCustomers(){
        List<Customer> customers = customerRepository.findAll();
        return customerMapper.toCustomerResponseList(customers);
    }

    public CustomerResponse getCustomerById(Long id){
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return customerMapper.toCustomerResponse(customer);
    }

    public List<CustomerResponse> createCustomers(List<CustomerRequest> customerRequests){
        List<Customer> customers = customerRequests.stream()
                .map(customerMapper::toCustomer)
                .toList();

        try {
            List<Customer> savedCustomers = customerRepository.saveAll(customers);
        }catch (DataIntegrityViolationException exception){
            throw exception;
        }
        return customerMapper.toCustomerResponseList(customers);
    }
}
