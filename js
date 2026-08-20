/* ==========================================
   KYAAEFLEURE — MAIN JAVASCRIPT
========================================== */


/* ==========================================
   PRODUCT DATA
========================================== */

const products = [

    {
        name: "Fleur de Rose",
        price: 189000,
        category: "floral",
        image:
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85"
    },

    {
        name: "Vanille Douce",
        price: 199000,
        category: "sweet",
        image:
            "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=85"
    },

    {
        name: "Lumière Blanche",
        price: 179000,
        category: "fresh",
        image:
            "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85"
    },

    {
        name: "Velvet Élan",
        price: 219000,
        category: "elegant",
        image:
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85"
    },

    {
        name: "Petale Rosé",
        price: 195000,
        category: "floral",
        image:
            "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=85"
    },

    {
        name: "Blush Amour",
        price: 205000,
        category: "sweet",
        image:
            "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=85"
    },

    {
        name: "Éclat de Jour",
        price: 185000,
        category: "fresh",
        image:
            "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=85"
    },

    {
        name: "Maison Muse",
        price: 229000,
        category: "elegant",
        image:
            "https://images.unsplash.com/photo-1590156221820-47c2d2e0c7d0?auto=format&fit=crop&w=800&q=85"
    }

];


/* ==========================================
   CART
========================================== */

let cart = JSON.parse(localStorage.getItem("kyaaefleureCart")) || [];


/* ==========================================
   ELEMENTS
========================================== */

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");


/* ==========================================
   FORMAT RUPIAH
========================================== */

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


/* ==========================================
   SAVE CART
========================================== */

function saveCart() {

    localStorage.setItem(
        "kyaaefleureCart",
        JSON.stringify(cart)
    );

}


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(productName) {

    const product = products.find(
        item => item.name === productName
    );

    if (!product) return;

    const existing = cart.find(
        item => item.name === productName
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();
    renderCart();
    openCart();

}


/* ==========================================
   RENDER CART
========================================== */

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>♡</span>
                <p>Your cart is empty.</p>
                <small>Add your favorite scent.</small>
            </div>
        `;

    } else {

        cart.forEach((item, index) => {

            const element = document.createElement("div");

            element.className = "cart-item";

            element.innerHTML = `

                <div class="cart-item-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        onerror="imageFallback(this)"
                    >
                </div>

                <div>

                    <h4>${item.name}</h4>

                    <p>
                        ${formatRupiah(item.price)}
                    </p>

                    <div class="qty">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    ×
                </button>

            `;

            cartItems.appendChild(element);

        });

    }


    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatRupiah(totalPrice);

}


/* ==========================================
   CHANGE QUANTITY
========================================== */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();
    renderCart();

}


/* ==========================================
   REMOVE
========================================== */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    renderCart();

}


/* ==========================================
   OPEN CART
========================================== */

function openCart() {

    cartDrawer.classList.add("show");
    cartOverlay.classList.add("show");

    document.body.classList.add("no-scroll");

}


/* ==========================================
   CLOSE CART
========================================== */

function closeCartDrawer() {

    cartDrawer.classList.remove("show");
    cartOverlay.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


/* ==========================================
   CART EVENTS
========================================== */

cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartDrawer
);

cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);


/* ==========================================
   QUICK ADD
========================================== */

document.querySelectorAll(".quick-add").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            addToCart(
                button.dataset.product
            );

        }
    );

});


/* ==========================================
   CHECKOUT WHATSAPP
========================================== */

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Keranjang kamu masih kosong ♡"
            );

            return;

        }

        let message =
            "want to order\n\n";

        message +=
            "Hi kyaaefleure! I want to order:\n\n";

        cart.forEach(item => {

            message +=
                `• ${item.name} x${item.quantity}\n`;

        });

        const total = cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

        message +=
            `\nTotal: ${formatRupiah(total)}`;

        const url =
            "https://wa.me/6285215059711?text=" +
            encodeURIComponent(message);

        window.open(url, "_blank");

    }
);


/* ==========================================
   SLIDER
========================================== */

const track =
    document.getElementById("productTrack");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("prevBtn");

let sliderPosition = 0;


function getVisibleProducts() {

    if (window.innerWidth <= 600) {
        return 1.25;
    }

    if (window.innerWidth <= 1000) {
        return 2;
    }

    return 4;

}


function updateSlider() {

    const cards =
        document.querySelectorAll(".product-card");

    if (!cards.length) return;

    const visible =
        getVisibleProducts();

    const maxPosition =
        Math.max(
            0,
            cards.length - Math.floor(visible)
        );

    sliderPosition =
        Math.min(
            sliderPosition,
            maxPosition
        );

    const cardWidth =
        cards[0].getBoundingClientRect().width;

    const gap = 18;

    track.style.transform =
        `translateX(-${sliderPosition * (cardWidth + gap)}px)`;

}


nextBtn.addEventListener(
    "click",
    () => {

        const cards =
            document.querySelectorAll(".product-card");

        const max =
            Math.max(
                0,
                cards.length - Math.floor(getVisibleProducts())
            );

        if (sliderPosition < max) {

            sliderPosition++;

        } else {

            sliderPosition = 0;

        }

        updateSlider();

    }
);


prevBtn.addEventListener(
    "click",
    () => {

        const cards =
            document.querySelectorAll(".product-card");

        const max =
            Math.max(
                0,
                cards.length - Math.floor(getVisibleProducts())
            );

        if (sliderPosition > 0) {

            sliderPosition--;

        } else {

            sliderPosition = max;

        }

        updateSlider();

    }
);


window.addEventListener(
    "resize",
    updateSlider
);


/* ==========================================
   AUTO SLIDER
========================================== */

let autoSlide =
    setInterval(
        () => nextBtn.click(),
        5000
    );


document
    .querySelector(".product-slider")
    .addEventListener(
        "mouseenter",
        () => clearInterval(autoSlide)
    );


document
    .querySelector(".product-slider")
    .addEventListener(
        "mouseleave",
        () => {

            autoSlide =
                setInterval(
                    () => nextBtn.click(),
                    5000
                );

        }
    );


/* ==========================================
   FILTER
========================================== */

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(".filter")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            document
                .querySelectorAll(".product-card")
                .forEach(card => {

                    if (
                        filter === "all" ||
                        card.dataset.category === filter
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

            sliderPosition = 0;
            updateSlider();

        }
    );

});


/* ==========================================
   SEARCH
========================================== */

const searchBtn =
    document.getElementById("searchBtn");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");


searchBtn.addEventListener(
    "click",
    () => {

        searchOverlay.classList.add("show");
        searchInput.focus();

    }
);


closeSearch.addEventListener(
    "click",
    () => {

        searchOverlay.classList.remove("show");

    }
);


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        if (!query) {

            searchResults.innerHTML = "";

            return;

        }

        const matches =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(query)
            );

        if (!matches.length) {

            searchResults.innerHTML = `
                <p>
                    No fragrance found ♡
                </p>
            `;

            return;

        }

        searchResults.innerHTML =
            matches.map(product => `

                <div class="search-result">

                    <span>
                        ${product.name}
                    </span>

                    <strong>
                        ${formatRupiah(product.price)}
                    </strong>

                </div>

            `).join("");

    }
);


/* ==========================================
   LANGUAGE
========================================== */

const languageBtn =
    document.getElementById("languageBtn");

const languageDropdown =
    document.getElementById("languageDropdown");

const languageText =
    document.getElementById("languageText");


languageBtn.addEventListener(
    "click",
    () => {

        languageDropdown.classList.toggle("show");

    }
);


const translations = {

    id: {

        navHome: "Home",
        navShop: "Shop",
        navAbout: "About",
        navPromo: "Promo",

        heroDescription:
            "Parfum feminin dengan karakter lembut, elegant, dan unforgettable — dibuat untuk menemani setiap versi dirimu."

    },

    en: {

        navHome: "Home",
        navShop: "Shop",
        navAbout: "About",
        navPromo: "Promo",

        heroDescription:
            "Feminine fragrances with a soft, elegant, and unforgettable character — made to accompany every version of you."

    }

};


document
    .querySelectorAll("[data-language]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const language =
                    button.dataset.language;

                languageText.textContent =
                    language === "id"
                        ? "ID"
                        : "EN";

                document
                    .querySelectorAll("[data-id]")
                    .forEach(element => {

                        const key =
                            element.dataset.id;

                        if (
                            translations[language][key]
                        ) {

                            element.textContent =
                                translations[language][key];

                        }

                    });


                document.getElementById(
                    "heroDescription"
                ).textContent =
                    translations[
                        language
                    ].heroDescription;


                languageDropdown
                    .classList.remove("show");

            }
        );

    });


/* ==========================================
   IMAGE FALLBACK
========================================== */

function imageFallback(img) {

    img.onerror = null;

    img.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800"
                height="900"
                viewBox="0 0 800 900"
            >

                <rect
                    width="800"
                    height="900"
                    fill="#ece5da"
                />

                <text
                    x="400"
                    y="430"
                    text-anchor="middle"
                    font-family="Georgia, serif"
                    font-size="45"
                    fill="#252321"
                >
                    kyaaefleure
                </text>

                <text
                    x="400"
                    y="470"
                    text-anchor="middle"
                    font-family="Arial, sans-serif"
                    font-size="12"
                    letter-spacing="4"
                    fill="#77716b"
                >
                    FRAGRANCE HOUSE
                </text>

            </svg>

        `);

}


