// -------------------------------------------
// -- NPM Databases
// -------------------------------------------
require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "great_bay_db",
    password: process.env.DB_PASSWORD
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
    mainMenu();
})

// ---------------------------------------------------
// ---------------------------------------------------
// -- Main Menu Prompt and Choices
// ---------------------------------------------------
// ---------------------------------------------------
function mainMenu() {
    inquirer
        .prompt([{
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles"
            ]

        }]).then(function (response) {
            if (response.action === "Add departments, roles, employees") {
                console.log(response.action + " selected!");
                addDepart();
            }
            else if (response.action === "View departments, roles, employees") {
                console.log(response.action + " selected!");
                addRoles();
            }
            else if (response.action === "Update employee roles") {
                console.log(response.action + " selected!");
                addEmployees();
            }
            else if (response.action === "Exit") {
                console.log("Thank you for using Employee Tracker!");
                connection.end();
            }
        })
}

// ---------------------------------------------------
// ---------------------------------------------------
// -- Branching choices to add information
// ---------------------------------------------------
// ---------------------------------------------------
function addInfo() {
    inquirer
        .prompt([{
            type: "list",
            name: "action",
            message: "Add a department, role, or employee?",
            choices: [
                "departments",
                "roles",
                "employees"
            ]

        }]).then(function (response) {
            if (response.action === "department") {
                console.log(response.action + " selected!");
                addInfo();
            }
            else if (response.action === "role") {
                console.log(response.action + " selected!");
                viewInfo();
            }
            else if (response.action === "employee") {
                console.log(response.action + " selected!");
                updateInfo();
            }
            else if (response.action === "Exit") {
                console.log("Thank you for using Employee Tracker!");
                connection.end();
            }
        })
}

// -------------------------------------------
// -- Add Employee Information
// -------------------------------------------
inquirer.prompt(
    [
        {
            type: "input",
            name: "first_name",
            message: "What is this emplyee's name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is this emplyee's name?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is this emplyee's role?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the ID of this emplyee's Manager?"
        },
    ]

    // Function to Create Employee based on answers        
).then(function (data) {
    console.log("Creating a new Post...\n");
    var query = connection.query(
        "INSERT INTO posts SET ?",
        data,
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "Post created!\n");
            mainMenu();
        }
    );
});

// -------------------------------------------
// -- Add Role Information
// -------------------------------------------
inquirer.prompt(
    [
        {
            type: "input",
            name: "title",
            message: "What is this role's title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is this role's salary?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is this role's department?"
        },
    ]

    // Function to Create role based on answers        
).then(function (data) {
    console.log("Creating a new Post...\n");
    var query = connection.query(
        "INSERT INTO posts SET ?",
        data,
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "Post created!\n");
            mainMenu();
        }
    );
});

// -------------------------------------------
// -- Add Department Information
// -------------------------------------------
inquirer.prompt(
    [
        {
            type: "input",
            name: "title",
            message: "What is this department's name?"
        },
    ]

    // Function to Create role based on answers        
).then(function (data) {
    console.log("Creating a new Post...\n");
    var query = connection.query(
        "INSERT INTO posts SET ?",
        data,
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "Post created!\n");
            mainMenu();
        }
    );
});