let Drink = function (name, price, coffee, milk, sugar, water, cup) {
    this.name = name;
    this.price = price;
    this.coffee = coffee;
    this.milk = milk;
    this.sugar = sugar;
    this.water = water;
    this.cup = cup;
};
let supplies = {
    coffee: 10,
    milk: 9,
    sugar: 10,
    water: 16,
    cups: 16,
};


let Machine = function (name, date, owner, repairs) {
    this.name = name;
    this.date = date;
    this.owner = owner;
    this.repairs = repairs;
};

let CoffeeMachine = function (name, date, owner, repairs, supplies, drinks, picture, elements) {
    Machine.call(this, name, date, owner, repairs);
    this.supplies = supplies;
    this.drinks = drinks;
    this.picture = picture;
    this.elements = elements;


    this.getDrinkName = function () {
        return this.elements.select.value;
    };

    this.findDrink = function () {
        let drinkName = this.getDrinkName();
        return this.drinks.find((item) => item.name === drinkName);
    };

    this.getInsertedMoney = function () {
        return this.elements.fund.value;
    };
    this.calculateSupplies = function (drink) {
        this.supplies.coffee -= drink.coffee;
        this.supplies.milk -= drink.milk;
        this.supplies.sugar -= drink.sugar;
        this.supplies.water -= drink.water;
        this.supplies.cups -= drink.cup;
    };
    this.checkSupplies = function (drink) {
        return this.supplies.coffee >= drink.coffee &&
            this.supplies.milk >= drink.milk &&
            this.supplies.sugar >= drink.sugar &&
            this.supplies.water >= drink.water &&
            this.supplies.cups >= drink.cup;
    };
    this.prepareCoffee = function (insertedMoney, drink) {
        let change = insertedMoney - drink.price;
        this.calculateSupplies(drink);
        return `Here is your ${drink.name}. Your change: ${change}`;
    };
    this.checkPrice = function (drink) {
        let insertedMoney = this.getInsertedMoney();
        if (insertedMoney >= drink.price) {
            let message=this.prepareCoffee(insertedMoney, drink);
            setTimeout(function () {
                alert(message);
            },2000);
        } else {
            alert("Not enough payment");
        }
    };
    const handleSelectChange =  ()=> {
        let drink = this.findDrink();
        this.checkSupplies(drink)?this.elements.submit.disabled = false:
        this.elements.submit.disabled = true;
    };
    const handleSubmit = (event)=> {
        event.preventDefault();

        const drink = this.findDrink();

        this.checkPrice(drink);
        this.elements.select.options[0].selected = true;
        this.elements.fund.value=0;
        this.elements.submit.disabled = true;
    };

    this.render = function () {
        this.elements.img.setAttribute("src",this.picture);
        this.elements.select.addEventListener("change",handleSelectChange);
        this.elements.form.addEventListener("submit", handleSubmit);
    };
};


let elementsforProto = {
    img:document.getElementById("proto-img"),
    form: document.getElementById("proto-coffee"),
    select: document.getElementById("proto-coffee-types"),
    fund: document.getElementById("proto-coffee-fund"),
    submit: document.getElementById("proto-coffee-submit")
};

const drinks = [
    new Drink("espresso", 6, 2, 3, 1, 2, 1),
    new Drink("cappuccino", 7, 1, 1, 1, 1, 1),
    new Drink("frappuchino", 9, 4, 3, 3, 4, 1),
    new Drink("latte", 13, 2, 0, 2, 2, 1)
];


let pictureUrlProto = "img/protoCoffee.jpg";
let coffeeProto = new CoffeeMachine("Proto", "01/20/2020", "Rauf", "+994505392909", supplies, drinks, pictureUrlProto, elementsforProto);
coffeeProto.render();

//****************************************************************************
//****************************************************************************
//CLASS BASED COFFEE MACHINE WITH AJAX
//****************************************************************************
//****************************************************************************

class MachineUpgraded  {
    constructor(name, date, owner, repairs) {
        this.name = name;
        this.date = date;
        this.owner = owner;
        this.repairs = repairs;
    }
}

class CoffeeMachineUpgraded  extends MachineUpgraded {
    constructor(name, date, owner, repairs, supplies,drinks, picture, elements) {
        super(name, date, owner, repairs);
        this.supplies = supplies;
        // this.drinks = drinks;
        this.drinks=drinks;
        this.picture = picture;
        this.elements = elements;
    }
    getDrinkName = function () {
        return this.elements.select.value;
    };

    findDrink = function () {
        let drinkName = this.getDrinkName();
        return this.drinks.find((item) => item.name === drinkName);
    };

    getInsertedMoney = function () {
        return this.elements.fund.value;
    };
    calculateSupplies = function (drink) {
        this.supplies.coffee -= drink.coffee;
        this.supplies.milk -= drink.milk;
        this.supplies.sugar -= drink.sugar;
        this.supplies.water -= drink.water;
        this.supplies.cups -= drink.cup;
    };
    checkSupplies = function (drink) {
        return this.supplies.coffee >= drink.coffee &&
            this.supplies.milk >= drink.milk &&
            this.supplies.sugar >= drink.sugar &&
            this.supplies.water >= drink.water &&
            this.supplies.cups >= drink.cup;
    };
    prepareCoffee = function (insertedMoney, drink) {
        let change = insertedMoney - drink.price;
        this.calculateSupplies(drink);
        return `Here is your ${drink.name}. Your change: ${change}`;
    };
    checkPrice = function (drink) {
        let insertedMoney = this.getInsertedMoney();
        if (insertedMoney >= drink.price) {
            let message=this.prepareCoffee(insertedMoney, drink);
            setTimeout(function () {
                alert(message);
            },2000);
        } else {
            alert("Not enough payment");
        }
    };
    handleSelectChange =  ()=> {
        let drink = this.findDrink();
        this.checkSupplies(drink)?this.elements.submit.disabled = false:
            this.elements.submit.disabled = true;
    };
    handleSubmit = (event)=> {
        event.preventDefault();
        const drink = this.findDrink();
        this.checkPrice(drink);
        this.elements.select.options[0].selected = true;
        this.elements.fund.value=0;
        this.elements.submit.disabled = true;
    };

    render = function () {
        this.elements.img.setAttribute("src",this.picture);
        this.elements.select.addEventListener("change",this.handleSelectChange);
        this.elements.form.addEventListener("submit", this.handleSubmit);
    };
}


let elementsforClass = {
    img:document.getElementById("class-img"),
    form: document.getElementById("class-coffee"),
    select: document.getElementById("class-coffee-types"),
    fund: document.getElementById("class-coffee-fund"),
    submit: document.getElementById("class-coffee-submit")
};

let pictureUrlClass = "img/classCoffee.jpg";



let coffeeClassObject;

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        coffeeClassObject = new CoffeeMachineUpgraded(
            "ClassBased",
            "01.20.2020",
            "Rauf",
            "+994505392909",
            supplies,
            JSON.parse(this.responseText),
            pictureUrlClass,
            elementsforClass);
        coffeeClassObject.render();
    }
};
xhttp.open("GET", "json/drinks.json", true);
xhttp.send();



