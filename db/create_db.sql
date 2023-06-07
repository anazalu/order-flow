CREATE DATABASE orderflow_db;

\c orderflow_db;

CREATE TABLE customers (
    customer_id serial PRIMARY KEY,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL
);

INSERT INTO customers (last_name, email) VALUES ('Jones', 'jones@yahoo.com'); 
INSERT INTO customers (last_name, email) VALUES ('Bell', 'bell@yahoo.com'); 
INSERT INTO customers (last_name, email) VALUES ('Donne', 'donne@yahoo.com'); 
INSERT INTO customers (last_name, email) VALUES ('Blake', 'blake@yahoo.com'); 
INSERT INTO customers (last_name, email) VALUES ('Frost', 'frost@yahoo.com'); 

CREATE TABLE products (
    product_id serial PRIMARY KEY,
    product_name varchar(255) NOT NULL,
    price int NOT NULL
);

INSERT INTO products (product_name, price) VALUES ('House', 23455);
INSERT INTO products (product_name, price) VALUES ('Book', 55);
INSERT INTO products (product_name, price) VALUES ('Doll', 58); 
INSERT INTO products (product_name, price) VALUES ('Car', 1300); 
INSERT INTO products (product_name, price) VALUES ('Phone', 55); 

CREATE TABLE orders (
    order_id serial PRIMARY KEY,
    customer_id int NOT NULL,
    stage varchar(16) NOT NULL,
    CONSTRAINT fk_customers_orders FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

INSERT INTO orders (customer_id, stage) VALUES (3, 'paid'); 
INSERT INTO orders (customer_id, stage) VALUES (1, 'placed'); 
INSERT INTO orders (customer_id, stage) VALUES (2, 'delivered'); 

CREATE TABLE items (
    item_id serial PRIMARY KEY,
    order_id int NOT NULL,
    product_id int NOT NULL,
    quantity int NOT NULL,
    CONSTRAINT fk_orders_items FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_products_items FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO items (order_id, product_id, quantity) VALUES (3, 4, 1); 
INSERT INTO items (order_id, product_id, quantity) VALUES (2, 3, 2); 
INSERT INTO items (order_id, product_id, quantity) VALUES (2, 3, 10); 
INSERT INTO items (order_id, product_id, quantity) VALUES (3, 4, 6); 
INSERT INTO items (order_id, product_id, quantity) VALUES (1, 2, 5); 
INSERT INTO items (order_id, product_id, quantity) VALUES (1, 1, 1); 
INSERT INTO items (order_id, product_id, quantity) VALUES (1, 5, 1); 
INSERT INTO items (order_id, product_id, quantity) VALUES (3, 2, 2); 
