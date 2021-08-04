
//create an empty array that will hold the budget information
//push that into the storage for now
function initializeArray() {
    let obj = new Object();
    obj.bArray = [];
    let objString = JSON.stringify(obj);    //convert object into json string
    localStorage.setItem("stringifiedArray", objString);  //push json string into storage
    console.log("pushed empty array into storage");
    console.log(objString);
}
initializeArray();



//in localStorage: key: stringified version of the array of budget info
// localStorage.getItem("key") --> stringified version of the array of budget info
//stringified version of the array of budget info --> back into json format
//add the new budget info into the json array
//stringify the updated array
//put back into localStorage under the same key
function addBudgetInfo() {
   
    //get item from storage and parse it back into a JSON object
    let budgeObj = localStorage.getItem("stringifiedArray");
    let budgeJson = JSON.parse(budgeObj);       //turn json string into json object
    console.log("budgets are " + budgeJson);

    //push new budget info into bArray --> stringify the JSON object --> put back into storage
    let budInfo = new Object();
    budInfo.clientName = document.getElementById("clientName").value;
    budInfo.projectName = document.getElementById("projectName").value;
    budInfo.budget = document.getElementById("budget").value;
    
    budgeJson["bArray"].push(budInfo);
    let updatedBudget = JSON.stringify(budgeJson);
    localStorage.setItem("stringifiedArray", updatedBudget);
    console.log(updatedBudget);
    
    //reset the text field
    document.getElementById("clientName").value = "";
    document.getElementById("projectName").value = "";
    document.getElementById("budget").value = "";
}
addBudgetInfo();