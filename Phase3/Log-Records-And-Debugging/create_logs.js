let readline = require('readline-sync');
let fs = require('fs');
debugger;


// function that takes in first name, last name, and email from user input
// 
function createLog() {
    debugger;
    let fName = readline.question("Enter your first name: ", {defaultInput: 'John'});
    let lName = readline.question("Enter your last name: ", {defaultInput: 'Smith'});
    let email = readline.questionEMail("Enter your email: ", {defaultInput: 'jSmith@mail.com'});
    
    if (fs.existsSync('logs.json')) {
        // logs.json buffer -> string -> array
        let logsArray = JSON.parse(fs.readFileSync('logs.json').toString());
        
        logsArray.push({
            firstName: fName,
            lastName: lName,
            email: email,
            timestamp: new Date()
        });
        
        fs.writeFileSync("logs.json", JSON.stringify(logsArray));

    } else {
        debugger;
        fs.writeFileSync("logs.json", JSON.stringify([{
            firstName: fName,
            lastName: lName,
            email: email,
            timestamp: new Date()
        }]));
        
    }
}

createLog();