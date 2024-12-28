let basket = JSON.parse(localStorage.getItem("data1")) || [];
console.log(basket);

// Calculate the cart amount (quantity)
let calculation = () => {
    let cartAmount = document.querySelector(".cartAmount");
    cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);

    // Calculate total bill
    let totalBill = basket.map((x) => {
        let search = shopItems.find((y) => y.id === x.id);
        return search ? x.item * parseInt(search.price.replace("$", "")) : 0;
    }).reduce((x, y) => x + y, 0);

    let totalAmount = document.querySelector(".totalAmount");
    totalAmount.innerHTML = `$${totalBill}`; // Display total bill
};

calculation();

let label = document.querySelector("#label");
let shoppingCart = document.querySelector(".shopping-cart");

// Generate the shopping cart items
let generateItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItems.find((y) => y.id === id) || [];

            return `
            <div class="cart-item">
                <img width=150 src="${search.img}" alt="" />
                <div class="details">
                    <div class="title-price">
                        <h4>${search.name}</h4>
                        <p id="priceStyle">${search.price}</p>
                        <i class="bi-x-lg" onclick="removeItem('${id}')"></i>
                    </div>
                    <div class="cart-buttons">
                        <i class="bi-dash-lg" onclick="decrement('${id}')"></i>
                        <div class="quantity">${item}</div>
                        <i class="bi-plus-lg" onclick="increment('${id}')"></i>
                    </div>
                    <h3>Total: $${item * parseInt(search.price.replace("$", ""))}</h3>
                </div>
            </div>`;
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="Home-btn">Back to home</button>
        </a>`;
    }
};

generateItems();

// Increment the quantity of an item in the cart
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem("data1", JSON.stringify(basket));
    generateItems();
    calculation();
};

// Decrement the quantity of an item in the cart
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined || search.item === 0) return;
    search.item -= 1;
    if (search.item === 0) {
        basket = basket.filter((x) => x.id !== selectedItem);
    }
    localStorage.setItem("data1", JSON.stringify(basket));
    generateItems();
    calculation();
};

// Remove an item from the cart
let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    localStorage.setItem("data1", JSON.stringify(basket));
    generateItems();
    calculation();
};

// Clear the entire cart
let clearCart = () => {
    basket = [];
    localStorage.setItem("data1", JSON.stringify(basket));
    generateItems();
    calculation();
};

// Add a "Clear Cart" button to the cart
let clearCartButton = document.createElement("button");
clearCartButton.innerText = "Clear Cart";
clearCartButton.classList.add("clear-cart-btn");
clearCartButton.onclick = clearCart;
document.querySelector(".cart-container").appendChild(clearCartButton);
