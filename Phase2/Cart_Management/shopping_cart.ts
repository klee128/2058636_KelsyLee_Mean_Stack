// //Product properties include: productName, productCost, quantity
interface Product {
    productName: string;
    productCost: number;
    quantity: number;
}
// // sum up quantity of all products in productArray
function displayCartSize() {
    //retrieve productArray from session storage
    let productArray = JSON.parse(sessionStorage.getItem('productArray') || "");
    let totalProducts = 0;
    for (let product of productArray) {
        totalProducts += product.quantity;
    }
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
    
}

// // display products that users can add to cart
function displayProducts() {
    console.log("do the display");
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

        let stringed = JSON.stringify(productArray);
        window.sessionStorage.setItem('productArray', stringed);   
        console.log("fresh made productArray: " + stringed);
    }

    //by here, assume that productArray exists in sessionStorage
    const productArray = JSON.parse(window.sessionStorage.getItem('productArray') || "");

    //display the products using values that were stored in sessionStorage
    for (let product of productArray) {
        console.log('product is ' + product.productName); //delte

        //in grid format, display product name, price, and quantity
        let coldiv = document.createElement('div');
        coldiv.className = 'col-3';
        coldiv.style.cssText = 'border:1px solid black;';
        coldiv.innerHTML = "<h5>Product Name: " + product.productName +
            " </h5> <br> <h5> Price: " + product.productCost +
            " </h5> <br> <h5> Quantity:" + product.quantity + " </h5>";

        // create and add button to the product display
        let addButton = document.createElement('button');
        addButton.innerText = "Add";
        addButton.addEventListener('click', (e) => {
            addToCart(product.productName); //on click, do addToCart function
            displayCartSize();
        });
        coldiv.appendChild(addButton);

        // add new product to shopping cart display
        document.getElementById("rows")?.appendChild(coldiv);
    }
};

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


// //event handlers
document.body.onload = function () {
    //dynamically display cart size and products(can add more if needed)
    displayCartSize();
    displayProducts();
}
// // setInterval(displayProducts, 1000);


// // function for checkout.html
// function displayCheckoutTable() {
//     let productArray = JSON.parse(sessionStorage.getItem('productArray') || "");
//     console.log("on load display checkout");
//     let table = document.createElement('table');
//     table.className = "table";
//     table.innerHTML = '<thead class="thead-dark table-bordered"> <tr> ' + 
//          '<th> Product Name </th> <th>Price</th> <th>Quantity</th> <th>Total Price</th>' + 
//          ' </tr>  </thead>';
    

//     let body = document.createElement('tbody');
//     for (let product of productArray) {
//         console.log(product.productName);
//         let trow = document.createElement('tr');
//         trow.innerHTML = "<td>" + product.productName + "</td>" +
//             "<td>" + product.productCost + "</td>" +
//             "<td>" + product.quantity + "</td>" + 
//             "<td>" + product.productCost * product.quantity + "</td>";
//         body.appendChild(trow);
//     }
//     table.appendChild(body);
//     document.getElementById("insertTable")?.appendChild(table);
//     // document.getElementById('insertTable')?.appendChild(body);
// }

// window.onload = function () {
//     displayCheckoutTable();
// }