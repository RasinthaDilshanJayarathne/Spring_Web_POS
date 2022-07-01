package lk.ijse.spring.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@ToString
public class Orders {
    @Id
    private String oid;
    private String custId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private int total;
    private int subTotal;

    @ManyToOne
    private Customer customer;

    @OneToMany(mappedBy = "orders",cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails;

    public Orders(String oid, String customerId, LocalDate orderDate, int total, int subTotal, Customer customer) {
        this.oid=oid;
        this.custId=customerId;
        this.date=orderDate;
        this.total=total;
        this.subTotal=subTotal;
        this.customer=customer;
    }
}
