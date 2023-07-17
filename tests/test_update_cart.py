import time
from selenium.webdriver.common.by import By

def extract_quantity(s: str) -> int:
    l = s.split()
    x = l.index('=') 
    return int(l[x - 1])
    
class TestSelenium:
    def test_update_cart_item(self, driver):
        # ProductCard, Add to cart (button) 
        add_button = driver.find_element(By.ID, "ProductCard-1-button")
        assert add_button.is_displayed()
        driver.execute_script("arguments[0].click();", add_button)
        
        time.sleep(1)
        
        # CartItem, item quantity retrieved
        cart_item = driver.find_element(By.ID, "CartItem-1-name-quantity-subtotal")
        assert cart_item.is_displayed()
        quantity_retrieved = extract_quantity(cart_item.text)
        
        # =================================================================
        # CartItem, increase quantity (iconbutton) 
        plus_button = driver.find_element(By.ID, "CartItem-1-increase")
        assert plus_button.is_displayed()
        driver.execute_script("arguments[0].click();", plus_button)
        
        time.sleep(1)
        
        # CartItem, item quantity successfully increased
        cart_item = driver.find_element(By.ID, "CartItem-1-name-quantity-subtotal")
        assert cart_item.is_displayed()
        quantity_after_plus = extract_quantity(cart_item.text)
        assert quantity_after_plus == quantity_retrieved + 1
       
        # =================================================================              
        # CartItem, decrease quantity (iconbutton)
        minus_button = driver.find_element(By.ID, "CartItem-1-decrease")
        assert minus_button.is_displayed()
        driver.execute_script("arguments[0].click();", minus_button)
        
        time.sleep(1)
        
        # CartItem, item quantity successfully decreased
        cart_item = driver.find_element(By.ID, "CartItem-1-name-quantity-subtotal")
        assert cart_item.is_displayed()
        quantity_after_minus = extract_quantity(cart_item.text)
        assert quantity_after_minus == quantity_after_plus - 1

        # =================================================================              
        # CartItem, delete item (iconbutton) 
