import pytest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException

@pytest.fixture(scope='session')
def driver():
    # Generate username
    username = 'user' + str(time.time())[11:]

    # Start the WebDriver session
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)

    driver.get("http://localhost:3000/")

    title = driver.title
    assert title == "OrderFlow"

    # driver.implicitly_wait(0.5)
    
    # ==================================================================
    # RegistrationForm, find elements
    username_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "registrationform-username")))
    email = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "registrationform-email")))
    registration_password = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "registrationform-password")))

    # RegistrationForm, fill in
    username_element.send_keys(username)
    email.send_keys(username + "@example.com")
    registration_password.send_keys("password")

    # RegistrationForm, Register (button)
    register_button = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "registrationform-register-button")))
    # register_button.click()
    driver.execute_script("arguments[0].click();", register_button)

    # time.sleep(2)

    # Success Message
    p_elements = WebDriverWait(driver, 10).until(EC.visibility_of_all_elements_located((By.CSS_SELECTOR, 'p.MuiTypography-root')))
    found = False
    expected_text = "Registration successful!"
    for p_element in p_elements:
        if expected_text in p_element.text:
            found = True
            break

    # Assert that the specific text is found in one of the elements
    assert found, f"Expected text {expected_text} not found in any element."
    
    # ==================================================================
    # LoginForm, find elements
    username_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "loginform-username")))
    login_password = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "loginform-password")))

    # LoginForm, fill in
    username_element.send_keys(username)
    login_password.send_keys("password")

    # LoginForm, Login (button)
    login_button = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "loginform-login-button")))
    # login_button.click()
    driver.execute_script("arguments[0].click();", login_button)

    # time.sleep(2)

    # ProductsContainer, the main div
    products_div = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "products-container-div")))
    assert products_div.is_displayed()

    # ==================================================================
    # Provide the driver instance to the tests
    yield driver

    # Teardown - quit the WebDriver session
    driver.quit()

# ==================================================================

def wait_for_element_text_change(driver, button_locator, element_locator):
    # find the element and store its initial text
    element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(element_locator))
    initial_text = element.text

    # find the button and click it
    button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable(button_locator))
    driver.execute_script("arguments[0].click();", button)

    def element_text_changed(driver):
        try:
            current_text = driver.find_element(*element_locator).text
            return current_text != initial_text
        except (StaleElementReferenceException, NoSuchElementException):
            return False

    WebDriverWait(driver, 10).until(element_text_changed)

    return initial_text, driver.find_element(*element_locator).text
