-- documenting the commands of db

-- Create database 
CREATE DATABASE yelpresturants; 

-- \l => view databases

-- connect to the database create with \c 
\c yelpresturants;

-- Create a table
CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

-- list all the tables
\d restaurants;

-- insert data into table
INSERT INTO restaurants (name, location, price_range) 
VALUES ('Sultans Dine', 'Dhanmondi', 4),
       ('Chilis', 'Mirpur', 5),
       ('Bobar Biriyani', 'Mohammadpur', 2);

-- get all the datas in a table
SELECT * FROM restaurants;

-- drop table 
DROP TABLE restaurants;

-- -- Create a reviews table
CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5)
);

-- insert data into reviews
INSERT INTO reviews(restaurant_id, name, review, rating) 
VALUES(12, 'John Doe', 'John Doe think it is good restaurant!', 4);

INSERT INTO reviews(restaurant_id, name, review, rating)
VALUES(12, 'Mrs. John Doe', 'Mrs. John Doe does not think it is good restaurant!', 2);

-- avarage rating for a restaurant, let's say restaurant no 2
SELECT TRUNC(AVG(rating), 2) AS avg_rating FROM reviews WEHRE restaurant_id = 2

-- total number of ratings a restaurant has, let's say restaurant no 3
SELECT COUNT(rating) FROM reviews WEHRE restaurant_id = 3

-- number of rating for each restaurant 
SELECT restaurant_id, COUNT(restaurant_id) FROM reviews GROUP BY restaurant_id

-- count avg rating for each restaurant 
SELECT restaurant_id, TRUNC(AVG(rating), 2), COUNT(rating) FROM reviews GROUP BY restaurant_id