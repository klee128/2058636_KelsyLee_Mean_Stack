function displayBudgetTable() {
    //get key-value pair from session storage and make it into a JSON object
    let budgeObj = localStorage.getItem("stringifiedArray");
    let budgeJson = JSON.parse(budgeObj);

    //display budget information in table format
    let tableHeader = "<table border=1> <tr> <td>Client Name</td> <td>Project Name</td> <td>Budget</td> </tr>"
    let tableRow = "";
    let runningTotal = 0;
    for (let i = 0; i < budgeJson["bArray"].length; i++){
        tableRow = tableRow + "<tr> <td>" + budgeJson["bArray"][i].clientName + "</td>" + "<td>" +
            budgeJson["bArray"][i].projectName + "</td>" + "<td>" + budgeJson["bArray"][i].budget + "</td> </tr>";
        runningTotal = runningTotal + parseInt(budgeJson["bArray"][i].budget);
    }
    let totalRow = "<tr> <td>Total</td> <td></td> <td>" + runningTotal + "</td> </tr>";
    let tableFooter = "</table>";

    let tableContent = tableHeader + tableRow + totalRow + tableFooter;
    document.getElementById("table").innerHTML = tableContent;
    
}
// execute the script after the page loads
window.onload = function () {
    displayBudgetTable();
}
