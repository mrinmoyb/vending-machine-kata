/* Vending Machine */
var _vendingMachine = (function() {

    var

    currentAmount,
    coinsToReturn,
    coinsAdded,
    insufficientAmount,
    success,

    /* Check coin type */
    checkCoinType = function(coin) {

        if(coin.weight === _COINS.QUARTER.weight
            && coin.diameter === _COINS.QUARTER.diameter
            && coin.thickness === _COINS.QUARTER.thickness) {
            return _COINS.QUARTER;
        }

        if(coin.weight === _COINS.DIME.weight
            && coin.diameter === _COINS.DIME.diameter
            && coin.thickness === _COINS.DIME.thickness) {
            return _COINS.DIME;
        }

        if(coin.weight === _COINS.NICKEL.weight
            && coin.diameter === _COINS.NICKEL.diameter
            && coin.thickness === _COINS.NICKEL.thickness) {
            return _COINS.NICKEL;
        }

        return 'INVALID_COIN';
    },

    /* Get product type by name */
    getProductType = function(product) {

        var productType;

        switch(product.name) {
            case _PRODUCTS.COLA.name:
                productType = _PRODUCTS.COLA;
                break;
            case _PRODUCTS.CHIPS.name:
                productType = _PRODUCTS.CHIPS;
                break;
            case _PRODUCTS.CANDY.name:
                productType = _PRODUCTS.CANDY;
                break;
        }

        return productType;
    },

    insertedCoinAmount = function() {
        var total = 0;
        for (var i in coinsAdded) {
            total += coinsAdded[i].value;
        }
        currentAmount = total.toFixed(2);

        return currentAmount;
    },

    updateReturnCoins = function(amount) {
        amount = amount.toFixed(2);

        //Quarter
        while (amount/_COINS.QUARTER.value  >= 1) {
            console.log(amount/_COINS.QUARTER.value);
            coinsToReturn.push(_COINS.QUARTER);
            amount = (amount - _COINS.QUARTER.value).toFixed(2);
        }
        //Dime
        if (amount >= _COINS.DIME.value) {
            while (amount/_COINS.DIME.value >= 1) {
                coinsToReturn.push(_COINS.DIME);
                amount = (amount - _COINS.DIME.value).toFixed(2);
            }
        }
        //Nickel
        if (amount >= _COINS.NICKEL.value) {
            while (amount/_COINS.NICKEL.value >= 1) {
                coinsToReturn.push(_COINS.NICKEL);
                amount = (amount - _COINS.NICKEL.value).toFixed(2);
            }
        }
    },

    updateDisplay = function(cost) {

        if (coinsAdded.length === 0) {//No coins inserted
            return 'INSERT COINS';
        } else if (insufficientAmount) {//Amount inserted is less than product price
            insufficientAmount = false;
            return 'PRICE $' + cost.toFixed(2);
        } else if (success) {//Successfully purchased product
            success = false;
            return 'THANK YOU';
        } else {
            return '$' + insertedCoinAmount();
        };

    },

    vendingMachine = {

        /* Initiate default values */
        init: function() {
            currentAmount = 0,
            coinsToReturn = [],
            coinsAdded = [],
            insufficientAmount = false,
            success = false
        },
    
        /* Accept Coin */
        insertCoin: function (coin) {
            var coinType = checkCoinType(coin);

            if (coinType === 'INVALID_COIN') { // Push invalid coins to return coins
                coinsToReturn.push(coinType);
            } else { // Push valid coins to inserted coins
                coinsAdded.push(coinType);
            }

            return updateDisplay();

        },

        /* Select Product */
        selectProduct: function(product) {
            var productType = getProductType(product);

            if (productType.cost > currentAmount) {//Not adequate amount
                insufficientAmount = true;
                return updateDisplay(productType.cost);
            } else {
                success = true;

                var display = updateDisplay();
                
                /* Insert function to place remaining amount in coin return */
                updateReturnCoins(currentAmount - productType.cost);
                currentAmount = 0;
                coinsAdded = [];

                return display;
            }

        },

        /* Return coins */
        returnCoins: function() {
            var returnCoinsArr = coinsToReturn.concat(coinsAdded);
            coinsAdded = [];
            coinsToReturn = [];

            return returnCoinsArr;

        }
    }

    return vendingMachine;

})();



/* List of accepted coins */
var _COINS = {
    QUARTER: {
        name: "Quarter",
        value: 0.25,
        weight: 5.670,
        diameter: 24.26,
        thickness: 1.75
    },
    DIME: {
        name: "Dime",
        value: 0.10,
        weight: 2.268,
        diameter: 17.91,
        thickness: 1.35
    },
    NICKEL: {
        name: "Nickel",
        value: 0.05,
        weight: 5,
        diameter: 21.21,
        thickness: 1.95
    }
},

/* Available Products */
_PRODUCTS = {
    COLA: {
        name: "Chips",
        cost: 1.00,
        quantity: 10
    },
    CHIPS: {
        name: "Soda",
        cost: 0.50,
        quantity: 10
    },
    CANDY: {
        name: "Candy",
        cost: 0.65,
        quantity: 10
    }
};
