## Some Useful Commands

### Linux
```
history
touch docker-compose.yml
code docker-compose.yml
cd ../..
mkdir db
mv Dockerfile db
```

### Git
```
git clone
git log --oneline
git add create_db.sql
git status
git pull
git checkout feature/DEV-01 
git commit -am "make some changes"
git fetch
git branch -a | grep DEV
git stash
git stash pop
git reset --hard origin/feature/DEV-o2

git checkout main
git pull
git merge feature/DEV-01
git add README.md
git merge --continue
git push
```

### Docker
```
docker image ls
docker ps
docker run --name my-mysql-container -d my-mysql-image
docker exec -it 22e79424cbac sh
docker compose up
docker compose up --build
docker compose down
```

### Postgres
```
psql -U postgres -d orderflow_db
SELECT o.order_id, c.last_name, p.product_name, p.price, o.quantity FROM ((orders o INNER JOIN customers c ON o.customer_id = c.customer_id) INNER JOIN products p ON o.product_id = p.product_id) ORDER BY o.order_id;
UPDATE products SET price_full = 499.99 WHERE id = 4;
\q
\dt
\d orders
```

### Django
```
python manage.py showmigrations
python manage.py makemigrations
python manage.py migrate
python manage.py startapp orderapi
```

### npm/npx
```
npm start
npx cypress run
```

### pytest
```
python -m pytest -k "test_registration_form"
```

### Jenkins
```
1e547ec3a3704240adec76ed3b82cc15
19f2362a48f74a39b6df2afb0713ddab
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
```

## Links

### YAML
https://en.wikipedia.org/wiki/YAML

### mdn: Learn web development
https://developer.mozilla.org/en-US/docs/Learn
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash

### Selenium WebDriver: Waiting strategies
https://www.selenium.dev/documentation/webdriver/waits/
https://www.selenium.dev/selenium/docs/api/py/webdriver_support/selenium.webdriver.support.expected_conditions.html

### Cypress: Writing Your First E2E Test
https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test


## Skills, overall

For an entry-level test automation developer/engineer specializing in Python (pytest, Selenium) and JavaScript/TypeScript (Selenium, Cypress), the following skills are typically expected:

1. **Programming Languages**: Proficiency in Python and JavaScript/TypeScript is essential. You should have a solid understanding of core programming concepts, data types, variables, control structures, loops, functions, and error handling.

2. **Test Automation Frameworks**: Familiarity with popular test automation frameworks is important. For Python, knowledge of pytest and Selenium WebDriver is necessary. In JavaScript/TypeScript, familiarity with Selenium WebDriver and Cypress is expected. You should understand how to write and structure automated tests using these frameworks.

3. **Web Technologies**: A good understanding of web technologies is beneficial. This includes knowledge of HTML, CSS, and DOM manipulation. You should be comfortable inspecting web elements, interacting with web pages, and performing actions like clicking, typing, or verifying element attributes.

4. **Version Control Systems**: Proficiency in using Git or other version control systems is necessary. You should be able to clone repositories, create branches, commit changes, and collaborate effectively with the development team using version control practices.

5. **Test Design and Strategy**: Understanding test design principles and techniques is important. You should have knowledge of test case creation, test data management, and test coverage concepts. Familiarity with testing methodologies, such as black-box testing, white-box testing, and behavior-driven development (BDD), is valuable.

6. **CI/CD and Automation Tools**: Familiarity with CI/CD concepts and tools is expected. Knowledge of Jenkins, GitLab CI/CD, or other similar tools will help you integrate test automation into the development workflow. Experience with build tools like Maven or npm/yarn is also valuable.

7. **Debugging and Troubleshooting**: Strong debugging and troubleshooting skills are essential for identifying and resolving issues in test automation code and test failures. You should be comfortable using debugging tools and techniques to pinpoint the root cause of failures and implement fixes.

8. **Collaboration and Communication**: Effective collaboration and communication skills are crucial as a test automation developer. You should be able to work closely with the development team, QA team, and other stakeholders to understand requirements, communicate test results, and provide feedback.

9. **Continuous Learning**: Test automation technologies and practices evolve rapidly. Being open to continuous learning and staying updated with the latest tools, frameworks, and best practices is important. Actively seeking out new knowledge and improving your skills will help you excel in the field.

It's worth noting that these are foundational skills expected from an entry-level test automation developer/engineer. The specific skill set may vary based on the organization, project requirements, and technology stack. As you gain experience and work on real-world projects, you will continue to enhance your skills and broaden your expertise in test automation.


- Python, TypeScript
- Selenium, Cypress
- HTTP, REST, Postman
- HTML, CSS, React
- Git, GitHub
- Linux
- Docker
- GitHub Actions, Jenkins(?)
- Jira(??)
- testing theory, making test plans
- SQL, Postgres
