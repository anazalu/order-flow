from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from conftest import wait_for_element_text_change


def extract_quantity(s: str) -> int:
    l = s.split()
    x = l.index('=')
    return int(l[x - 1])

class TestSelenium:
    def test_add_to_cart(self, driver):
        # collect data before Add to cart
        
        # ProductCard, Add to cart (addButton)
        # add_button = driver.find_element(By.ID, "ProductCard-1-addButton")
        add_button = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "ProductCard-3-addButton")))        
        assert add_button.is_displayed()
        
        # =================================================================
        # add item
        driver.execute_script("arguments[0].click();", add_button)

        # wait for CartItem to be visible
        cart_item = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "CartItem-3-name-quantity-subtotal")))

        # CartItem, item added
        assert cart_item.is_displayed()

        # ProductCard, minus/plus/quantity are visible
        minus_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "ProductCard-3-minusButton")))
        assert minus_button.is_displayed()
        plus_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "ProductCard-3-plusButton")))
        assert plus_button.is_displayed()
        quantity_field = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "ProductCard-3-quantity")))
        assert quantity_field.is_displayed()
        assert quantity_field.get_attribute('value') == '1'
 
        # ProductCard, click the plus button
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "ProductCard-3-plusButton"), (By.ID, "CartItem-3-name-quantity-subtotal"))
        assert extract_quantity(old_text) + 1 == extract_quantity(new_text)
        assert quantity_field.get_attribute('value') == '2'
        
        # ProductCard, click the minus button
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "ProductCard-3-minusButton"), (By.ID, "CartItem-3-name-quantity-subtotal"))
        assert extract_quantity(old_text) - 1 == extract_quantity(new_text)
        assert quantity_field.get_attribute('value') == '1'

        # ProductCard, click the minus button again
        minus_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "ProductCard-3-minusButton")))
        driver.execute_script("arguments[0].click();", minus_button)     
        add_button = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "ProductCard-3-addButton")))
        assert add_button.is_displayed()
        
        # Cart, no such item     
        WebDriverWait(driver, 10).until(EC.invisibility_of_element((By.ID, "CartItem-3-name-quantity-subtotal")))
        cart_items = driver.find_elements(By.ID, "CartItem-3-name-quantity-subtotal")
        assert len(cart_items) == 0, "The element is still present in the DOM."
