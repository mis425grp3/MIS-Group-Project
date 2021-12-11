function initSession() {
    // Handle the sessionStorage
    let cartObj = undefined;
    while (
        cartObj === undefined) {
        cartObj = sessionStorage.getItem('papaGCart');
        if (cartObj === undefined || cartObj === null) {
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
}


function resetForm() {
    // This is a bad way to do this but we ran out of time and default reset methods failed
    document.getElementById("specialtyPizza").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("tSauce").checked = false;
    document.getElementById("bSauce").checked = false;;
    document.getElementById("wSauce").checked = false;;
    document.getElementById('pepperoni').checked = false;
    document.getElementById('sausage').checked = false;
    document.getElementById('meatballs').checked = false;
    document.getElementById('mushroom').checked = false;
    document.getElementById('spinach').checked = false;
    document.getElementById('hotSauce').checked = false;
    document.getElementById('basil').checked = false;
    document.getElementById('oregano').checked = false;
    document.getElementById('qty_custom').value = "";
}

initSession()

// Handle the submit button functionality
let addToCartFormNode = document.getElementById('orderForm');
addToCartFormNode.addEventListener('submit', function (e) {
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
    console.log(formCustomSauceArray)
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
    let submissionType = undefined;
    if (formSpecialtyPizza !== "" || formSpecialtyPizzaQty !== "") {
        // One of these fields was populated, so let's assume this is what they were trying to add
        submissionType = 'specialty';
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
        submissionType = 'custom';
        // Make sure we've got everything we need
        let sauceSelectionState = false
        for (const arrayItem of formCustomSauceArray) {
            if (arrayItem === true) {
                sauceSelectionState = true
            }
        }
        if (sauceSelectionState === false) {
            alert('Please select a custom pizza sauce.')
            return
        }
        if (formCustomPizzaQty === "" || formCustomPizzaQty === undefined) {
            alert('Please select a custom pizza quantity.')
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
    } else if (submissionType === 'custom') {
        // This is a custom pizza, figure out which sauce was selected
        for (const [index, sauceType] of formCustomSauceArray.entries()) {
            if (sauceType === true) {
                // This is the selected sauce - should've used an obj here instead of an array whoops (out of time)
                if (index === 0) {
                    formCustomSauceSelection = "Tomato Sauce";
                } else if (index === 1) {
                    formCustomSauceSelection = "BBQ Sauce";
                } else {
                    formCustomSauceSelection = "White Sauce";
                }
            }
        }
        cartAddObj = {
            itemType: submissionType,
            itemQty: formCustomPizzaQty,
            sauceType: formCustomSauceSelection,
            toppingArray: formCustomToppingArray,
            topperArray: formCustomTopperArray
        }
    } else {
        console.log("ERROR: No submissionType was passed?")
    }
    // Get the current cart contentArray from sessionStorage
    cartObj = JSON.parse(sessionStorage.getItem('papaGCart'));
    // Append the new cart item into the contentArray
    if (cartObj === null) {
        // The session must've failed to init on page load? Not sure why this happens
        initSession()
        cartObj = JSON.parse(sessionStorage.getItem('papaGCart'));
        console.log(cartObj)
    }
    cartObj.contentArray.push(cartAddObj)
    // Update the value of the cartObj in the sessionStorage
    sessionStorage.setItem('papaGCart', JSON.stringify(cartObj));

    // POST SET TEST
    console.log("Operation complete, attempting to load data")
    // Get the current cart contentArray from sessionStorage
    cartObj = JSON.parse(sessionStorage.getItem('papaGCart'));
    console.log(cartObj)
    alert("The item(s) have been added to your cart successfully.")
    // Reset everything in the form (Default reset methods failed for some reason)
    resetForm()
})

// Handle the empty cart button
let emptyCartButtonNode = document.getElementById('empty_cart');
emptyCartButtonNode.addEventListener('click', function (e) {
    // Reset the papaGCart object in the sessionStorage to it's default state
    let papaGCart = {
        "objId": '5246673658',
        "contentArray": []
    }
    sessionStorage.setItem('papaGCart', JSON.stringify(papaGCart));
    alert("The cart has been reset.")
})

// Handle the checkout button
let checkoutButtonNode = document.getElementById('checkout');
checkoutButtonNode.addEventListener('click', function (e) {
    // Make sure something is in the cart before sending them to the checkout
    const cartObj = JSON.parse(sessionStorage.getItem('papaGCart'));
    if (cartObj === null || cartObj === undefined) {
        alert("The shopping cart is empty, please add an item")
    } else if (cartObj.contentArray.length === 0) {
        alert("The shopping cart is empty, please add an item")
    } else {
        // Send them to the cart
        window.location.replace("/cart.html");
    }
})