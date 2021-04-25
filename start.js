const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const mysql = require('mysql');
const { type } = require('node:os');

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
    console.log(` _____  _____  _____  _____  _____  _____  _____  _____  _____  _____  _____  _____ 
    (_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)
     _    _______  _______  _______  _        _______           _______  _______      _ 
    ( )  (  ____ \(       )(  ____ )( \      (  ___  )|\     /|(  ____ \(  ____ \    ( )
    | |  | (    \/| () () || (    )|| (      | (   ) |( \   / )| (    \/| (    \/    | |
    (_)  | (__    | || || || (____)|| |      | |   | | \ (_) / | (__    | (__        (_)
     _   |  __)   | |(_)| ||  _____)| |      | |   | |  \   /  |  __)   |  __)        _ 
    ( )  | (      | |   | || (      | |      | |   | |   ) (   | (      | (          ( )
    | |  | (____/\| )   ( || )      | (____/\| (___) |   | |   | (____/\| (____/\    | |
    (_)  (_______/|/     \||/       (_______/(_______)   \_/   (_______/(_______/    (_)
     _              _______ _________ _        ______   _______  _______              _ 
    ( )            (  ____ \\__   __/( (    /|(  __  \ (  ____ \(  ____ )            ( )
    | |            | (    \/   ) (   |  \  ( || (  \  )| (    \/| (    )|            | |
    (_)            | (__       | |   |   \ | || |   ) || (__    | (____)|            (_)
     _             |  __)      | |   | (\ \) || |   | ||  __)   |     __)             _ 
    ( )            | (         | |   | | \   || |   ) || (      | (\ (               ( )
    | |            | )      ___) (___| )  \  || (__/  )| (____/\| ) \ \__            | |
    (_)            |/       \_______/|/    )_)(______/ (_______/|/   \__/            (_)
     _____  _____  _____  _____  _____  _____  _____  _____  _____  _____  _____  _____ 
    (_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)(_____)`)
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