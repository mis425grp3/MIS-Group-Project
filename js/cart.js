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
let table = document.getElementById('cart-table');

for (const listItem in cartContentsObjArray) {
    // Get the cart item details
    let listItemProductImg = './images/blankPizza.png';
    let listItemName = 'A special pizza';
    let listItemToppings = 'Special toppings';
    let listItemQty = '0';
    let listItemPrice = '0.00';
    let listItemSum = '0.00';

    let newRow = table.insertRow(table.rows.length)
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
        "                    <td>\n" +
        "                        <div class=\"button-container\">\n" +
        "                            <button class=\"cart-qty-plus\" type=\"button\" value=\"+\">+</button>\n" +
        "                            <input type=\"text\" name=\"qty\" min=\"0\" class=\"qty form-control\" value=\""+listItemQty+"\">+</button>\n" +
        "                            <button class=\"cart-qty-minus\" type=\"button\" value=\"-\">-</button>\n" +
        "                        </div>\n" +
        "                    </td>\n" +
        "                    <td>$ <span id=\"price3\" class=\"price\">"+listItemPrice+"</span></td>\n" +
        "                    <td>$ <span id=\"sum3\" class=\"sum\">"+listItemSum+"</span></td>\n" +
        "                </tr>"
    console.log("Inserted row?")
}