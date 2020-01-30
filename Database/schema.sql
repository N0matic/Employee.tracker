DROP database if exists company_db;
CREATE database company_db;

USE company_db;

CREATE TABLE departments
(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR (30) NOT NULL,
PRIMARY KEY (id)
);


CREATE TABLE roles
(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR
(30) NOT NULL,
salary DECIMAL,
department_id INT NOT NULL
PRIMARY KEY (id)
);

CREATE TABLE employees
(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL,
PRIMARY KEY(id)
);

