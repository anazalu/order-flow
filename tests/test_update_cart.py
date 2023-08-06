from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from conftest import wait_for_element_text_change

def extract_quantity(s: str) -> int:
    l = s.split()
    x = l.index('=') 
    return int(l[x - 1])

def extract_count(s: str) -> int:
    x = s.index(':') 
    return int(s[(x + 2):])

class TestSelenium:
    def test_update_cart_item(self, driver):
        # ProductCard, Add to cart (addButton) -> quantity = 1
        add_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "ProductCard-1-addButton")))
        driver.execute_script("arguments[0].click();", add_button)

        # CartItem, increase quantity -> quantity = 2
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "CartItem-1-increase"), (By.ID, "CartItem-1-name-quantity-subtotal"))
        assert extract_quantity(old_text) + 1 == extract_quantity(new_text)

        # CartItem, decrease quantity -> quantity = 1
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "CartItem-1-decrease"), (By.ID, "CartItem-1-name-quantity-subtotal"))
        assert extract_quantity(old_text) - 1 == extract_quantity(new_text)

        # CartItem, decrease quantity from 1 -> quantity = 0
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "CartItem-1-decrease"), (By.ID, "CartItemsContainer-item-count"))
        assert extract_count(old_text) - 1 == extract_count(new_text)

        # Cart, no such item     
        WebDriverWait(driver, 10).until(EC.invisibility_of_element((By.ID, "CartItem-1-name-quantity-subtotal")))
        cart_items = driver.find_elements(By.ID, "CartItem-1-name-quantity-subtotal")
        assert len(cart_items) == 0, "The element is still present in the DOM."
