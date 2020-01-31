// -------------------------------------------
// -- NPM Databases & Connect Functions
// -------------------------------------------

require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "company_db",
    password: "Excusably-Widely-Salutary"
    // process.env.DB_PASSWORD
})

connection.connect(function (err) {
    if (err) throw err,
        console.log(err);
    console.log("connected as id " + connection.threadID);
    mainMenu()
})

// ---------------------------------------------------
// ---------------------------------------------------
// -- Main Menu Prompt and Choices
// ---------------------------------------------------
// ---------------------------------------------------
function mainMenu() {
    inquirer
        .prompt(
            [{
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: [
                    "Add departments, roles, employees",
                    "View departments, roles, employees",
                    "Update departments, roles, employees",
                    "Exit"
                ]
            }]
        ).then(function (response) {
            if (response.action === "Add departments, roles, employees") {
                console.log(response.action + " selected!")
                addInfo()
            }
            else if (response.action === "View departments, roles, employees") {
                console.log(response.action + " selected!")
                viewInfo()
            }
            else if (response.action === "Update departments, roles, employees") {
                console.log(response.action + " selected!")
                updateInfo()
            }
            else {
                console.log("Thank you for using Employee Tracker!")
                connection.end()
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
                "department",
                "role",
                "employee",
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
            else {
                console.log("back to main menu");
                mainMenu()
            }
        })
}

// -------------------------------------------
// -- Add Department Information
// -------------------------------------------
function addDep() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "department",
                message: "What is this department's name?"
            },
        ]

    ).then(data => {
        console.log("Creating a new department...\n");
        connection.query(
            "INSERT INTO departments (name) VALUES (?)", data.department,
            function (err, res) {
                if (err) throw err;
                console.log("department created!\n")
                connection.query("SELECT * FROM departments", function (err, db_data) {
                    console.table(db_data)
                    addInfo();
                })
            }
        )
    })
}

// -------------------------------------------
// -- Add Role Information
// -------------------------------------------
function addRole() {

    // Here we prepare the questions by gathering the department names for future use
    connection.query("SELECT * FROM departments", function (err, res) {
        var department_names = []
        for (let i = 0; i < res.length; i++) {
            department_names.push(res[i].name)
        }

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
                    type: "list",
                    name: "department_id",
                    message: "What is this role's department?",
                    choices: department_names
                },
            ]

        ).then(data => {
            console.log("Creating a new role...\n");
            var queryId
            for (let i = 0; i < res.length; i++) {
                if (res[i].name === data.department_id) {
                    queryId = res[i].id
                }
            }
            var query = connection.query(
                "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [data.title, data.salary, queryId],
                function (err, res) {
                    connection.query("SELECT * FROM roles", function (err, db_data) {
                        console.table(db_data)
                        addInfo();
                    })
                    if (err) throw err;
                    console.log("role created!\n");
                }
            )
        })
    })
}

// -------------------------------------------
// -- Add Employee Information
// -------------------------------------------
function addEmp() {
    // Here we prepare the questions by gathering the role names for future use
    connection.query("SELECT * FROM roles", function (err, res) {
        var role_names = []
        for (let i = 0; i < res.length; i++) {
            role_names.push(res[i].title)
        }
        console.log("Res check: ", res)

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
                type: "list",
                name: "role_id",
                message: "What is this emplyee's role?",
                choices: role_names
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the ID of this employee's Manager?"
            }]

        ).then(data => {
            console.log("Creating a new Employee...\n");
            var queryId
            for (let i = 0; i < res.length; i++) {
                if (res[i].title === data.role_id) {
                    queryId = res[i].id
                }
            }
            var manager_id = null
            if (data.manager_id) {
                manager_id = data.manager_id
            }
            var query = connection.query(
                "INSERT INTO employees (first_name, last_name, role_id, manager_id) Values (?, ?, ?, ?)", [data.first_name, data.last_name, queryId, manager_id],
                function (err, res) {
                    connection.query("SELECT * FROM employees", function (err, db_data) {
                        console.table(db_data)
                        addInfo();
                    })
                    if (err) throw err;
                    console.log("employee created!\n");
                }
            )
        })
    })
}

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
            else {
                console.log("back to main menu");
                mainMenu()
            }
        })
}

