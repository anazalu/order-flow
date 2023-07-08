# OrderFlow

## Overview

This is a web project with Linux, MySQL and Python Django on backend. The server exposes a REST API that is consumed by web frontend (React). The project's source code is stored in a GitHub repository.

## Roles

The project needs 1 backend developer (Python/Django), 1 frontend developer (TypeScript/React), 1 test engineer with test automation skills (Cypress, Selenium).

## Tasks

Development (backend):
- ~~Set up a GitHub repo.~~
- ~~Set up MySQL. Create a Docker image based on a MySQL image. The new image should run an SQL script that creates a database with 2-3 tables (CUSTOMERS, PRODUCTS, ORDERS).~~
- ~~Set up Python Django (see the instruction below).~~
- ~~Write some backend code that connects to the database and handles GET and POST requests:~~
    ~~- List products~~
    ~~- Place an order~~
- ~~implement web frontend~~
- serve product pictures from the web server

Development (frontend):
- ~~The frontend consumes the REST API and renders a basic web interface.~~

Testing:

- Backend, manual.
- Backend, automated (pytest).
- API, manual (Postman).
    - /api/products/ GET
    - /api/products/1/ GET
    - /api/orders/ GET POST
    - /api/orders/1/ GET PUT DELETE
    - /api/cart/items/ POST
    - /api/cart/items/1/  GET PUT DELETE
    - /api/register/ POST
    - /api/token/ POST
    - /api/token/refresh/ POST
- API, automated (Cypress).
- Web, manual.
- Web, automated (Selenium).

## Architecture

The backend is implemented as two servers, database and application, that run as two Docker containers (uses Docker Compose).

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
```

### Postgres
```
psql -U postgres -d orderflow_db
SELECT o.order_id, c.last_name, p.product_name, p.price, o.quantity FROM ((orders o INNER JOIN customers c ON o.customer_id = c.customer_id) INNER JOIN products p ON o.product_id = p.product_id) ORDER BY 
o.order_id;
\q
\dt
\d orders
```

### Django
```
python manage.py showmigrations
python manage.py migrate
python manage.py startapp orderapi
```
### Cypress
```
npx cypress run
```

## Links

### YAML
https://en.wikipedia.org/wiki/YAML

### mdn: Learn web development
https://developer.mozilla.org/en-US/docs/Learn

### Selenium WebDriver: Getting started
https://www.selenium.dev/documentation/webdriver/getting_started/

### Cypress: Writing Your First E2E Test
https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
