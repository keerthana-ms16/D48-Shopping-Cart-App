
const products = [
    { id: 1, name: "T-Shirt", price: 399, icon: "👕" },
    { id: 2, name: "Shoes", price: 899, icon: "👟" },
    { id: 3, name: "Watch", price: 599, icon: "⌚" },
    { id: 4, name: "Bag", price: 499, icon: "🎒" }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const emptyMessage = document.getElementById("empty-message");
const message = document.getElementById("message");

function displayProducts() {
    productList.innerHTML = "";

    products.forEach(function (product) {
        const card = document.createElement("div");
        card.className = "product-card";

        const icon = document.createElement("div");
        icon.className = "product-icon";
        icon.textContent = product.icon;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "Price: ₹" + product.price;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";

        button.addEventListener("click", function () {
            addToCart(product.id);
        });

        card.append(icon, name, price, button);
        productList.appendChild(card);
    });
}

function addToCart(productId) {
    const existingItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    message.textContent = "";
    displayCart();
}

function changeQuantity(productId, change) {
    const item = cart.find(function (product) {
        return product.id === productId;
    });

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeItem(productId);
            return;
        }
    }

    displayCart();
}

function removeItem(productId) {
    cart = cart.filter(function (item) {
        return item.id !== productId;
    });

    displayCart();
}

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;

    emptyMessage.style.display =
        cart.length === 0 ? "block" : "none";

    cart.forEach(function (item) {
        const product = products.find(function (p) {
            return p.id === item.id;
        });

        if (!product) {
            return;
        }

        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("div");
        row.className = "cart-row";

        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent =
            "₹" + product.price + " x " + item.quantity;

        const subtotal = document.createElement("p");
        subtotal.textContent = "Subtotal: ₹" + itemTotal;

        details.append(name, price, subtotal);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.setAttribute("aria-label", "Decrease quantity");
        minusButton.addEventListener("click", function () {
            changeQuantity(item.id, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.setAttribute("aria-label", "Increase quantity");
        plusButton.addEventListener("click", function () {
            changeQuantity(item.id, 1);
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-button";
        removeButton.addEventListener("click", function () {
            removeItem(item.id);
        });

        controls.append(
            minusButton,
            quantity,
            plusButton,
            removeButton
        );

        row.append(details, controls);
        cartItems.appendChild(row);
    });

    totalPrice.textContent = total;
}

document.getElementById("clear-cart").addEventListener("click", function () {
    cart = [];
    message.textContent = "";
    displayCart();
});

document.getElementById("checkout").addEventListener("click", function () {
    if (cart.length === 0) {
        message.textContent = "Please add products before placing an order.";
        return;
    }

    message.textContent = "Order placed successfully! Thank you for shopping.";

    cart = [];
    displayCart();
});

displayProducts();
displayCart();
