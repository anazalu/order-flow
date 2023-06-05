CREATE DATABASE orderflow_db;

\c orderflow_db;

CREATE TABLE customers (
    customer_id serial PRIMARY KEY,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

INSERT INTO customers (customer_id, last_name, email) VALUES (1, 'Jones', 'jones@yahoo.com'); 
INSERT INTO customers (customer_id, last_name, email) VALUES (2, 'Bell', 'bell@yahoo.com'); 
INSERT INTO customers (customer_id, last_name, email) VALUES (3, 'Donne', 'donne@yahoo.com'); 
INSERT INTO customers (customer_id, last_name, email) VALUES (4, 'Blake', 'blake@yahoo.com'); 
INSERT INTO customers (customer_id, last_name, email) VALUES (5, 'Frost', 'frost@yahoo.com'); 

CREATE TABLE products (
    product_id serial PRIMARY KEY,
    product_name varchar(255) NOT NULL,
    price int NOT NULL
);

INSERT INTO products (product_id, product_name, price) VALUES (1, 'Book', 55);
INSERT INTO products (product_id, product_name, price) VALUES (2, 'Doll', 58); 
INSERT INTO products (product_id, product_name, price) VALUES (3, 'Car', 1300); 
INSERT INTO products (product_id, product_name, price) VALUES (4, 'Phone', 55); 

CREATE TABLE orders (
    order_id int NOT NULL,
    customer_id int NOT NULL,
    product_id int NOT NULL,
    quantity int NOT NULL,
    CONSTRAINT pk_orders PRIMARY KEY (order_id, customer_id, product_id),
    CONSTRAINT fk_customers_orders FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT fk_products_orders FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO orders (order_id, customer_id, product_id, quantity) VALUES (1, 3, 4, 10); 
INSERT INTO orders (order_id, customer_id, product_id, quantity) VALUES (2, 3, 4, 5); 
INSERT INTO orders (order_id, customer_id, product_id, quantity) VALUES (2, 3, 2, 2); 
INSERT INTO orders (order_id, customer_id, product_id, quantity) VALUES (4, 1, 3, 1); 
INSERT INTO orders (order_id, customer_id, product_id, quantity) VALUES (5, 5, 1, 1); 
INSERT INTO orders (order_id, customer_id, product_id, quantity) VALUES (6, 2, 2, 40);
