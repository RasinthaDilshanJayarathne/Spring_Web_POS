package lk.ijse.spring.entity;

import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class Item {
    @Id
    private String code;
    private String name;
    private int qtyOnHand;
    private int price;

    @OneToMany(mappedBy = "items",cascade = CascadeType.ALL)
    private List<OrderDetails> orderList=new ArrayList();
}
