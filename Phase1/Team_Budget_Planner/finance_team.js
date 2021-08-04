function displayBudgetTable() {
    //get key-value pair from session storage and make it into a JSON object
    let budgeObj = localStorage.getItem("stringifiedArray");
    let budgeJson = JSON.parse(budgeObj);

    let tableHeader = "<table border=1> <tr> <td>Client Name<td/> <td>Project Name<td/> <td>Budget<td/> <tr/>"
    let tableRow = "";
    for (let i = 0; i < budgeJson["bArray"].length; i++){
        tableRow = tableRow + "<tr> <td>" + budgeJson["bArray"][i].clientName + "<td/>" + "<td>" +
            budgeJson["bArray"][i].projectName + "<td/>" + "<td>" + budgeJson["bArray"][i].budget + "<td/> <tr/>";
    }
    let tableFooter = "<table/>";

    let tableContent = tableHeader + tableRow + tableFooter;
    document.getElementById("table").innerHTML = tableContent;
    
}
// execute the script after the page loads
window.onload = function () {
    displayBudgetTable();
}
