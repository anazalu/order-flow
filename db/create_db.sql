CREATE DATABASE orderflow_db;

\c orderflow_db;

CREATE TABLE Products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  image_url VARCHAR(255),
  description TEXT
);

CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE Orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(id),
  status VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE OrderItems (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES Orders(id),
  product_id INTEGER REFERENCES Products(id),
  quantity INTEGER
);

INSERT INTO Products (name, price, image_url, description)
VALUES
  ('Product 1', 10.99, 'https://example.com/product1.jpg', 'Description of Product 1'),
  ('Product 2', 19.99, 'https://example.com/product2.jpg', 'Description of Product 2'),
  ('Product 3', 7.99, 'https://example.com/product3.jpg', 'Description of Product 3');

INSERT INTO Users (username, email, password)
VALUES
  ('user1', 'user1@example.com', 'password1'),
  ('user2', 'user2@example.com', 'password2');

INSERT INTO Orders (user_id, status)
VALUES
  (1, 'new'),
  (1, 'submitted'),
  (2, 'new');

INSERT INTO OrderItems (order_id, product_id, quantity)
VALUES
  (1, 1, 2),
  (1, 2, 1),
  (2, 3, 3);
