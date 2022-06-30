package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@IdClass(OrderItemPK.class)
public class OrderDetails {
    @Id
    private String orderID;
    @Id
    private String itemCode;
    private int qty;
    private int price;
    private int total;

    @ManyToOne
    @JoinColumn(name = "orderID",referencedColumnName = "orderId",insertable = false,updatable = false)
    private Orders orders;
    @ManyToOne
    @JoinColumn(name = "itemCode",referencedColumnName = "itemCode",insertable = false,updatable = false)
    private Item items;
}
