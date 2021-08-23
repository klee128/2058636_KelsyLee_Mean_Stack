let readline = require('readline-sync');
let fs = require('fs');



// function that takes in first name, last name, and email from user input
// 
function createLog() {
    debugger;
    let fName = readline.question("Enter your first name: ");
    let lName = readline.question("Enter your last name: ");
    let email = readline.questionEMail("Enter your email: ");
    
    if (fs.existsSync('logs.json')) {
        console.log("file exists");
        debugger;
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
        console.log("file doesn't exist");
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