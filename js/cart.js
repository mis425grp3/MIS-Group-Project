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

for (const listItem of cartContentsObjArray) {
    // Initialize shared variables
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
        listItemToppings = "N/A - Specialty Pizza"
        listItemQty = listItem['itemQty'];
        listItemPrice = "12.75"
        listItemSum = (12.75*parseInt(listItemQty)).toFixed(2)
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
        toppingString = toppingString.substring(0 ,toppingString.length -1);
        listItemToppings = toppingString;
        listItemQty = listItem['itemQty'];
        listItemPrice = "13.75"
        listItemSum = (13.75*parseInt(listItemQty)).toFixed(2)
    }

    // let listItemProductImg = './images/blankPizza.png';
    // let listItemName = 'A special pizza';
    // let listItemToppings = 'Special toppings';
    // let listItemQty = '0';
    // let listItemPrice = '0.00';
    // let listItemSum = '0.00';


    let newRow = table.insertRow(table.rows.length)
    // This is a HIDEOUS solution to a simple problem but we ran out of time and it works
    newRow.innerHTML = "<tr>\n" +
        "                    <td>\n" +
        "                        <div class=\"product-img\">\n" +
        "                            <div class=\"img-prdct\">\n" +
        "                                <img src="+listItemProductImg+" width=\"100px\">\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </td>\n" +
        "                    <td>\n" +
        "                        <p>" + listItemName + "</p>\n" +
        "                    </td>\n" +
        "                    <td>\n" +
        "                        <p>" + listItemToppings + "</p>\n" +
        "                    </td>\n" +
        "                    <td><span id=\"quantity\" class=\"qty\">"+listItemQty+"</span></td>\n" +
        "                    <td>$ <span id=\"price\" class=\"price\">"+listItemPrice+"</span></td>\n" +
        "                    <td>$ <span id=\"sum\" class=\"sum\">"+listItemSum+"</span></td>\n" +
        "                </tr>"
    console.log("Inserted row?")
}

// let ??? = [
//   {"Buffalo Chicken Pizza": "images/blPizza.png", 
//   "Meat Lover's Pizza":"images/mlPizza.png",
//   "Baked Ziti Pizza":"images/bzPizza.png","Chicken Parmesan Pizza":"images/cpPizza.png", "Build Your Own":"images/byoPizza.png"}
// ]