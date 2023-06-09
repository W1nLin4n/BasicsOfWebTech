class Item {
    constructor(name, amount, bought, namechanging) {
        this.name = name.trim();
        this.amount = amount;
        this.bought = bought;
        this.namechanging = namechanging;
    }

    static formatName(name) {
        return name.trim();
    }
}

var items;
var listDetailed;
var listCompactBought;
var listCompactUnbought;
var productAdditionInput;
var productAdditionButton;

function createDetailedItem(id, item) {

    let itemNode = document.createElement("article");
    itemNode.id = `product-${id}`;
    itemNode.classList.add("product");
    if(item.bought) {
        itemNode.classList.add("bought");
    } else {
        itemNode.classList.add("unbought");
    }
    if(item.namechanging) {
        itemNode.classList.add("name-changing");
    }
    if(item.amount == 1) {
        itemNode.classList.add("single");
    }

    let nameSectionNode = document.createElement("section");
    nameSectionNode.classList.add("product-name-section");

    if(item.namechanging) {
        let nameNode = document.createElement("input");
        nameNode.classList.add("product-name-input");
        nameNode.value = item.name;
        nameNode.addEventListener("blur",  function () {
            setItemName(id, nameNode.value);
            setItemNamechanging(id, false);
            update();
        });
        nameSectionNode.appendChild(nameNode);
    } else {
        let nameNode = document.createElement("span");
        nameNode.classList.add("product-name");
        nameNode.innerHTML = item.name;
        if(!item.bought) {
            nameNode.addEventListener("click", function () {
                setItemNamechanging(id, true);
                update();
            });
        }
        nameSectionNode.appendChild(nameNode);
    }

    let countSectionNode = document.createElement("section");
    countSectionNode.classList.add("product-count-section");

    let countSubtractButtonNode = document.createElement("button");
    countSubtractButtonNode.classList.add("count-button", "subtract");
    countSubtractButtonNode.setAttribute("data-tooltip", "Зменшити кількість товару");
    countSubtractButtonNode.innerHTML = "-";
    countSubtractButtonNode.addEventListener("click", function () {
        changeItemAmount(id, -1);
        update();
    });
    countSectionNode.appendChild(countSubtractButtonNode);

    let countNode = document.createElement("span");
    countNode.classList.add("product-count");
    countNode.innerHTML = item.amount;
    countSectionNode.appendChild(countNode);

    let countAddButtonNode = document.createElement("button");
    countAddButtonNode.classList.add("count-button", "add");
    countAddButtonNode.setAttribute("data-tooltip", "Збільшити кількість товару");
    countAddButtonNode.innerHTML = "+";
    countAddButtonNode.addEventListener("click", function () {
        changeItemAmount(id, 1);
        update();
    });
    countSectionNode.appendChild(countAddButtonNode);

    let listingSectionNode = document.createElement("section");
    listingSectionNode.classList.add("product-listing-section");

    let listingSetBoughtButtonNode = document.createElement("button");
    listingSetBoughtButtonNode.classList.add("listing-button", "list-product-as-bought");
    listingSetBoughtButtonNode.setAttribute("data-tooltip", "Додати товар до купленого");
    listingSetBoughtButtonNode.innerHTML = "Куплено";
    listingSetBoughtButtonNode.addEventListener("click", function () {
        setItemBought(id, true);
        update();
    });
    listingSectionNode.appendChild(listingSetBoughtButtonNode);

    let listingSetUnboughtButtonNode = document.createElement("button");
    listingSetUnboughtButtonNode.classList.add("listing-button", "list-product-as-unbought");
    listingSetUnboughtButtonNode.setAttribute("data-tooltip", "Додати товар до некупленого");
    listingSetUnboughtButtonNode.innerHTML = "Не куплено";
    listingSetUnboughtButtonNode.addEventListener("click", function () {
        setItemBought(id, false);
        update();
    });
    listingSectionNode.appendChild(listingSetUnboughtButtonNode);

    let listingDeleteButtonNode = document.createElement("button");
    listingDeleteButtonNode.classList.add("delete-product");
    listingDeleteButtonNode.setAttribute("data-tooltip", "Видалити товар зі списку");
    listingDeleteButtonNode.innerHTML = "&times;";
    listingDeleteButtonNode.addEventListener("click", function () {
        removeItem(id);
        update();
    });
    listingSectionNode.appendChild(listingDeleteButtonNode);

    itemNode.appendChild(nameSectionNode);
    itemNode.appendChild(countSectionNode);
    itemNode.appendChild(listingSectionNode);

    return itemNode;
}

