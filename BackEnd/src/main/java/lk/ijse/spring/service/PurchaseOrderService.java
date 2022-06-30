package lk.ijse.spring.service;

import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;

import java.util.List;

public interface PurchaseOrderService {

    void purchaseOrder(OrdersDTO dto);

    List<OrdersDTO> getAllOrders();

    List<OrderDetailsDTO> getAllOrderDetails();
}
