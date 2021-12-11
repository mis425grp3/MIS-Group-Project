function getSessionStorageData() {
    const cartObj = JSON.parse(sessionStorage.getItem('papaGCart'));
    if (cartObj === null || cartObj === undefined) {
        // window.location.replace("/order.html");
        alert("The shopping cart is empty, redirecting...")
    } else if (cartObj.contentArray.length === 0) {
        // window.location.replace("/order.html");
        alert("The shopping cart is empty, redirecting...")
    } else {
        return cartObj.contentArray
    }
}

const cartContentsObjArray = getSessionStorageData();
let table = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
let tableFooter = document.getElementById('cart-table').getElementsByTagName('tfoot')[0];
let orderTotal = 0.00

for (const listItem of cartContentsObjArray) {
    // Initialize shared variables
    let pizzaImageObj = {
            "Buffalo Chicken Pizza": "images/blPizza.png",
            "Meat Lover's Pizza": "images/mlPizza.png",
            "Baked Ziti Pizza": "images/bzPizza.png",
            "Chicken Parmesan Pizza": "images/cpPizza.png",
            "Build Your Own": "images/byoPizza.png"
        }
    let listItemProductImg = './images/blankPizza.png';
    let listItemName;
    let listItemToppings;
    let listItemQty;
    let listItemPrice;
    let listItemSum;
    console.log("Attempting to render page")
    console.log(listItem)
    // Get the cart item details
    if (listItem.itemType == 'specialty') {
        listItemName = listItem['pizzaType'];
        console.log(listItemName);
        listItemProductImg = pizzaImageObj[listItem['pizzaType']];
        console.log(pizzaImageObj[listItem['pizzaType']]);
        console.log(listItemProductImg);
        listItemToppings = "N/A - Specialty Pizza"
        listItemQty = listItem['itemQty'];
        listItemPrice = "12.75"
        listItemSum = (12.75 * parseInt(listItemQty)).toFixed(2)
    } else {
        // Determine the name
        listItemName = "Custom w/" + listItem['sauceType'];
        // Get a string containing every topping
        let toppingString = "";
        let toppingDict = ["Pepperoni", "Sausage", "Meatballs", "Mushroom", "Spinach"]
        let topperDict = ["Hot Sauce Drizzle", "Basil Leaves", "Oregano"]
        for ([index, toppingItem] of listItem['toppingArray'].entries())
            if (toppingItem === true) {
                toppingString += toppingDict[index] + ', '
            }
        for ([index, toppingItem] of listItem['topperArray'].entries())
            if (toppingItem === true) {
                toppingString += topperDict[index] + ', '
            }
        if (toppingString === "") {
            // No toppings were selected
            toppingString = "None Selected"
        }

        toppingString = toppingString.substring(0, toppingString.length - 2);
        listItemToppings = toppingString;
        listItemQty = listItem['itemQty'];
        listItemPrice = "13.75"
        listItemSum = (13.75 * parseInt(listItemQty)).toFixed(2)
    }

    // Add the listItemSum to the order total 
    orderTotal += (13.75 * parseInt(listItemQty))

    let newRow = table.insertRow(table.rows.length);
    // This is a HIDEOUS solution to a simple problem but we ran out of time and it works
    newRow.innerHTML = "<tr>\n" +
        "                    <td>\n" +
        "                        <div class=\"product-img\">\n" +
        "                            <div class=\"img-prdct\">\n" +
        "                                <img src=" + listItemProductImg + " width=\"100px\">\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </td>\n" +
        "                    <td>\n" +
        "                        <p>" + listItemName + "</p>\n" +
        "                    </td>\n" +
        "                    <td>\n" +
        "                        <p>" + listItemToppings + "</p>\n" +
        "                    </td>\n" +
        "                    <td><span id=\"quantity\" class=\"qty\">" + listItemQty + "</span></td>\n" +
        "                    <td>$ <span id=\"price\" class=\"price\">" + listItemPrice + "</span></td>\n" +
        "                    <td>$ <span id=\"sum\" class=\"sum\">" + listItemSum + "</span></td>\n" +
        "                </tr>"

    // Populate the table footer
    let newFootRow = tableFooter.insertRow(0);
    newFootRow.innerHTML = "                <tr>\n" +
        "                    <td colspan=\"5\"></td>\n" +
        "                    <td>\n" +
        "                        <strong>TOTAL: $<span id=\"cart-total\">" + orderTotal.toFixed(2) + "</span>\n" +
        "                        </strong>\n" +
        "                    </td>\n" +
        "                </tr>"
}