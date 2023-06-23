var pizzaInfo = [
    {
        id:1,
        icon:'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true,
        is_popular:true

    },
    {
        id:2,
        icon:'assets/images/pizza_2.jpg',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular:true
    },
    {
        id:3,
        icon:'assets/images/pizza_1.jpg',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id:4,
        icon:'assets/images/pizza_5.jpg',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський',  'соус томатний']
        },
        small_size:{
            weight: 450,
            size: 30,
            price: 111
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id:5,
        icon:'assets/images/pizza_3.jpg',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id:6,
        icon:'assets/images/pizza_6.jpg',
        title: "Мікс смаків",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size:{
            weight: 470,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id:7,
        icon:'assets/images/pizza_8.jpg',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        big_size:{
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id:8,
        icon:'assets/images/pizza_4.jpg',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size:{
            weight: 400,
            size: 30,
            price: 189
        },
        big_size:{
            weight: 700,
            size: 40,
            price: 299
        }
    }
];
var cartItems = [];

var order;
var orderToggleButton;
var cart
var pizzaList;
var currentFilter;
var filterList;
var pizzaAmount;
var cartItemAmount;
var totalPrice;
var clearCart;

function addToCart(id, size) {
    let exist = false;
    for(let i = 0; i < cartItems.length; i++) {
        if(cartItems[i].id == id && cartItems[i].size == size) {
            cartItems[i].amount++;
            exist = true;
            break;
        }
    }
    if(!exist) {
        cartItems.push({id: id, size: size, amount: 1});
    }
}

function deleteFromCart(id, size) {
    for(let i = 0; i < cartItems.length; i++) {
        if(cartItems[i].id == id && cartItems[i].size == size) {
            cartItems.splice(i, 1);
            break;
        }
    }
}

function subtractFromCart(id, size) {
    for(let i = 0; i < cartItems.length; i++) {
        if(cartItems[i].id == id && cartItems[i].size == size) {
            cartItems[i].amount--;
            if(cartItems[i].amount == 0) {
                deleteFromCart(id, size);
            }
            break;
        }
    }
}

function getHTMLForPizzaCard(pizza) {
    let ingredientsList = [];
    for(ingredientType in pizza.content) {
        if(Array.isArray(pizza.content[ingredientType])) {
            for(ingredient of pizza.content[ingredientType]) {
                ingredientsList.push(ingredient);
            }
        }
    }
    let ingredientsText = ingredientsList.join(", ");
    ingredientsText = ingredientsText.charAt(0).toUpperCase() + ingredientsText.slice(1);

    let sizes = "";
    if(pizza.hasOwnProperty("small_size")) {
        sizes += `<article class="size-class small">
            <span class="size"><img src="assets/images/size-icon.svg">${pizza.small_size.size}</span>
            <span class="weight"><img src="assets/images/weight.svg">${pizza.small_size.weight}</span>
            <span class="price">${pizza.small_size.price}</span>
            <span class="currency">грн.</span>
            <button data-pizza-id="${pizza.id}" data-pizza-size="small_size"class="buy">Купити</button>
        </article>`;
    }
    if(pizza.hasOwnProperty("big_size")) {
        sizes += `<article class="size-class big">
            <span class="size"><img src="assets/images/size-icon.svg">${pizza.big_size.size}</span>
            <span class="weight"><img src="assets/images/weight.svg">${pizza.big_size.weight}</span>
            <span class="price">${pizza.big_size.price}</span>
            <span class="currency">грн.</span>
            <button data-pizza-id="${pizza.id}" data-pizza-size="big_size" class="buy">Купити</button>
        </article>`;
    }

    let markers = "";
    if(pizza.hasOwnProperty("is_new") && pizza.is_new == true) {
        markers += `<span class="new">Нова</span>`;
    }
    if(pizza.hasOwnProperty("is_popular") && pizza.is_popular == true) {
        markers += `<span class="popular">Популярна</span>`;
    }

    let htmlText = `<article id="pizza-${pizza.id}" class="pizza">
    <img src="${pizza.icon}">
    <h2>${pizza.title}</h2>
    <h3>${pizza.type}</h3>
    <span class="ingredients">${ingredientsText}</span>
    <section class="sizes">
        ${sizes}
    </section>
    <section class="markers">
        ${markers}
    </section>
</article>`;
    return htmlText;
}

function getHTMLForPizzaCartItem(item) {
    let curPizza = pizzaInfo.filter(pizza => pizza.id == item.id)[0];
    
    let name = "";
    switch(item.size) {
        case "small_size":
            name = curPizza.title + " (Мала)";
            break;
        case "big_size":
            name = curPizza.title + " (Велика)";
            break;
    }

    let htmlText = `<article id="pizza-item-${curPizza.id}-${item.size}" class="item">
        <section class="data">
            <h2>${name}</h2>
            <section class="size-class">
                <span class="size"><img src="assets/images/size-icon.svg">${curPizza[item.size].size}</span>
                <span class="weight"><img src="assets/images/weight.svg">${curPizza[item.size].weight}</span>
            </section>
            <section class="item-amount">
                <span class="price">${curPizza[item.size].price * item.amount} грн</span>
                <button data-pizza-id="${item.id}" data-pizza-size="${item.size}" class="count-button subtract">-</button>
                <span class="amount">${item.amount}</span>
                <button data-pizza-id="${item.id}" data-pizza-size="${item.size}" class="count-button add">+</button>
                <button data-pizza-id="${item.id}" data-pizza-size="${item.size}" class="count-button remove">&times;</button>
            </section>
        </section>
        <div class="image-wrap-slice">
            <img src="${curPizza.icon}">
        </div>
    </article>`;
    return htmlText;
}

function updatePizzaList() {
    let pizzaListHTML = "";
    for(pizza of pizzaInfo) {
        switch(filter) {
            case "all":
                pizzaListHTML += getHTMLForPizzaCard(pizza);
                break;
            case "meat":
                if(pizza["content"].hasOwnProperty("meat") || pizza["content"].hasOwnProperty("chicken")) {
                    pizzaListHTML += getHTMLForPizzaCard(pizza);
                }
                break;
            case "pineapple":
                if(pizza["content"].hasOwnProperty("pineapple")) {
                    pizzaListHTML += getHTMLForPizzaCard(pizza);
                }
                break;
            case "mushroom":
                if(pizza["content"].hasOwnProperty("mushroom")) {
                    pizzaListHTML += getHTMLForPizzaCard(pizza);
                }
                break;
            case "ocean":
                if(pizza["content"].hasOwnProperty("ocean")) {
                    pizzaListHTML += getHTMLForPizzaCard(pizza);
                }
                break;
            case "vega":
            if(!pizza["content"].hasOwnProperty("meat") && !pizza["content"].hasOwnProperty("chicken") && !pizza["content"].hasOwnProperty("ocean")) {
                pizzaListHTML += getHTMLForPizzaCard(pizza);
            }
            break;
        }
    }
    pizzaList.innerHTML = pizzaListHTML;
    for(button of pizzaList.getElementsByClassName("buy")) {
        let id = button.getAttribute("data-pizza-id");
        let size = button.getAttribute("data-pizza-size");
        button.addEventListener("click", function() {
            addToCart(id, size);
            update();
        })
    }
}

function updateCart() {
    let cartHTML = "";
    for(item of cartItems) {
        cartHTML += getHTMLForPizzaCartItem(item);
    }
    cart.innerHTML = cartHTML;
    for(button of cart.getElementsByClassName("subtract")) {
        let id = button.getAttribute("data-pizza-id");
        let size = button.getAttribute("data-pizza-size");
        button.addEventListener("click", function() {
            subtractFromCart(id, size);
            update();
        })
    }
    for(button of cart.getElementsByClassName("add")) {
        let id = button.getAttribute("data-pizza-id");
        let size = button.getAttribute("data-pizza-size");
        button.addEventListener("click", function() {
            addToCart(id, size);
            update();
        })
    }
    for(button of cart.getElementsByClassName("remove")) {
        let id = button.getAttribute("data-pizza-id");
        let size = button.getAttribute("data-pizza-size");
        button.addEventListener("click", function() {
            deleteFromCart(id, size);
            update();
        })
    }
}

function updatePizzaAmount() {
    pizzaAmount.innerHTML = pizzaInfo.length;
}

function updateCartItemAmount() {
    cartItemAmount.innerHTML = cartItems.length;
}

function updateTotalPrice() {
    let priceTotal = 0;
    for(item of cartItems) {
        let curPizza = pizzaInfo.filter(pizza => pizza.id == item.id)[0];
        priceTotal += curPizza[item.size].price * item.amount;
    }
    totalPrice.innerHTML = `${priceTotal} грн`;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

function loadCart() {
    let data = localStorage.getItem("cart");
    if(data && JSON.parse(data).length > 0) {
        cartItems = JSON.parse(data);
    }
}

function setFilter(newFilter) {
    filter = newFilter;
}

function initFilters() {
    filter = "all";
    filters = document.getElementsByTagName("nav")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
    for(li of filters) {
        let type = li.getAttribute("data-type");
        if(type == "all") {
            li.classList.add("selected");
        }
        li.addEventListener("click", function() {
            document.querySelector(`[data-type="${filter}"]`).classList.remove("selected");
            document.querySelector(`[data-type="${type}"]`).classList.add("selected");
            setFilter(type);
            update();
        })
    }
}

function init() {
    order = document.getElementsByClassName("order")[0];
    orderToggleButton = document.getElementsByClassName("toggle-order-view")[0];
    orderToggleButton.addEventListener("click", () => order.classList.toggle("active"));
    clearCart = order.getElementsByClassName("clear")[0];
    clearCart.addEventListener("click", () => {
        cartItems = [];
        update();
    });
    cart = document.getElementsByClassName("cart")[0];
    pizzaList = document.getElementsByClassName("pizza-list")[0];
    pizzaAmount = document.getElementsByTagName("main")[0].getElementsByClassName("total")[0];
    cartItemAmount = document.getElementsByClassName("order")[0].getElementsByClassName("info")[0].getElementsByClassName("total")[0];
    totalPrice = order.getElementsByClassName("payment")[0].getElementsByClassName("total")[0];
    initFilters();
    loadCart();
    update();
}

function update() {
    updatePizzaList();
    updateCart();
    updatePizzaAmount();
    updateCartItemAmount();
    updateTotalPrice();
}

function dispose() {
    saveCart();
}

window.onload = init;
window.onunload = dispose;