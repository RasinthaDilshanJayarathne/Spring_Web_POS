package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.ijse.spring.entity.OrderDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrdersDTO {
    private String oid;
    private String customerId;
    private String itemCode;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate orderDate;
    private int total;
    private int subTotal;

    List<OrderDetailsDTO>orderDetails;


}
