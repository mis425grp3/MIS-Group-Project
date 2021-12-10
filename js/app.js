// Handle the sessionStorage
let cartObj = undefined;
while (cartObj == undefined) {
    cartObj = sessionStorage.getItem('papaGCart');
    if (cartObj == undefined) {
        console.log("New browser session, creating cart parent object")
        // The cartObj didn't exist, must be a new instance - create a new parent obj
        let papaGCart = {
            "objId": '5246673658',
            "contentArray": []
        }
        // Send the parent obj to the sessionStorage and attempt to retrieve it again
        sessionStorage.setItem('papaGCart', JSON.stringify(papaGCart));
        cartObj = sessionStorage.getItem('papaGCart');
    }
}


// Handle the submit button functionality
let addToCartFormNode = document.getElementById('orderForm');
addToCartFormNode.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log("Add to cart button was pressed by the user")
    // Get user input on specialty pizza selections
    let formSpecialtyPizza = document.getElementById("specialtyPizza").value;
    let formSpecialtyPizzaQty = document.getElementById("qty").value;

    // Get user input on sauce selections for the pizza building option
    let formCustomPizzaTSauceBool = document.getElementById("tSauce").value;
    let formCustomPizzaBSauceBool = document.getElementById("bSauce").value;
    let formCustomPizzaWSauceBool = document.getElementById("wSauce").value;
    let formCustomSauceArray = [formCustomPizzaTSauceBool, formCustomPizzaBSauceBool, formCustomPizzaWSauceBool];
    let formCustomSauceSelection = "";

    // Get user input on topping selections
    let formCustomPizzaPepTopBool = document.getElementById('pepperoni').value;
    let formCustomPizzaSauTopBool = document.getElementById('sausage').value;
    let formCustomPizzaMeaTopBool = document.getElementById('meatballs').value;
    let formCustomPizzaMusTopBool = document.getElementById('mushroom').value;
    let formCustomPizzaSpiTopBool = document.getElementById('spinach').value;
    let formCustomToppingArray = [formCustomPizzaPepTopBool, formCustomPizzaSauTopBool, formCustomPizzaMeaTopBool, formCustomPizzaMusTopBool, formCustomPizzaSpiTopBool];

    // Get user input on topper selections
    let formCustomPizzaHotTprBool = document.getElementById('hotSauce').value;
    let formCustomPizzaBasTprBool = document.getElementById('basil').value;
    let formCustomPizzaOreTprBool = document.getElementById('oregano').value;
    let formCustomTopperArray = [formCustomPizzaHotTprBool, formCustomPizzaBasTprBool, formCustomPizzaOreTprBool];

    // Get user input on custom pizza quantity
    let formCustomPizzaQty = document.getElementById('qty_custom').value;

    // TODO: Data Validation
    let submissionType = 'specialty';
    // if (formSpecialtyPizza != undefined || formSpecialtyPizzaQty != undefined) {
    //
    // }

    // Create the object to be passed to sessionStorage
    let cartAddObj = undefined;
    if (submissionType == 'specialty') {
        // This is a specialty pizza
        cartAddObj = {
            itemType: submissionType,
            itemQty: formSpecialtyPizzaQty,
            pizzaType: formSpecialtyPizza
        }
    } else {
        // This is a custom pizza
        cartAddObj = {
            itemType: submissionType,
            itemQty: formCustomPizzaQty,
            sauceType: formCustomSauceSelection,
            toppingArray: formCustomToppingArray,
            topperArray: formCustomTopperArray
        }
    }
    // Get the current cart contentArray from sessionStorage
    cartObj = JSON.parse(sessionStorage.getItem('papaGCart'));
    // Append the new cart item into the contentArray
    cartObj.contentArray.push(cartAddObj)
    // Update the value of the cartObj in the sessionStorage
    sessionStorage.setItem('papaGCart', JSON.stringify(cartObj));


    // POST SET TEST
    console.log("Operation complete, attempting to load data")
    // Get the current cart contentArray from sessionStorage
    cartObj = JSON.parse(sessionStorage.getItem('papaGCart'));
    console.log(cartObj)
})


