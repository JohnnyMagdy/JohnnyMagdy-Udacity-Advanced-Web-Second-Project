# JohnnyMagdy-Udacity-Advanced-Web-Second-Project
## Port 3000
## Requirements
  - Install bcrypt, body-parser, db-migrate, db-migrate-pg, dotenv, express, jsonwebtoken, pg, supertest AS dependencies
  - Install eslint, eslint-config-prettier, eslint-plugin-prettier, jasmine, jasmine-spec-reporter, jasmine-ts, nodemon, prettier, ts-node, tsc-watch, typescript AS devDependencies

## Endpoints
  #### Products
  ```
  [POST] and [GET] localhost:3000/products
  [GET], [PUT] and [DELETE] localhost:3000/products/:id
  ```
  
  #### Users
  ```
  [POST] and [GET] localhost:3000/users
  [GET] , [POST] and [DELETE] localhost:3000/users/:id
  ```

  #### Orders
  ```
  [GET] and [POST] localhost:3000/orders
  [GET] localhost:3000/orders/:id
  [POST] localhost:3000/orders/:id/products
  ```

## Database setup
  **Create user**
  ```
  CREATE USER magical_user WITH PASSWORD 'pass123';
  ```
  **Create database**
  ```
  CREATE DATABASE storefront;
  CREATE DATABASE storefront_test;
  ```
  **Grant all database privileges to user in both databases**
  ```
  GRANT ALL PRIVILEGES ON DATABASE storefront to magical_user;
  GRANT ALL PRIVILEGES ON DATABASE storefront_test to magical_user;
  ```
  
![Database Schema](https://user-images.githubusercontent.com/48155545/168858406-df3ec623-540f-47b4-80cf-c6f9b2c5348e.png)
