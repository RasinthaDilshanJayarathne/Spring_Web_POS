package lk.ijse.spring.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class Orders {
    @Id
    private String orderId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate orderDate;
    private int total;
    private int subTotal;

    @JoinColumn(name = "custId",referencedColumnName = "id",nullable = false)

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    private Customer customer;

    @OneToMany(mappedBy = "orders",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderDetails> orderDetails = new ArrayList<>();
}
