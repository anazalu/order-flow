import time
import pytest
from selenium.webdriver.common.by import By

class TestSelenium:
    def test_add_to_cart(self, driver):
        # ProductCard, Add to cart (button) 
        add_button = driver.find_element(By.ID, "ProductCard-1-button")
        assert add_button.is_displayed()
        driver.execute_script("arguments[0].click();", add_button)
        
        time.sleep(1)
        
        # CartItem, item added
        cart_item = driver.find_element(By.ID, "CartItem-1-name-quantity-subtotal")
        assert cart_item.is_displayed()
