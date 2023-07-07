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
    def test_login_form(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        # driver = webdriver.Chrome()
        driver = webdriver.Chrome(options=options) # "path/to/chromedriver.exe",

        driver.get("http://localhost:3000/")

        title = driver.title
        assert title == "React App"

        driver.implicitly_wait(0.5)

        # LoginForm, Username
        username = driver.find_element(By.ID, "loginform-username")
        password = driver.find_element(By.ID, "loginform-password")

        # LoginForm, Password
        username.send_keys("user10")
        password.send_keys("user10")

        # # LoginForm, Login (button)
        # login_button = driver.find_element(by=By.ID, value="loginform-login-button")
        # # login_button.click()
        # driver.execute_script("arguments[0].click();", login_button)

        # time.sleep(2)

        # # list elements
        # list_visible_elements(driver)

        driver.quit()
