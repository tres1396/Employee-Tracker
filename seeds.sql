use employee_programDB;

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("John", "Doe", 1),
("Jay", "Z", 1),
("Rihanna", "Fenty", 1),
("Jason", "Bourne", 1),
("James", "Bond", 1),
("Dua", "Lipa", 1),
("Wendy", "Williams", 1),
("Monica", "Lewinsky", 1),

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2),
("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");
