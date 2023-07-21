from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# def extract_amount(s: str) -> float:
#     x = s.index('$') 
#     return float(s[(x + 1):])

# def extract_count(s: str) -> int:
#     x = s.index(':') 
#     return int(s[(x + 2):])

# def extract_price(s: str) -> float:
#     x = 
# #     return int(...)
# def extract_quantity(s: str) -> int:
#     l = s.split()
#     x = l.index('=') 
#     return int(l[x - 1])

class TestSelenium:
    def test_add_to_cart(self, driver):
        # collect data before Add to cart
        
        # ProductCard, Add to cart (button)
        # add_button = driver.find_element(By.ID, "ProductCard-1-button")
        add_button = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "ProductCard-3-button")))
        assert add_button.is_displayed()

        # =================================================================
        # add item
        driver.execute_script("arguments[0].click();", add_button)

        # wait for CartItem to be visible
        cart_item = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "CartItem-3-name-quantity-subtotal")))

        # CartItem, item added
        assert cart_item.is_displayed()
 