// ---------------------------------------------------
// -- View departments
// ---------------------------------------------------
function viewDeps() {
    connection.query("SELECT * FROM departments", function (err, db_data) {
        console.table(db_data)
        viewInfo()
    })
}
// ---------------------------------------------------
// -- View roles
// ---------------------------------------------------
function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, db_data) {
        console.table(db_data)
        viewInfo()
    })
}
// ---------------------------------------------------
// -- View employees
// ---------------------------------------------------
function viewEmps() {
    connection.query("SELECT * FROM employees", function (err, db_data) {
        console.table(db_data)
        viewInfo()
    })
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
            else {
                console.log("back to main menu");
                mainMenu()
            }
        })
}


// ---------------------------------------------------
// -- Update departments
// ---------------------------------------------------
function updateDeps() {
    var userChoice = ""
    var departments = connection.query(
        "SELECT * FROM departments", function (err, res) {
            var department_names = []
            for (let i = 0; i < res.length; i++) {
                department_names.push(res[i].name)
            }

            inquirer
                .prompt(
                    [{
                        type: "list",
                        name: "departments",
                        message: "choose a department to update",
                        choices: department_names
                    }]
                ).then(result => {
                    console.log('reesult in second .then!!!', result);
                    userChoice = result.departments,
                        inquirer
                            .prompt(
                                [{
                                    type: "input",
                                    name: "rename_department",
                                    message: "Input a new name for the " + result.departments + " department",
                                }]).then(data => {
                                    console.log("New name: " + data.rename_department + " department\n");
                                    var queryId
                                    for (let i = 0; i < res.length; i++) {
                                        if (res[i].name === userChoice) {
                                            queryId = res[i].id
                                        }
                                    }
                                    connection.query(
                                        "UPDATE departments SET name = ? WHERE id = ?", [data.rename_department, queryId],
                                        function (err, res) {
                                            if (err) throw err;
                                            console.log(data.rename_department + " department updated!\n")
                                            connection.query("SELECT * FROM departments", function (err, db_data) {
                                                console.table(db_data)
                                                updateInfo()
                                            })
                                        }
                                    )
                                })
                })
        })
}

// ---------------------------------------------------
// -- Update roles
// ---------------------------------------------------
function updateRoles() {
    var roles = connection.query(
        "SELECT * roles", function (err, res) {
            console.log(res)
            inquirer
                .prompt(
                    [{
                        type: "list",
                        name: "roles",
                        message: "choose a role to update",
                        choices: [res.data]
                    }]
                ).then(roles =>
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
                ).then(data => {
                    console.log("Updating" + data.title + "role...\n");
                    connection.query(
                        "INSERT INTO roles (name) VALUES (?)", data.title,
                        function (err, res) {
                            if (err) throw err;
                            console.log("role updated!\n")
                            connection.query("SELECT * FROM roles", function (err, db_data) {
                                console.table(db_data)
                                updateInfo()
                            })
                        }
                    )
                })
        })
}

// ---------------------------------------------------
// -- Update employees
// ---------------------------------------------------
function updateEmps() {
    var employees = connection.query(
        "SELECT * employees", function (err, res) {
            console.log(res)
            inquirer
                .prompt(
                    [{
                        type: "list",
                        name: "employees",
                        message: "choose an employee to update",
                        choices: [res.data]
                    }]
                ).then(employees =>
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
                ).then(data => {
                    console.log("Updating" + "employee" + data.first_name + " " + data.last_name + "...\n");
                    connection.query(
                        "INSERT INTO employee (name) VALUES (?)", data.title,
                        function (err, res) {
                            if (err) throw err;
                            console.log("employee updated!\n")
                            connection.query("SELECT * FROM employee", function (err, db_data) {
                                console.table(db_data)
                                updateInfo()
                            })
                        }
                    )
                })
        })
}