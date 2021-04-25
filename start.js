const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'hello',
    database: 'employeeDB',
});

const query1 = 'SELECT * FROM employee'; //Selects all employees

const start = () => {
    inquirer
        .prompt([
            {
                name: 'main',
                type: 'list',
                message: 'Welcome to Employee Tracker. Choose From Below:',
                choices: ['Exit App', 'View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Title', 'Update Employee Manager', 'View All Titles']
            }
        ]).then((res) => {
            switch (res.main) {
                case 'Exit App':
                    console.log(`Thank you for using Employee Finder. Peace out! ⁣⁣
                    ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
                    ☁️ ☁️ ❤️ ❤️ ☁️ ❤️ ❤️ ☁️ ☁️
                    ☁️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ☁️
                    ☁️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ☁️
                    ☁️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ☁️
                    ☁️ ☁️ ❤️ ❤️ ❤️ ❤️ ❤️ ☁️ ☁️
                    ☁️ ☁️ ☁️ ❤️ ❤️ ❤️ ☁️ ☁️ ☁️
                    ☁️ ☁️ ☁️ ☁️ ❤️ ☁️ ☁️ ☁️ ☁️
                    ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️`)
                    connection.end();
                    break;
                            case 'View All Employees':
                                viewAll();
                                break;
                                        case 'View All Employees by Department':
                                            day = "Tuesday";
                                            break;
                                                    case 'View All Employees by Manager':
                                                        day = "Wednesday";
                                                        break;
                                                                case 'Add Employee':
                                                                    day = "Thursday";
                                                                    break;
                case 'Remove Employee':
                    day = "Friday";
                    break;
                case 'Update Employee Title':
                    day = "Saturday";
                    break;
                case 'Update Employee Manager':
                    day = "Saturday";
                    break;
                case 'View All Titles':
                    day = "Saturday";
            }
        })

}

//The function below is to exit back to the main menu if the user wishes to
const exitSelection = () => {inquirer.prompt([{name: 'exit',type: 'confirm',message: 'For Main Menu Press Enter'}]).then((res) => { (res.exit) ? start() : start() })}

function viewAll() {
    connection.query(query1, (err, res) => { if (err) throw err; console.table(res); exitSelection() })
}

































connection.connect((err) => {
    if (err) throw err;
    console.log(`     _____  _____  _____  _____  _____  _____  _____  _____  _____  _____  _____  _____ 
    (_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)
     _    _______  _______  _______  _        _______  _       _  _______ _______     _ 
    ( )  (  ____/ (       )(  ____ )( |      (  ___  )| |_   _| |(  ____|(  ____/    ( )
    | |  | (      | () () || (    )|| (      | (   ) ||_  | |  _|| (     | (         | |
    (_)  | (__    | || || || (____)|| |      | |   | |  | |_| |  | (__   | (__       (_)
     _   |  __)   | |(_)| ||  _____)| |      | |   | |  |_   _|  |  __)  |  __)       _ 
    ( )  | (      | |   | || (      | |      | |   | |    | |    | (     | (         ( )
    | |  | (_____ | )   ( || )      | (_____ | (___) |    | |    | (____ | (_____    | |
    (_)  (_______/|_|   |_||/       (_______/(_______)    |_|    (______|(_______/   (_)
     _              _______  _______  _         _______   _______  _______            _ 
    ( )            (  ____/ |__   __|| |_   /| |  __   | (  ____/ (  ____ )          ( )
    | |            | (         ) (   |   | / | | /  |  | | (      | (    )|          | |
    (_)            | (__       | |   |   |_/ | | |   ) | | (__    | (____)|          (_)
     _             |  __)      | |   | |_    | | |   | | |  __)   |  _ ___)           _ 
    ( )            | (         | |   | | |   | | |   ) | | (      | | |              ( )
    | |            | )       __) (__ | | |_  | | (__/  / | (_____ | | |____          | |
    (_)            |/       |_______||_|   |_| |______/  (_______/|_| |___/          (_)
     _____  _____  _____  _____  _____  _____  _____  _____  _____  _____  _____  _____ 
    (_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)
    `);
    start();
});
