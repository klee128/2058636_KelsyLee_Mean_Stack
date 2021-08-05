//take in title + article + image url
//store info in an array of json objects
function addPost() {
    //pull the array of json strings from storage
    //if first time, is empty array, else is array of json objects
    if (document.getElementById("title").value != "" && document.getElementById("article").value != "") {
        let blogArray = JSON.parse(localStorage.getItem("blogArray") || "[]");

        //create a json object with user input and push it into the blogArray
        let newPostObj = new Object();
        newPostObj.title = document.getElementById("title").value;
        newPostObj.article = document.getElementById("article").value;
        newPostObj.imageURL = document.getElementById("imageURL").value;
        blogArray.push(newPostObj);

        //push the updated + stringified array of json objects back into storage
        localStorage.setItem("blogArray", JSON.stringify(blogArray));

        //reset the values in the textbox
        document.getElementById("title").value = "";
        document.getElementById("article").value = "";
        document.getElementById("imageURL").value = "";        
    }
}
addPost();

// if there are blog posts created, display them in a grid format
// the html tags created here will be inserted in the body of the <div class="row"> tag
function displayPost() {
    //pull array from storage
    let blogArray = JSON.parse(localStorage.getItem("blogArray") || "[]");
    let fullTags = "";
    for (let i = blogArray.length - 1; i >= 0 ; i--){
        let openTag = '<div class="blogBox col-3">';
        let imageTag = '<img class="img-thumbnail" style="width:fit-content;" src="' + blogArray[i].imageURL + '" />';
        let titleTag = '<h4 style="word-wrap: normal;">' + blogArray[i].title + '</h4>';
        let articleTag = '<h6 style="word-wrap: normal;">' + blogArray[i].article + '</h6>';
        let closeTag = '</div>';
        fullTags += openTag + imageTag + titleTag + articleTag + closeTag;
        console.log("div " + i + " is " + fullTags);
        document.getElementById("rowDiv").innerHTML = fullTags;
    }
}
displayPost();
// eventHandler, when 'Add' button is clicked, redisplay posts
const el = document.getElementById("submitButton");
el.addEventListener("click", displayPost, false);