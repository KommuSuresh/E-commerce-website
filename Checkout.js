document.addEventListener("DOMContentLoaded", () => {
    // Retrieve all keys from local storage
    const keys = Object.keys(localStorage);

    // Filter out the clickedCardDetails key
    const filteredKeys = keys.filter(key =>( key !== "clickedCardDetails" && key !== "totalItemsincart"));

    // Initialize totalQuantity and Amount to 0
    let totalQuantity = 0;
    let Amount = 0;

    // Accumulate HTML for each item
    let allItemsHTML = "";

    // Iterate through each key and retrieve the corresponding value
    filteredKeys.forEach((productId) => {
        const updatedData = JSON.parse(localStorage.getItem(productId));

        if (updatedData) {
            // Calculate the total amount for each item
            const totalItemAmount = updatedData.price * updatedData.quantity;

            // Accumulate HTML for all items, including the total amount for each item
            allItemsHTML += getingdata(updatedData, totalItemAmount);

            // Accumulate the total quantity for each item
            totalQuantity += updatedData.quantity;

            // Accumulate the total amount for Amount
            Amount += totalItemAmount;
        }
    });

    // Set the accumulated HTML for all items to the "product" element
    document.getElementById("product").innerHTML = allItemsHTML;

    // Display the total quantity and Amount in separate elements
    const totalQuantityElement = document.getElementById("Obj_count");
    totalQuantityElement.textContent = `${totalQuantity}`;

    const totalitemsElement = document.getElementById("Total_items");
    totalitemsElement.textContent = `${totalQuantity}`;

    const AmountElement = document.getElementById("Amount");
    AmountElement.textContent = `${Amount}`;

    let obj_count = document.getElementById("Obj_count");
    let totalItemsInCart = localStorage.getItem("totalItemsincart");
    obj_count.textContent = totalItemsInCart;
    
    if (parseInt(totalItemsInCart) === 0) {
      obj_count.textContent = "0";
    }
  
});

// The getingdata function now takes an additional parameter for total amount
function getingdata(updatedData, totalItemAmount) {
    return `
        <div class="side">
            <div>
                <img class="img-size" src="${updatedData.preview}">
            </div>
            <div class="left-side-margin">
                <h1 class="titile-hedaing">${updatedData.name}</h1>
                <h1 class="QuantityEl">Quantity. <span id="Quantity">${updatedData.quantity}</span></h1>
                <h1 class="AmountEl"> Amount. Rs <span class="amount">${updatedData.price}</span></h1>
            </div>
        </div>
    `;
}

document.getElementById("cartBtn").addEventListener("click", function(event) {
    // Clear local storage when "Place Order" is clicked
    localStorage.clear();
});
