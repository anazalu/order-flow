import time
from selenium.webdriver.common.by import By

def extract_subtotal(s: str) -> int:
    x = s.index('$') 
    return int(s[(x + 1):])

def extract_total(s: str) -> int:
    x = s.index('$') 
    return int(s[(x + 1):])

def extract_count(s: str) -> int:
    x = s.index(':') 
    return int(s[(x + 2):])

class TestSelenium:
    def test_delete_cart_item(self, driver):
        # ProductCard, add to cart (button) 
        add_button = driver.find_element(By.ID, "ProductCard-1-button")
        assert add_button.is_displayed()
        driver.execute_script("arguments[0].click();", add_button)
        
        time.sleep(1)
        
        # CartItem, assert item is added and retrieve item subtotal
        cart_item = driver.find_element(By.ID, "CartItem-1-name-quantity-subtotal")
        assert cart_item.is_displayed()
        subtotal = extract_subtotal(cart_item.text)
      
        # Cart, retrieve item count 
        item_count = driver.find_element(By.ID, "CartItemsContainer-item-count")
        assert item_count.is_displayed()
        item_count_before_delete = extract_count(item_count.text)
      
        # Cart, retrieve total amount
        total_amount = driver.find_element(By.ID, "CartItemsContainer-total-amount")     
        assert total_amount.is_displayed()
        total_before_delete = extract_total(total_amount.text)

        # =================================================================
        # CartItem, delete item (iconbutton) 
        delete_button = driver.find_element(By.ID, "CartItem-1-delete")
        assert delete_button.is_displayed()
        driver.execute_script("arguments[0].click();", delete_button)
        
        time.sleep(1)
        
        # # Cart, no such item
        # CartItemsContainer
        # cart_item = driver.find_element(By.ID, "CartItem-1-name-quantity-subtotal")
        # assert (CartItemsContainer has no such item)

        # Cart, item count decreased 
        item_count = driver.find_element(By.ID, "CartItemsContainer-item-count")
        assert item_count.is_displayed() 
        item_count_after_delete = extract_count(item_count.text)
        assert item_count_after_delete == item_count_before_delete - 1
      
        # Cart, total amount decreased 
        total_amount = driver.find_element(By.ID, "CartItemsContainer-total-amount")     
        assert total_amount.is_displayed() 
        total_after_delete = extract_total(total_amount.text)
        assert total_after_delete == total_before_delete - subtotal     
