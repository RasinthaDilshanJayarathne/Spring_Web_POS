package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@ToString
public class OrderDetails {
    @Id
    @GeneratedValue
    private String orderDetailId;
    private int price;
    private int total;
    private int orderQty;

    @ManyToOne
    private Orders orders;

    @ManyToOne
    private Item items;

    public OrderDetails(int price, int total, int orderQty, Orders orders, Item items) {
        this.price = price;
        this.total = total;
        this.orderQty = orderQty;
        this.orders = orders;
        this.items = items;
    }
}
