DROP DATABASE IF EXISTS employee_programDB;
CREATE DATABASE employee_programDB;

use employee_programDB;

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    ROLE_ID INT default 0 NOT NULL,
    manager_id INT default 0,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT default 0 NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

