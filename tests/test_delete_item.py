from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from conftest import wait_for_element_text_change


def extract_amount(s: str) -> float:
    x = s.index('$') 
    return float(s[(x + 1):])

def extract_count(s: str) -> int:
    x = s.index(':') 
    return int(s[(x + 2):])

class TestSelenium:
    def test_delete_cart_item(self, driver):
        # ProductCard, Add to cart (button) 
        add_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "ProductCard-2-button")))
        driver.execute_script("arguments[0].click();", add_button)

        # wait for CartItem to be visible
        cart_item = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "CartItem-2-name-quantity-subtotal")))

        # CartItem, item added
        assert cart_item.is_displayed()
 
        # retreive subtotal and total       
        cart_item = driver.find_element(By.ID, "CartItem-2-name-quantity-subtotal")
        total_amount = driver.find_element(By.ID, "CartItemsContainer-total-amount")     
        assert cart_item.is_displayed()
        assert total_amount.is_displayed()
        subtotal = extract_amount(cart_item.text)
        total_before_delete = extract_amount(total_amount.text)

        # CartItem, delete item (IconButton) 
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "CartItem-2-delete"), (By.ID, "CartItemsContainer-item-count"))
        assert extract_count(old_text) - 1 == extract_count(new_text)

        # Cart, no such item     
        cart_items = driver.find_elements(By.ID, "CartItem-2-name-quantity-subtotal")
        assert len(cart_items) == 0, "The element is still present in the DOM."
             
        # Cart, total amount decreased 
        total_amount = driver.find_element(By.ID, "CartItemsContainer-total-amount")     
        assert total_amount.is_displayed() 
        total_after_delete = extract_amount(total_amount.text)
        assert total_after_delete == total_before_delete - subtotal     
