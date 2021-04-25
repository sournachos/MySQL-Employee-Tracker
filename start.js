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

connection.connect((err) => {
    if (err) throw err;
    start();
});

function start() {
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
    `)
    inquirer
        .prompt(
            {
                name:'main',
                type:'list',
                message:'Welcome to Employee Tracker. Choose From Below:',
                choices:['View All Employees','View All Employees by Department','View All Employees by Manager','Add Employee','Remove Employee','Update Employee Title','Update Employee Manager','View All Titles']
            }
        );

}

start();