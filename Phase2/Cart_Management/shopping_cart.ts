// //Product properties include: productName, productCost, quantity
interface Product {
    productName: string;
    productCost: number;
    quantity: number;
}

// display products that users can add to cart
function displayProducts() {
    // if first time opening/no productArray stored in sessionStorage, initialize the values 
    if (window.sessionStorage.getItem('productArray') == null) {
        // initialize some Products
        let camera: Product = { productName: 'Camera', productCost: 600, quantity: 0 };
        let flower: Product = { productName: 'Flowers', productCost: 20, quantity: 0 };
        let laptop: Product = { productName: 'Laptop', productCost: 5000, quantity: 0 };
        let milktea: Product = { productName: 'Milk Tea', productCost: 5, quantity: 0 };
        let pizza: Product = { productName: 'Pizza', productCost: 10, quantity: 0 };
        let washer: Product = { productName: 'Washer', productCost: 300, quantity: 0 };
        let productArray: Array<Object> = new Array();
        productArray.push(camera, flower, laptop, milktea, pizza, washer);

        window.sessionStorage.setItem('productArray', JSON.stringify(productArray));
    }

    //by here, assume that productArray exists in sessionStorage
    const productArray = JSON.parse(window.sessionStorage.getItem('productArray') || "");

    //empty product display from grid
    let rowTag = document.getElementById('rows');
    while (rowTag?.firstChild) {
        rowTag.removeChild(rowTag.firstChild);
    }

    let totalProducts = 0;
    //display the products on grid
    for (let product of productArray) {
        totalProducts += product.quantity;  //keep track of count size

        //in grid format, display product name, price, and quantity
        let coldiv = document.createElement('div');
        coldiv.className = 'col-3';
        coldiv.id = 'columns';
        coldiv.style.cssText = 'border:1px solid black;';
        coldiv.innerHTML = "<h5>Product Name: " + product.productName +
            " </h5> <br> <h5> Price: " + product.productCost +
            " </h5> <br> <h5> Quantity: " + product.quantity + " </h5>";

        // create Add button to the product display
        let addButton = document.createElement('button');
        addButton.innerText = "Add";
        addButton.style.cssText = "margin:5px;";
        addButton.addEventListener('click', (e) => {
            addToCart(product.productName); //on click, do addToCart function
            displayProducts();
        });
        coldiv.appendChild(addButton);

        //create Delete button to product display
        let deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.style.cssText = "margin:5px;";
        deleteButton.addEventListener('click', (e) => {
            deleteFromCart(product.productName);
            displayProducts();
        });
        coldiv.appendChild(deleteButton);

        // add product info to the grid
        document.getElementById("rows")?.appendChild(coldiv);
    }   //end for loop

    //display cart size
    let totalTag = document.createElement('h3');
    totalTag.id = 'totalTag'
    totalTag.innerHTML = "Cart Size: " + totalProducts;
    // create or update cart size tag
    if (!!document.getElementById('totalTag')) {
        let existingTag = document.getElementById('totalTag') || document.createElement("h3");
        document.getElementById('cartSize')?.replaceChild(totalTag, existingTag);
    } else {
        document.getElementById('cartSize')?.appendChild(totalTag);
    }
};

// given a product name, find it in the array and increment the quantity
function addToCart(pName: string) {
    const productArray = JSON.parse(window.sessionStorage.getItem('productArray') || "");
    
    // given an Product object, it checks if the product name matches the product clicked
    function findName(product:Product) {
        return product.productName == pName;
    }
    //Array.find(): for every Product in productArray, the productName is passed to findName()
    //if the productName matches pName (from the button clicked), it will return the Product 
    productArray.find(findName).quantity += 1;      //find the appropriate Product and increment quantity
    window.sessionStorage.setItem('productArray', JSON.stringify(productArray));

}

function deleteFromCart(pName: string) {
    const productArray = JSON.parse(window.sessionStorage.getItem('productArray') || "");

    function findName(product: Product) {
        return product.productName == pName;
    }

    if (productArray.find(findName).quantity > 0) {
        productArray.find(findName).quantity -= 1;
        window.sessionStorage.setItem('productArray', JSON.stringify(productArray));
    }
    

    
}


// function for checkout.html
function displayCheckoutTable() {
    let productArray = JSON.parse(sessionStorage.getItem('productArray') || "");
    // table head
    let table = document.createElement('table');
    table.className = "table table-striped";
    table.innerHTML = '<thead class="thead-dark table-bordered "> <tr> ' + 
         '<th> Product Name </th> <th>Price Per Quantity</th> <th>Quantity</th> <th>Total Price</th>' + 
         ' </tr>  </thead>';
    
    // table body
    let totalQ = 0;
    let totalC = 0;
    let body = document.createElement('tbody');
    for (let product of productArray) {
        totalQ += product.quantity;
        totalC += product.quantity * product.productCost;
        let trow = document.createElement('tr');
        trow.innerHTML = "<td>" + product.productName + "</td>" +
            "<td> $" + product.productCost + "</td>" +
            "<td>" + product.quantity + "</td>" + 
            "<td> $" + product.productCost * product.quantity + "</td>";
        body.appendChild(trow);
    }
    let sumRow = document.createElement('tr');
    sumRow.className = "table-secondary";
    sumRow.innerHTML = "<td>" + "Total Cost" + "</td>" +
        "<td></td>" +
        "<td>" + totalQ + "</td>" +
        "<td> $" + totalC + "</td>";
    body.appendChild(sumRow);

    // append <tbody/> to <table/>
    table.appendChild(body);
    document.getElementById("insertTable")?.appendChild(table);
}
