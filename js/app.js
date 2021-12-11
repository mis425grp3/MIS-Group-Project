// Handle the sessionStorage
let cartObj = undefined;
while (
    cartObj === undefined) {
    cartObj = sessionStorage.getItem('papaGCart');
    if (cartObj === undefined) {
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
    let formCustomPizzaTSauceBool = document.getElementById("tSauce").checked;
    let formCustomPizzaBSauceBool = document.getElementById("bSauce").checked;
    let formCustomPizzaWSauceBool = document.getElementById("wSauce").checked;
    const formCustomSauceArray = [formCustomPizzaTSauceBool, formCustomPizzaBSauceBool, formCustomPizzaWSauceBool];
    let formCustomSauceSelection = "";

    // Get user input on topping selections
    let formCustomPizzaPepTopBool = document.getElementById('pepperoni').checked;
    let formCustomPizzaSauTopBool = document.getElementById('sausage').checked;
    let formCustomPizzaMeaTopBool = document.getElementById('meatballs').checked;
    let formCustomPizzaMusTopBool = document.getElementById('mushroom').checked;
    let formCustomPizzaSpiTopBool = document.getElementById('spinach').checked;
    const formCustomToppingArray = [formCustomPizzaPepTopBool, formCustomPizzaSauTopBool, formCustomPizzaMeaTopBool, formCustomPizzaMusTopBool, formCustomPizzaSpiTopBool];

    // Get user input on topper selections
    let formCustomPizzaHotTprBool = document.getElementById('hotSauce').checked;
    let formCustomPizzaBasTprBool = document.getElementById('basil').checked;
    let formCustomPizzaOreTprBool = document.getElementById('oregano').checked;
    const formCustomTopperArray = [formCustomPizzaHotTprBool, formCustomPizzaBasTprBool, formCustomPizzaOreTprBool];

    // Get user input on custom pizza quantity
    let formCustomPizzaQty = document.getElementById('qty_custom').value;

    // TODO: Data Validation
    // Check to see if anything was entered into the custom fields
    let customState = false;
    let customArrayArray = [formCustomSauceArray, formCustomToppingArray, formCustomTopperArray];
    for (const formArray of customArrayArray) {
        for (const itemBool of formArray) {
            if (itemBool === true) {
                customState = true
                break
            }
        }
        if (customState === true) {
            break
        }
    }
    if (formCustomPizzaQty !== "") {
        customState = true;
    }

    if (formSpecialtyPizza !== "" || formSpecialtyPizzaQty !== "") {
        // One of these fields was populated, so let's assume this is what they were trying to add
        let submissionType = 'specialty';
        // Make sure we've got everything we need
        if (formSpecialtyPizza === "") {
            alert('Please select a type of specialty pizza.')
            return
        } else if (formSpecialtyPizzaQty === "") {
            alert('Please select a specialty pizza quantity.')
            return
        }
    } else if (customState === true) {
        // One of these fields was populated, so let's assume this is what they were trying to add
        let submissionType = 'custom';
        // Make sure we've got everything we need
        let sauceSelectionState = false
        for (item of formCustomSauceArray) {
            if (item === true) {
                sauceSelectionState = true
            }
        }
        if (sauceSelectionState === false) {
            alert('Please select a custom pizza sauce.')
            return
        }
    } else {
        // No fields have been populated whatsoever
        alert('Please fill out the form before adding to cart.')
        return
    }

    // Create the object to be passed to sessionStorage
    let cartAddObj = undefined;
    if (submissionType === 'specialty') {
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

// Handle the empty cart button
let addToCartButtonNode = document.getElementById('empty_cart');
addToCartButtonNode.addEventListener('click', function(e) {
    // Reset the papaGCart object in the sessionStorage to it's default state
    let papaGCart = {
        "objId": '5246673658',
        "contentArray": []
    }
    sessionStorage.setItem('papaGCart', JSON.stringify(papaGCart));
    alert("The cart has been reset.")
})