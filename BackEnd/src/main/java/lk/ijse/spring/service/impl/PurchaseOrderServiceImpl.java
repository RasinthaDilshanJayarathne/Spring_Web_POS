package lk.ijse.spring.service.impl;


import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    PurchaseOrderService orderService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void purchaseOrder(OrdersDTO dto) {
    }

    @Override
    public List<OrdersDTO> getAllOrders() {
        return null;
    }

    @Override
    public List<OrderDetailsDTO> getAllOrderDetails() {
        return null;
    }
}
