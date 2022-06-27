package lk.ijse.spring.service;


import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    public void saveItem(ItemDTO dto);

    public void deleteItem(String id);

    public void updateItem(ItemDTO dto);

    public ItemDTO searchItem(String id);

    public List<ItemDTO> getAllItem();
}
