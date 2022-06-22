package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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
        if (!customerRepo.existsById(dto.getId())) {
            Customer map = modelMapper.map(dto, Customer.class);
            customerRepo.save(map);
        } else {
            throw new RuntimeException("Customer Already Exist..!");
        }
    }

    public void deleteCustomer(String id) {
        if (customerRepo.existsById(id)){
            customerRepo.deleteById(id);
        }else{
            throw new RuntimeException("Please check the Customer ID.. No Such Customer..!");
        }
    }

    public void updateCustomer(CustomerDTO dto) {
        if (customerRepo.existsById(dto.getId())){
            Customer map = modelMapper.map(dto, Customer.class);
            customerRepo.save(map);
        }else {
            throw new RuntimeException("No Such a Customer..!");
        }
    }

    public CustomerDTO searchCustomer(String id) {
        if (customerRepo.existsById(id)){
            Customer customer = customerRepo.findById(id).get();
            return modelMapper.map(customer, CustomerDTO.class);
        }else{
            throw new RuntimeException("No Customer For "+id+" ..!");
        }
    }

    public List<CustomerDTO> getAllCustomer() {
        return modelMapper.map(customerRepo.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }
}
