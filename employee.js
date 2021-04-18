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
          "Exit",
        ],
      },
    ])
    // runs a function based on the answer the user chooses
    .then((answers) => {
      if (answers.start === "View All Employees") {
        viewAllEmployees();
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
const viewAllEmployees = function () {
  connection.query(
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
const viewByDepartment = function () {
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

// function to view all employees by role
const viewByRole = function () {
  connection.query(
    "SELECT role.id, title AS role, salary, NAME AS department FROM role JOIN department ON role.department_id = department.id ORDER BY title",
    (err, results) => {
      if (err) throw err;
      console.table(results);
      // Prompt the user for their next selection
      start();
    }
  );
};

// function to add employee
const addEmployees = function () {
  connection.query("SELECT * FROM role", (err, roles) => {
    if (err) console.log(err);
    roles = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
  });
  // prompts to input employee information
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: roles,
      },
    ])
    .then((data) => {
      console.log(data.role);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: data.role,
        },
        (err) => {
          if (err) throw err;
          console.log("Updated Employee List:");
          viewAllEmployees();
        }
      );
    });
};

// function to add department
const addDepartments = function () {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the new department called?",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: data.newDepartment,
        },
        function (err) {
          if (err) throw err;
        }
      );
      console.log("Updated Departments:");
      viewByDepartment();
    });
};

// function to add roles
const addRole = function () {
  connection.query("SELECT * FROM department", (err, departments) => {
    if (err) console.log(err);
    departments = departments.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "What is the name of the this new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        {
          type: "list",
          name: "departmentId",
          message: "What department does this role belong to?",
          choices: departments,
        },
      ])
      .then((data) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: data.newRole,
            salary: data.newSalary,
            department_id: data.departmentId,
          },
          function (err) {
            if (err) throw err;
          }
        );
        console.log("Updated Roles Table:");
        viewByRole();
      });
  });
};

// function to update employee roles

const updateEmployeeRole = function() {
  connection.query("SELECT * FROM employee", (err, employees) => {
    if (err) console.log(err);
    employees = employees.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "chooseEmployee",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((data) => {
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          {
            role_id: data.chooseEmployee,
          },
          {
            id: data.employees,
          },
          function (err) {
            if (err) throw err;
          }
        );
        console.log("Updated Employee List:");
        viewAll();
      });
  });
};


// Connects to the server
connection.connect((err) => {
  if (err) throw err;
  // Run the start function after the connection successful
  start();
});

