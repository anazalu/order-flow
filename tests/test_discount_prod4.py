from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from conftest import wait_for_element_text_change

def extract_amount(s: str) -> float:
    x = s.index('$') 
    return float(s[(x + 1):])

class TestSelenium:
    def test_price_full(self, driver):
        # ProductCard, product with full price and regular [discount] price
        price_full = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "ProductCard-1-product-price-full")))
        assert price_full.is_displayed()
          
        # ProductCard, product without full price (with regular price only)
        price_full_elements = driver.find_elements(By.ID, "ProductCard-5-product-price-full")
        assert len(price_full_elements) == 0, "The element is present in the DOM."

    def test_you_save(self, driver):
        price = extract_amount(driver.find_element(By.ID, "ProductCard-4-product-price").text)
        old_text, new_text = wait_for_element_text_change(driver, (By.ID, "ProductCard-4-addButton"), (By.ID, "CartItemsContainer-total-amount"))
        assert extract_amount(old_text) + float(price) == extract_amount(new_text)      
        price_full = extract_amount(driver.find_element(By.ID, "ProductCard-4-product-price-full").text)
        you_save = extract_amount(driver.find_element(By.ID, "CartItemsContainer-total-discount").text)
        assert you_save == price_full - price

