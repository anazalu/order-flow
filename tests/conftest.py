import pytest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

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

    driver.implicitly_wait(0.5)
    
    # ==================================================================
    # RegistrationForm, find elements
    username_element = driver.find_element(By.ID, "registrationform-username")
    email = driver.find_element(By.ID, "registrationform-email")
    registration_password = driver.find_element(By.ID, "registrationform-password")

    # RegistrationForm, fill in
    username_element.send_keys(username)
    email.send_keys(username + "@example.com")
    registration_password.send_keys("password")

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
    
    # ==================================================================
    # LoginForm, find elements
    username_element = driver.find_element(By.ID, "loginform-username")
    login_password = driver.find_element(By.ID, "loginform-password")

    # LoginForm, fill in
    username_element.send_keys(username)
    login_password.send_keys("password")

    # LoginForm, Login (button)
    login_button = driver.find_element(by=By.ID, value="loginform-login-button")
    # login_button.click()
    driver.execute_script("arguments[0].click();", login_button)

    time.sleep(2)

    # ProductsContainer, the main div
    products_div = driver.find_element(By.ID, "products-container-div")
    assert products_div.is_displayed()

    # ==================================================================
    # Provide the driver instance to the tests
    yield driver

    # Teardown - quit the WebDriver session
    driver.quit()
