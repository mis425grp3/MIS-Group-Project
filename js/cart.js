function getSessionStorageData() {
    const cartObj = JSON.parse(sessionStorage.getItem('papaGCart'));
    if (cartObj === null || cartObj === undefined) {
        window.location.replace("/order.html");
        alert("The shopping cart is empty, redirecting...")
    } else if (cartObj.contentArray.length === 0) {
        window.location.replace("/order.html");
        alert("The shopping cart is empty, redirecting...")
    }
}

getSessionStorageData()