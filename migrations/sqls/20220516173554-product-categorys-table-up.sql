CREATE TABLE product_categorys (
    id SERIAL PRIMARY KEY,
    category_id BIGINT REFERENCES categorys(id),
    product_id BIGINT REFERENCES products(id)
);