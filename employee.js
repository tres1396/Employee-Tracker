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
  inquirer.prompt ([
    {
      type: "list",
      name: "startList",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Role",
        "Add Employees",
        "Add Departments",
        "Add A Role"
      ]
    }
  ])
};
