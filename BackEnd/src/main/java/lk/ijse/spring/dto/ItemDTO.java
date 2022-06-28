package lk.ijse.spring.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ItemDTO {
    private String code;
    private String name;
    private int qtyOnHand;
    private double price;
}
