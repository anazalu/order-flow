from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestSelenium:
    def test_price_full(self, driver):
        # ProductCard, product with full price and [discount] price
        price_full = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "ProductCard-1-product-price-full")))
        assert price_full.is_displayed()
          
        # ProductCard, product without full price (with regular price only)
        price_full_elements = driver.find_elements(By.ID, "ProductCard-5-product-price-full")
        assert len(price_full_elements) == 0, "The element is present in the DOM."
