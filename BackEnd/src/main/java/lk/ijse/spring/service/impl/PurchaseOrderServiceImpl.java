package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetails;
import lk.ijse.spring.entity.OrderItem_PK;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailsRepo;
import lk.ijse.spring.repo.OrdersRepo;
import lk.ijse.spring.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    OrdersRepo ordersRepo;

    @Autowired
    OrderDetailsRepo orderDetailsRepo;

    @Autowired
    ItemRepo itemRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    ModelMapper mapper;


    @Override
    public void purchaseOrder(OrdersDTO dto) {

        List<OrderDetails> odList = new ArrayList<>();

        if (!ordersRepo.existsById(dto.getOid())){


            Orders orders = new Orders(dto.getOid(),dto.getCustomerId(),dto.getOrderDate(),
                    dto.getTotal(),dto.getSubTotal(),
                    customerRepo.findById(dto.getCustomerId()).get());
            ordersRepo.save(orders);

            for (OrderDetailsDTO oDto : dto.getOrderDetails()) {

                OrderDetails orderDetail = new OrderDetails(
                        oDto.getPrice(),oDto.getTotal(),
                        oDto.getQty(),orders,itemRepo.findById(oDto.getItemCode()).get()
                );
                odList.add(orderDetail);

            }
            for (OrderDetails temp : odList) {
                System.out.println(temp.getItems().getCode());
                orderDetailsRepo.save(temp);

                Item item = temp.getItems();
                item.setQtyOnHand(item.getQtyOnHand() - temp.getOrderQty());
                itemRepo.save(item);

            }

            orders.setOrderDetails(odList);
            ordersRepo.save(orders);

        }else {
            throw new RuntimeException("Order already exist");
        }

    }

    @Override
    public void deleteOrder(String oid) {

    }

    @Override
    public void updateOrder(OrdersDTO dto) {

    }

    @Override
    public OrdersDTO searchOrder(String oid) {
        return null;
    }

    @Override
    public List<OrdersDTO> getAllOrders() {
        return mapper.map(ordersRepo.findAll(), new TypeToken<List<OrdersDTO>>() {
        }.getType());
    }
}
