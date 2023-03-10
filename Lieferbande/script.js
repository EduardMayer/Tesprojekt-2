let meals = [
    {
        "meal": "Pizza Salami",
        "description": "mit Salami",
        "image": "img/2021-07_pizza_salami.jpg",
        "addicon": "img/add-32.jpg",
        "price": 7.49

    },
    {
        "meal": "Pizza Schinken",
        "description": "mit Hinterschinken",
        "image": "img/pizzaschinken-du-2021-lieferando.jpg",
        "addicon": "img/add-32.jpg",
        "price": 7.49
    },
    {
        "meal": "Pizza Hawaii",
        "description": "mit Hinterschinken und Ananas",
        "image": "img/2022-02-pizza-hawaii.jpg",
        "addicon": "img/add-32.jpg",
        "price": 7.49
    },
    {
        "meal": "Pizza Thunfisch",
        "description": "mit Thunfisch und roten Zwiebeln",
        "image": "img/2023_01_tunapizza.jpg",
        "addicon": "img/add-32.jpg",
        "price": 8.99
    },
    {
        "meal": "Pizza 4 Cheese",
        "description": "mit Crème fraîche statt Tomatensauce, Mozzarella, Cheddar, Gouda und Gorgonzola",
        "image": "img/2021-07_pizza_4-cheese.jpg",
        "addicon": "img/add-32.jpg",
        "price": 8.99
    },
    {
        "meal": "Pizza Gyros",
        "description": "mit würzigem Gyros, roten Zwiebeln und Tzatziki",
        "image": "img/2022-02-gyros-pizza.jpg",
        "addicon": "img/add-32.jpg",
        "price": 8.99
    },
    {
        "meal": "Pizza Chicken",
        "description": "mit Sauce Hollandaise statt Tomatensauce, Hühnerbrustfilet, Champignons, roten Zwiebeln und Bacon",
        "image": "img/2022-02-pizza-chicken-hollandaise.jpg",
        "addicon": "img/add-32.jpg",
        "price": 9.99
    },
    {
        "meal": "Pizza Serrano",
        "description": "mit Rucola, Serrano-Schinken und Parmesanflocken",
        "image": "img/2022-02-pizza-serrano.jpg",
        "addicon": "img/add-32.jpg",
        "price": 10.49
    }
];

let mealInBasket = [];
let priceInBasket = [];
let amountInBasket = [];

function renderallmeal() {

    for (let i = 0; i < meals.length; i++) {
        document.getElementById('meal-container').innerHTML += generateMealHtml(i);
    }
}

function generateMealHtml(i) {
    let meal = meals[i];
    return`<div class="basketResponsiveButton d-none" id="basketResponsiveButton" onclick="openBasketResponsive()">
    Warenkorb</div>
    <div class="food-box" id="meal${i}">
        <div>
            <h3>${meal['meal']}</h3>
            <p>${meal['description']}</p>
            <h3>${meal['price']}€</h3>
        </div>
        <div class="food-box-right">
            <img src="${meal['image']}">
            <img class="add-icon" onclick="addToBasket(${i})" src="${meal['addicon']}">
        </div>
    </div>`;
}

function addToBasket(i) {
    let meal = meals[i]['meal'];
    let price = meals[i]['price'];
    let index = mealInBasket.indexOf(meal);

    if (index === -1) {
        mealInBasket.push(meal);
        priceInBasket.push(price);
        amountInBasket.push(1);
    } else {
        amountInBasket[index]++;
    }
    showBasket();
}

function addToBasketFromBasket(i) {
    amountInBasket[i]++;
    showBasket();
}

function showBasket() {
    let basketContent = document.getElementById('basketInfo');
    basketContent.innerHTML = "";

    for (let i = 0; i < mealInBasket.length; i++) {
        let total = (amountInBasket[i] * priceInBasket[i]).toFixed(2).replace(".", ",");
        basketContent.innerHTML += templateBasketUpdate(i);
    }

    let total = calculateTotal();
    let finalSum = (parseFloat(total) + 2);

    basketContent.innerHTML += generateBasketContentHTML(total, finalSum);

    showOrderButton(basketContent, finalSum);
}

function showOrderButton(basketContent, finalSum) {
    if (finalSum >= 20) {
        basketContent.innerHTML += /*html*/ `
            <button class="button-basket">Bestellen</button>
        `;
    } else {
        basketContent.innerHTML += /*html*/ `
            <p class="caution">Bitte Mindestbestellsumme von 20€ beachten!</p>
        `;
    }
}

function generateBasketContentHTML(total, finalSum){
    
    return /*html*/`
    <div class="basketTotalBtn" id="basketTotalBtn">
        <div class="basketTotal">
            <div class="basketTotalLeft">
                <p>Zwischensumme:</p>
                <p>Lieferkosten:</p>
                <p><b>Gesamtsumme:</b></p>
            </div>

            <div class="basketTotalRight">
                <p>${total.toFixed(2).replace(".", ",")} €</p>
                <p>2 €</p>
                <p><b>${finalSum.toFixed(2).replace(".", ",")} €</b></p>
            </div>
        </div>
`;
}

function templateBasketUpdate(i) {
    let total = (amountInBasket[i] * priceInBasket[i]).toFixed(2).replace(".", ",");

    return /*html*/ `
        <div class="basketUpdate">
            <div class="order">
                <div>
                    <b>${amountInBasket[i]} x </b>
                    <b>${mealInBasket[i]}</b>
                </div>
                <div class="orderIcons">
                    <b>${total} €</b>
                    <div><img src="img/plus-4-32.png" onclick="addToBasketFromBasket(${i})"></div>
                    <div><img src="img/minus-4-32.png" onclick="removeFromBasket(${i})"></div>
                </div>
            </div>
        </div>
    `;
}

function removeFromBasket(i) {
    if (i !== -1) {
        if (amountInBasket[i] > 1) {
            amountInBasket[i]--;
        } else {
            mealInBasket.splice(i, 1);
            priceInBasket.splice(i, 1);
            amountInBasket.splice(i, 1);
        }
    }

    showBasket();

    if (mealInBasket.length === 0) {
        document.getElementById('basketTotalBtn').classList.add('d-none');
        emptyBasket();
    }
}

function emptyBasket() {
    document.getElementById('basketInfo').innerHTML = /*html*/`
          <div class="basket-info-box" id="basketInfo">
                <img src="/Lieferbande.de/img/basket.png">
                <h2>Fülle deinen Warenkorb</h2>
                <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
         </div>
    `;
}


function calculateTotal() {
    let total = 0;
    for (let i = 0; i < mealInBasket.length; i++) {
        total += priceInBasket[i] * amountInBasket[i];
    }
    return total;
}


function openBasketResponsive() {
    document.getElementById('food-container').classList.add('d-none');
    document.getElementById('FullBasket').style.cssText = 'display: unset';
    document.getElementById('close').classList.remove('d-none');
}


function closeBasketResponsive() {
    document.getElementById('food-container').classList.remove('d-none');
    document.getElementById('FullBasket').style.display = "";
    document.getElementById('close').classList.add('d-none');
}