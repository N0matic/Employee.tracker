// Updated Update Role
function updateRoles() {
    // Start by preparing the role titles 
    var userChoice = ""
    var roles = connection.query(
        "SELECT * FROM roles", function (err, res) {
            var role_titles = []
            for (let i = 0; i < res.length; i++) {
                role_titles.push(res[i].title)
            }

            inquirer
                .prompt(
                    [{
                        type: "list",
                        name: "roles",
                        message: "choose a role to update",
                        choices: role_titles
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
                                type: "choice",
                                name: "department_id",
                                message: "What is this role's department?"
                            }])
                ).then(data => {
                    userChoice = result.departments,
                        console.log("Updating" + data.title + "role...\n");
                    connection.query(
                        "INSERT INTO roles SET ? WHERE id = ?", data.title,
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
function updateRoles() {
    // Start by preparing the role titles 
    var userChoice = ""
    var roles = connection.query(
        "SELECT * FROM roles", function (err, res) {
            var role_titles = []
            for (let i = 0; i < res.length; i++) {
                role_titles.push(res[i].title)
            }

            inquirer
                .prompt(
                    [{
                        type: "list",
                        name: "roles",
                        message: "choose a role to update",
                        choices: role_titles
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
                        "INSERT INTO roles SET ? WHERE id = ?", data.title,
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
