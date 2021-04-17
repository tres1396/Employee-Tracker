// Loading modules to be used in node
const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'test123',
    database: 'employee_programDB',
  });