function createCompactItem(id, item) {

    let itemNode = document.createElement("article");
    itemNode.id = `product-compact-${id}`;
    itemNode.classList.add("product-compact");
    let nameNode = document.createElement("span");
    nameNode.classList.add("product-name");
    let nameNodeText = document.createTextNode(item.name);
    nameNode.appendChild(nameNodeText);
    let countNode = document.createElement("span");
    countNode.classList.add("product-count");
    let countNodeText = document.createTextNode(item.amount);
    countNode.appendChild(countNodeText);
    itemNode.appendChild(nameNode);
    itemNode.appendChild(countNode);

    return itemNode;
}

function drawItem(id, item) {
    let itemDetailed = createDetailedItem(id, item);
    let itemCompact = createCompactItem(id, item);
    listDetailed.appendChild(itemDetailed);
    if(item.bought) {
        listCompactBought.appendChild(itemCompact);
    } else {
        listCompactUnbought.appendChild(itemCompact);
    }
}

function clear() {
    let products = document.getElementsByClassName("product");
    let productsCompact = document.getElementsByClassName("product-compact");

    while(products[0]) {
        products[0].parentElement.removeChild(products[0]);
    }
    while(productsCompact[0]) {
        productsCompact[0].parentElement.removeChild(productsCompact[0]);
    }
}

function drawItems() {
    for(let i = 0; i < items.length; i++) {
        drawItem(i, items[i]);
    }
}

function focusOnNameInput() {
    if(document.getElementsByClassName("product-name-input")[0]) {
        document.getElementsByClassName("product-name-input")[0].focus();
    }
}

function setItemName(id, value) {
    if(Item.formatName(value) !== "" && 
    items.filter(item => item.name == Item.formatName(value)).length < (items[id].name ==  Item.formatName(value) ? 2 : 1)) {
        items[id].name = Item.formatName(value);
    } else {
        alert("There is already a product with such name or line is an empty string!");
    }
}

function setItemNamechanging(id, value) {
    items[id].namechanging = value;
}

function setItemBought(id, value) {
    items[id].bought = value;
}

function changeItemAmount(id, value) {
    if(items[id].amount + value > 0) {
        items[id].amount += value;
    }
}

function removeItem(id) {
    items.splice(id, 1);
}

function addItem(name) {
    if(Item.formatName(name) !== "" && items.filter(item => item.name == Item.formatName(name)).length == 0) {
        items.push(new Item(name, 1, false, false));
    } else {
        alert("There is already a product with such name or line is an empty string!");
    }
}

function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
}

function loadItems() {
    let data = localStorage.getItem("items");
    if(data) {
        items = JSON.parse(data);
    }
    if(!data || items.length == 0) {
        items = [new Item("Помідори", 2, false, false), new Item("Печиво", 2, false, false), new Item("Сир", 2, false, false)];
    }
}

function initElements() {
    listDetailed = document.getElementsByClassName("product-list-detailed")[0];
    listCompactBought = document.getElementsByClassName("products-list bought")[0];
    listCompactUnbought = document.getElementsByClassName("products-list unbought")[0];
    productAdditionInput = document.getElementsByClassName("product-addition-interface")[0].getElementsByTagName("input")[0];
    productAdditionInput.addEventListener("keypress", function(event) {
        if(event.key == "Enter") {
            event.preventDefault();
            productAdditionButton.click();
        }
    });
    productAdditionButton = document.getElementsByClassName("product-addition-interface")[0].getElementsByTagName("button")[0];
    productAdditionButton.addEventListener("click", function() {
        addItem(productAdditionInput.value);
        productAdditionInput.value = "";
        update();
        productAdditionInput.focus();
    });
}

function init() {
    initElements();
    loadItems();
    update();
}

function update() {
    clear();
    drawItems();
    focusOnNameInput();
}

function dispose() {
    saveItems();
}

window.onload = init;
window.onunload = dispose;