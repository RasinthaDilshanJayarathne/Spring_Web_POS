package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper modelMapper;

    public void saveCustomer(CustomerDTO dto) {

    }

    public void deleteCustomer(String id) {

    }

    public void updateCustomer(CustomerDTO dto) {

    }

    public CustomerDTO searchCustomer(String id) {
        return null;
    }

    public List<CustomerDTO> getAllCustomer() {
        return null;
    }
}
