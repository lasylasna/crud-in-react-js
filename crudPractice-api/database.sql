create database crudpractice2;

CREATE TABLE testtable1 (
 id serial PRIMARY KEY,
 first VARCHAR(100),
 last VARCHAR(100),
 email text UNIQUE NOT NULL,
 phone VARCHAR(100),
 location VARCHAR(100),
 hobby VARCHAR(100)
 
);