
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
                    },
                    {
                        type: "input",
                        name: "rename_role",
                        message: result => "Input a new name for the " + result.roles + " department"
                    }, {
                        type: "input",
                        name: "salary",
                        message: "What is this role's salary?"
                    },
                    {
                        type: "choice",
                        name: "department_id",
                        message: "What is this role's department?"
                    }]
                ).then(data => {
                    console.log("New name: " + data.rename_role + " role\n");
                    var queryId
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].name === userChoice) {
                            queryId = res[i].id
                        }
                    }
                    connection.query(
                        "UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?", [data.rename_role, data.salary, data.department_id, queryId],
                        function (err, res) {
                            if (err) throw err;
                            console.log(data.rename_role + " role updated!\n")
                            connection.query("SELECT * FROM roles", function (err, db_data) {
                                console.table(db_data)
                                updateInfo()
                            })
                        }
                    )
                })
        })
}