
const products = [
    // Men's Clothing
    { id: 1, name: "Casual T-Shirt", price: 399, icon: "👕", category: "men" },
    { id: 2, name: "Formal Shirt", price: 699, icon: "👔", category: "men" },
    { id: 3, name: "Jeans", price: 999, icon: "👖", category: "men" },
    { id: 4, name: "Hoodie", price: 899, icon: "🧥", category: "men" },
    { id: 5, name: "Kurta", price: 799, icon: "🥻", category: "men" },
    { id: 6, name: "Shorts", price: 499, icon: "🩳", category: "men" },

    // Men's Accessories
    { id: 7, name: "Wrist Watch", price: 599, icon: "⌚", category: "men" },
    { id: 8, name: "Wallet", price: 399, icon: "👛", category: "men" },
    { id: 9, name: "Belt", price: 299, icon: "🪢", category: "men" },
    { id: 10, name: "Sunglasses", price: 499, icon: "🕶️", category: "men" },
    { id: 11, name: "Cap", price: 249, icon: "🧢", category: "men" },
    { id: 12, name: "Backpack", price: 699, icon: "🎒", category: "men" },

    // Women's Clothing
    { id: 13, name: "Kurti", price: 599, icon: "👗", category: "women" },
    { id: 14, name: "Party Dress", price: 999, icon: "👗", category: "women" },
    { id: 15, name: "Women's T-Shirt", price: 449, icon: "👚", category: "women" },
    { id: 16, name: "Women's Jeans", price: 899, icon: "👖", category: "women" },
    { id: 17, name: "Saree", price: 1299, icon: "🥻", category: "women" },
    { id: 18, name: "Skirt", price: 699, icon: "👗", category: "women" },
    { id: 19, name: "Sweater", price: 799, icon: "🧥", category: "women" },

    // Women's Accessories
    { id: 20, name: "Handbag", price: 799, icon: "👜", category: "women" },
    { id: 21, name: "Earrings", price: 199, icon: "💎", category: "women" },
    { id: 22, name: "Necklace", price: 349, icon: "📿", category: "women" },
    { id: 23, name: "Bracelet", price: 249, icon: "📿", category: "women" },
    { id: 24, name: "Sunglasses", price: 499, icon: "🕶️", category: "women" },
    { id: 25, name: "Scarf", price: 249, icon: "🧣", category: "women" },
    { id: 26, name: "Hair Accessories", price: 149, icon: "🎀", category: "women" }
];


let cart = [];
let selectedCategory = "all";

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const emptyMessage = document.getElementById("empty-message");
const message = document.getElementById("message");

function displayProducts() {
    productList.innerHTML = "";

    const filteredProducts = products.filter(function (product) {
        return selectedCategory === "all" ||
            product.category === selectedCategory;
    });

    filteredProducts.forEach(function (product) {
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

    message.textContent = "Product added to cart successfully!";
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
    let itemCount = 0;

    cart.forEach(function (item) {
        itemCount += item.quantity;
    });

    cartCount.textContent = "Items: " + itemCount;

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

document.querySelectorAll(".category-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;

        document.querySelectorAll(".category-btn").forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        displayProducts();
    });
});

document.getElementById("clear-cart").addEventListener("click", function () {
    cart = [];
    message.textContent = "";
    displayCart();
});

document.getElementById("checkout").addEventListener("click", function () {
    if (cart.length === 0) {
        message.textContent =
            "Please add products before placing an order.";
        return;
    }

    message.textContent =
        "Order placed successfully! Thank you for shopping.";

    cart = [];
    displayCart();
});

displayProducts();
displayCart();
