const inquirer = require('inquirer');//Node Library to utilize user input through the terminal
const mysql = require('mysql');//Node Library to connect to a MySQL database


const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // ***IMPORTANT***     Be sure to update with your own MySQL password!       ***IMPORTANT***
    password: 'hello',
    database: 'employeeDB'
});

const query1 = 'SELECT * FROM employee'; //Selects all employees
const query2 = 'SELECT Department FROM employee GROUP BY Department HAVING count(*) >= 1 ORDER BY Department ASC';//Selects all the departments in alphabetical order from top(A) to bottom(Z)
const query3 = 'SELECT * FROM employee WHERE Department =?';//Selects all employees by department
const query4 = 'SELECT Manager FROM employee GROUP BY Manager HAVING count(*) >= 1 ORDER BY Manager ASC';//Selects all the managers in alphabetical order from top(A) to bottom(Z)
const query5 = 'SELECT * FROM employee WHERE Manager =?';//Selects all employees that have the same manager
const query6 = 'INSERT INTO employee SET ?';//Adds a row for a new employee when information is provided
const query7 = 'DELETE FROM employee WHERE Id=?';//Deletes an employee based on their ID number
const query8 = 'UPDATE employee SET Title=? WHERE Id=?';//Updates an employee's title based on their ID
const query9 = 'UPDATE employee SET Manager=? WHERE Id=?';//Updates an employee's manager based on their ID
const query10 = 'SELECT Title FROM employee GROUP BY Title HAVING count(*) >= 1 ORDER BY Title ASC';//Selects all the employee titles in alphabetical order from top(A) to bottom(Z)

//Function that provides the users with all of the options of what the app can do
const start = () => {
    inquirer.prompt([{ name: 'main', type: 'list', message: 'Howdy! Choose From Below:', choices: ['Exit App', 'View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Title', 'Update Employee Manager', 'View All Titles'] }
    ]).then((res) => {
        switch (res.main) {
            case 'Exit App': console.log(`Thank you for using Employee Finder. Peace out! ⁣⁣
                    ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
                    ☁️ ☁️ ❤️ ❤️ ☁️ ❤️ ❤️ ☁️ ☁️
                    ☁️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ☁️
                    ☁️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ☁️
                    ☁️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ☁️
                    ☁️ ☁️ ❤️ ❤️ ❤️ ❤️ ❤️ ☁️ ☁️
                    ☁️ ☁️ ☁️ ❤️ ❤️ ❤️ ☁️ ☁️ ☁️
                    ☁️ ☁️ ☁️ ☁️ ❤️ ☁️ ☁️ ☁️ ☁️
                    ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️`); connection.end(); break;

            case 'View All Employees': viewAll(); break;

            case 'View All Employees by Department': connection.query(query2, (err, res) => { if (err) throw err; console.table(res); viewAllByDept() }); break;

            case 'View All Employees by Manager': connection.query(query4, (err, res) => { if (err) throw err; console.table(res); viewAllByManager() }); break;

            case 'Add Employee': addEmployee(); break;

            case 'Remove Employee': connection.query(query1, (err, res) => { if (err) throw err; console.table(res); removeEmployee() }); break;

            case 'Update Employee Title': connection.query(query1, (err, res) => { if (err) throw err; console.table(res); updateEmployeeTitle()}); break;

            case 'Update Employee Manager': connection.query(query1, (err, res) => { if (err) throw err; console.table(res); updateEmployeeManager()}); break;

            case 'View All Titles': viewTitles();
        }
    })
}

//The function below is to exit back to the main menu if the user wishes to
const exitSelection = () => { inquirer.prompt([{ name: 'exit', type: 'confirm', message: 'For Main Menu Press Enter'}]).then((res) => { (res.exit) ? start() : start() }) }

//To view all employees
function viewAll() { connection.query(query1, (err, res) => {if (err) throw err; console.table(res); exitSelection()}) }

//To view employees by their departments
function viewAllByDept() {
    inquirer.prompt({ name: 'dept', type: 'input', message: 'Choose a Department:'}
    ).then((ans) => {
        connection.query(query3, [ans.dept], (err, res) => {
            if (err) throw err; (res != 0) ? console.table(res) : console.log('Department Not Found, Look Closely And Try Again.'); exitSelection() })
    })}

//To view employees based on the managers they have
function viewAllByManager() {
    inquirer.prompt({ name: 'mang', type: 'input', message: 'Choose a Manager From Above To See Their Employees:'}
    ).then((ans) => {
        connection.query(query5, [ans.mang], (err, res) => {
            if (err) throw err; (res != 0) ? console.table(res) : console.log('Manager Not Found, Look Closely And Try Again.'); exitSelection() })
    })}

//To add a new employee
function addEmployee() {
    inquirer.prompt([{ name: 'first', type: 'input', message: 'Enter First Name: '}, { name: 'last', type: 'input', message: 'Enter Last Name: ' }, { name: 'title', type: 'input', message: 'Enter Employee Title/Position: ' }, { name: 'department', type: 'input', message: 'Enter Employee Department: ' }, { name: 'sal', type: 'number', message: 'Enter Employee Salary: ' }, { name: 'manage', type: 'input', message: 'Enter Employee Manager: ' }]
    ).then((newE) => {
        connection.query(query6, {First_Name: newE.first||'None', Last_Name: newE.last||'None', Title: newE.title||'None', Department: newE.department||'None', Salary: newE.sal||'None', Manager: newE.manage||'None' }, (err, res) => {
            if (err) throw err; (res) ? console.log(`${newE.first} ${newE.last} was successfully added`) : console.log('An Error Ocurred, Try Again.'); exitSelection() })
    })}

//To remove an existing employee
function removeEmployee() {
    inquirer.prompt([{ name: 'del', type: 'number', message: 'Enter ID of Employee to Delete: '}]
    ).then((res) => {
        connection.query(query7, [res.del||0], (err, res) => {
            if (err) throw err; console.log('Success') ; exitSelection() })
    })}

//To update an employee's title, employee is selected by the user by inputting the employee's ID
function updateEmployeeTitle(){
    inquirer.prompt([{ name: 'idupdate', type: 'number', message: 'Enter ID of Employee to Update Their Title: '},{ name: 'updatecontent', type: 'input', message: 'Enter New Title: ',validate(value){if(value===''){return 'Please Enter a Title. Type `None` If No Title Is Desired.'}return true} }]
    ).then((res) => {
        connection.query(query8, [res.updatecontent,res.idupdate||0], (err, res) => {
            if (err) throw err; console.log('Success')  ; exitSelection() })
    })}

//To update an employee's manager, employee is selected by the user by inputting the employee's ID
function updateEmployeeManager(){
    inquirer.prompt([{ name: 'idupdate2', type: 'number', message: 'Enter ID of Employee to Update Their Manager: '},{ name: 'updatecontent2', type: 'input', message: 'Enter New Manager: ',validate(value){if(value===''){return 'Please Enter a Manager Name. Type `None` If No Manager Is Desired.'}return true}}]
    ).then((res) => {
        connection.query(query9, [res.updatecontent2,res.idupdate2||0], (err, res) => {
            if (err) throw err; console.log('Success')  ; exitSelection() })
    })}

//To view all of the employee titles 
function viewTitles() { connection.query(query10, (err, res) => {if (err) throw err; console.table(res); exitSelection()}) }

//To launch application when user types `node start` in their terminal
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
