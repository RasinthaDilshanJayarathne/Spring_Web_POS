package lk.ijse.spring.entity;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Item {
    private String code;
    private String description;
    private int qtyOnHand;
    private double unitPrice;
}
