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
                addInfo();
            }
            else if (response.action === "View departments, roles, employees") {
                console.log(response.action + " selected!");
                viewInfo();
            }
            else if (response.action === "Update employee roles") {
                console.log(response.action + " selected!");
                updateInfo();
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
                "employees",
                "back"
            ]

        }]).then(function (response) {
            if (response.action === "department") {
                console.log(response.action + " selected!");
                addDep();
            }
            else if (response.action === "role") {
                console.log(response.action + " selected!");
                addRole();
            }
            else if (response.action === "employee") {
                console.log(response.action + " selected!");
                addEmp();
            }
            else if (response.action === "back") {
                console.log("back to main menu");
                mainMenu()
            }
        })
}

// -------------------------------------------
// -- Add Employee Information
// -------------------------------------------
inquirer.prompt(
    [{
        type: "input",
        name: "first_name",
        message: "What is this emplyee's first name?"
    },
    {
        type: "input",
        name: "last_name",
        message: "What is this emplyee's last name?"
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
    }]
    // Function to Create Employee based on answers        
).then(function (data) {
    console.log("Creating a new Employee...\n");
    var query = connection.query(
        "INSERT INTO employees SET ?",
        data,
        function (err, res) {
            if (err) throw err;
            console.table(res.affectedRows + "Employee created!\n");
            addInfo();
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
    console.log("Creating a new role...\n");
    var query = connection.query(
        "INSERT INTO roles SET ?",
        data,
        function (err, res) {
            if (err) throw err;
            console.table(res.affectedRows + "Post created!\n");
            addInfo();
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
            name: "department",
            message: "What is this department's name?"
        },
    ]

    // Function to Create role based on answers        
).then(function (data) {
    console.log("Creating a new department...\n");
    var query = connection.query(
        "INSERT INTO department SET ?",
        data,
        function (err, res) {
            if (err) throw err;
            console.table(res.affectedRows + "Post created!\n");
            addInfo();
        }
    );
});

// ---------------------------------------------------
// ---------------------------------------------------
// -- Branching choices to view information
// ---------------------------------------------------
// ---------------------------------------------------
function viewInfo() {
    inquirer
        .prompt([{
            type: "list",
            name: "action",
            message: "Would you like to view departments, roles, or employees?",
            choices: [
                "departments",
                "roles",
                "employees",
                "back"
            ]

        }]).then(function (response) {
            if (response.action === "departments") {
                console.log(response.action + " selected!");
                viewDeps();
            }
            else if (response.action === "roles") {
                console.log(response.action + " selected!");
                viewRoles();
            }
            else if (response.action === "employees") {
                console.log(response.action + " selected!");
                viewEmps();
            }
            else if (response.action === "back") {
                console.log("back to main menu");
                mainMenu()
            }
        })
}

// ---------------------------------------------------
// -- View departments
// ---------------------------------------------------
function viewDeps() {
    console.table(departments)
    viewInfo
};
// ---------------------------------------------------
// -- View roles
// ---------------------------------------------------
function viewRoles() {
    console.table(roles)
    viewInfo
}
// ---------------------------------------------------
// -- View employees
// ---------------------------------------------------
function viewEmps() {
    console.table(employees)
    viewInfo
}

// ---------------------------------------------------
// ---------------------------------------------------
// -- Branching choices to Update information
// ---------------------------------------------------
// ---------------------------------------------------
function updateInfo() {
    inquirer
        .prompt([{
            type: "list",
            name: "action",
            message: "Would you like to update departments, roles, or employees?",
            choices: [
                "departments",
                "roles",
                "employees",
                "back"
            ]

        }]).then(function (response) {
            if (response.action === "departments") {
                console.log(response.action + " selected!");
                updateDeps();
            }
            else if (response.action === "roles") {
                console.log(response.action + " selected!");
                updateRoles();
            }
            else if (response.action === "employees") {
                console.log(response.action + " selected!");
                updateEmps();
            }
            else if (response.action === "back") {
                console.log("back to main menu");
                mainMenu()
            }
        })
}

// ---------------------------------------------------
// -- Update departments
// ---------------------------------------------------
function updateDeps() {
    inquirer
        .prompt(
            [{
                type: "list",
                name: "departments",
                message: "choose a department to update",
                choices: [`departments`]
            }]
        ).then(answer =>
            inquirer
                .prompt(
                    [{
                        type: "input",
                        name: "rename_department",
                        message: "Input a new name for this department",
                    }])
        ).then(response => {
            console.log("New name: " + response.rename_department);
            updateInfo();
        }
        )
};

// ---------------------------------------------------
// -- Update roles
// ---------------------------------------------------
function updateRoles() {
    inquirer
        .prompt(
            [{
                type: "list",
                name: "roles",
                message: "choose a role to update",
                choices: [`role`]
            }]
        ).then(answer =>
            inquirer
                .prompt(
                    [{
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
                    }])
        ).then(response => {
            if (response.action === "title") {
                console.log(response.action + " selected!");
                updateDeps();
            }
            else if (response.action === "salary") {
                console.log(response.action + " selected!");
                updateRoles();
            }
            else if (response.action === "department_id") {
                console.log(response.action + " selected!");
                updateEmps();
            }
            console.log("New role: " + response.title + "New salary: " + response.salary + "New department ID: " + response.department_id);
        }).then(response =>
            console.table(roles),
            updateInfo()
        )
};
// ---------------------------------------------------
// -- Update employees
// ---------------------------------------------------
function updateEmps() {
    inquirer
        .prompt(
            [{
                type: "list",
                name: "employees",
                message: "choose an employee to update",
                choices: [`employee`]
            }]
        ).then(answer =>
            inquirer
                .prompt(
                    [{
                        type: "input",
                        name: "first_name",
                        message: "What is this emplyee's first name?"
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is this emplyee's last name?"
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
                    }])
        ).then(response => {
            if (response.action === "title") {
                console.log(response.action + " selected!");
                updateDeps();
            }
            else if (response.action === "salary") {
                console.log(response.action + " selected!");
                updateRoles();
            }
            else if (response.action === "department_id") {
                console.log(response.action + " selected!");
                updateEmps();
            }
            console.log("New role: " + response.title + "New salary: " + response.salary + "New department ID: " + response.department_id);
        }).then(response =>
            console.table(roles),
            updateInfo()
        )
};