/* ==========================================
   CUSTOM CURSOR
========================================== */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");


document.addEventListener(
    "mousemove",
    event => {

        cursorDot.style.left =
            `${event.clientX}px`;

        cursorDot.style.top =
            `${event.clientY}px`;

        cursorRing.style.left =
            `${event.clientX}px`;

        cursorRing.style.top =
            `${event.clientY}px`;

    }
);


document
    .querySelectorAll("a, button, input")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorRing.classList.add(
                    "active"
                );

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                cursorRing.classList.remove(
                    "active"
                );

            }
        );

    });


/* ==========================================
   SPARKLE EFFECT
========================================== */

let lastSparkle = 0;

document.addEventListener(
    "mousemove",
    event => {

        const now =
            Date.now();

        if (now - lastSparkle < 100) {
            return;
        }

        lastSparkle = now;

        const sparkle =
            document.createElement("div");

        sparkle.className =
            "sparkle";

        sparkle.textContent =
            Math.random() > .5
                ? "✦"
                : "✧";

        sparkle.style.left =
            `${event.clientX}px`;

        sparkle.style.top =
            `${event.clientY}px`;

        document.body.appendChild(
            sparkle
        );

        setTimeout(
            () => sparkle.remove(),
            800
        );

    }
);


/* ==========================================
   CLOSE DROPDOWN WHEN CLICK OUTSIDE
========================================== */

document.addEventListener(
    "click",
    event => {

        if (
            !languageBtn.contains(event.target) &&
            !languageDropdown.contains(event.target)
        ) {

            languageDropdown
                .classList.remove("show");

        }

    }
);


/* ==========================================
   INITIALIZE
========================================== */

renderCart();
updateSlider();
