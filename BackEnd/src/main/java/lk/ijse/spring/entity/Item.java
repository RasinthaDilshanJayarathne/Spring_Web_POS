package lk.ijse.spring.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

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
    private double price;
}
