// Loading modules to be used in node
const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");

// creating the connection
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  //
  password: "test123",
  database: "employee_programDB",
});

// function to start the program
const start = function () {
  console.log("What would you like to do?");
  inquirer
    .prompt([
      {
        // List of options for user to choose in command line
        type: "list",
        name: "startList",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Role",
          "Add Employees",
          "Add Departments",
          "Add A Role",
          "Update Employee Role",
          "Exit"
        ],
      },
      // runs a function based on the answer the user chooses
    ])
    .then((answers) => {
      if (answers.start === "View All Employees") {
        viewAllEmployees(); // FIXME create this fxn
      } else if (answers.start === "View All Employees By Department") {
        viewByDepartment(); // FIXME create this fxn
      } else if (answers.start === "View All Employees By Role") {
        viewByRole(); // FIXME create this fxn
      } else if (answers.start === "Add Employees") {
        addEmployees(); // FIXME create this fxn
      } else if (answers.start === "Add Departments") {
        addDepartments(); // FIXME create this fxn
      } else if (answers.start === "Add A Role") {
        addRole(); // FIXME create this fxn
      } else if (answers.start === "Update Employee Role") {
        updateRole(); // FIXME create this fxn
      } else {
        connection.end();
      }
    });
};

// function to view all employees
const viewAllEmployees = function() {
  connection.query (
    "SELECT employee.id, first_name, last_name, title, salary, name, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
    (err, results) => {
      if (err) throw err;
      console.table(results);
      // Prompt the user for their next selection
      start();
    }
  );
};

// function to view all employees by deparment
const viewAllDepartments = function() {
  connection.query(
    "SELECT id, NAME AS department FROM department",
    (err, results) => {
      if (err) throw err;
      console.table(results);
      // Prompt the user for their next selection
      start();
    }
  );
};

