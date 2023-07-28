from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from conftest import wait_for_element_text_change

def extract_quantity(s: str) -> int:
    l = s.split()
    x = l.index('=') 
    return int(l[x - 1])
    
class TestSelenium:
    def test_update_cart_item(self, driver):
        # ProductCard, Add to cart (addButton) 
        add_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "ProductCard-1-addButton")))
        driver.execute_script("arguments[0].click();", add_button)

        # CartItem, increase quantity
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "CartItem-1-increase"), (By.ID, "CartItem-1-name-quantity-subtotal"))
        assert extract_quantity(old_text) + 1 == extract_quantity(new_text)

        # CartItem, decrease quantity
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "CartItem-1-decrease"), (By.ID, "CartItem-1-name-quantity-subtotal"))
        assert extract_quantity(old_text) - 1 == extract_quantity(new_text)
