package lk.ijse.spring.controller;

import lk.ijse.spring.service.PurchaseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("order")
@CrossOrigin
public class PurchaseOrderController {

    @Autowired
    PurchaseOrderService orderService;
}
