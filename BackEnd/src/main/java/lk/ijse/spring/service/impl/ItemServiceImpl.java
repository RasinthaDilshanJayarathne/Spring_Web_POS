package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public void saveItem(ItemDTO dto) {
        if (!itemRepo.existsById(dto.getCode())) {
            Item map = modelMapper.map(dto, Item.class);
            itemRepo.save(map);
        } else {
            throw new RuntimeException("Item Already Exist..!");
        }
    }

    @Override
    public void deleteItem(String id) {
        if (itemRepo.existsById(id)){
            itemRepo.deleteById(id);
        }else{
            throw new RuntimeException("Please check the Item Code.. No Such Item..!");
        }
    }

    @Override
    public void updateItem(ItemDTO dto) {
        if (itemRepo.existsById(dto.getCode())){
            Item map = modelMapper.map(dto, Item.class);
            itemRepo.save(map);
        }else {
            throw new RuntimeException("No Such a Item..!");
        }
    }

    @Override
    public ItemDTO searchItem(String id) {
        if (itemRepo.existsById(id)){
            Item item = itemRepo.findById(id).get();
            return modelMapper.map(item, ItemDTO.class);
        }else{
            throw new RuntimeException("No Item For "+id+" ..!");
        }
    }

    @Override
    public List<ItemDTO> getAllItem() {
        return modelMapper.map(itemRepo.findAll(), new TypeToken<List<ItemDTO>>() {
        }.getType());
    }
}
