import time
from selenium import webdriver
from selenium.webdriver.common.by import By

def list_visible_elements(driver):
    elements = driver.find_elements(By.XPATH, "//*")
    for element in elements:
        if element.is_displayed():
            element_tag_name = element.tag_name
            element_id = element.get_attribute("id")
            element_name = element.get_attribute("name")
            element_class = element.get_attribute("class")
            print(element_tag_name, 'id =', element_id, 'name =', element_name, 'class =', element_class)
    print('=' * 200)

class TestSelenium:
    def __init__(self) -> None:
        self.username = 'user' + str(time.time())[11:]

    def test_registration_form(self):        
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        driver = webdriver.Chrome(options=options)

        driver.get("http://localhost:3000/")

        title = driver.title
        assert title == "OrderFlow"

        driver.implicitly_wait(0.5)

        # RegistrationForm, find elements
        username_element = driver.find_element(By.ID, "registrationform-username")
        email = driver.find_element(By.ID, "registrationform-email")
        password = driver.find_element(By.ID, "registrationform-password")

        # RegistrationForm, fill in
        username_element.send_keys(self.username)
        email.send_keys(self.username + "@example.com")
        password.send_keys("password")

        # RegistrationForm, Register (button)
        register_button = driver.find_element(by=By.ID, value="registrationform-register-button")
        # register_button.click()
        driver.execute_script("arguments[0].click();", register_button)

        time.sleep(2)

        # Success Message
        p_elements = driver.find_elements(By.CSS_SELECTOR, 'p.MuiTypography-root')
        found = False
        expected_text = "Registration successful!"
        for p_element in p_elements:
            if expected_text in p_element.text:
                found = True
                break

        # Assert that the specific text is found in one of the elements
        assert found, f"Expected text {expected_text} not found in any element."

        print('Test 1 Completed!')

        driver.quit()

    def test_login_form(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        driver = webdriver.Chrome(options=options)

        driver.get("http://localhost:3000/")

        driver.implicitly_wait(0.5)

        # LoginForm, find elements
        username = driver.find_element(By.ID, "loginform-username")
        password = driver.find_element(By.ID, "loginform-password")

        # LoginForm, fill in
        username.send_keys(self.username)
        password.send_keys("password")

        # LoginForm, Login (button)
        login_button = driver.find_element(by=By.ID, value="loginform-login-button")
        # login_button.click()
        driver.execute_script("arguments[0].click();", login_button)

        time.sleep(2)

        # list elements
        # list_visible_elements(driver)

        # ProductsContainer, the main div
        products_div = driver.find_element(By.ID, "products-container-div")
        assert products_div.is_displayed()

        print('Test 2 Completed!')

        driver.quit()


# t = TestSelenium()
# t.test_registration_form()
# t.test_login_form()
