CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    id_of_each_product VARCHAR(255) NOT NULL,
    quantity_of_each_product VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status_of_order VARCHAR(10) NOT NULL
)