var Garden22;
(function (Garden22) {
    var Market = /** @class */ (function () {
        function Market() {
        }
        Market.buy = function (_event) {
            if (_event.target == document.querySelector("#buycarrots") && Garden22.Wallet.money >= Garden22.Carrot.price) {
                Garden22.Inventory.carrotAmount++;
                Garden22.Wallet.money = Garden22.Wallet.money - Garden22.Carrot.price * 2;
            }
            else if (_event.target == document.querySelector("#buytomatos") && Garden22.Wallet.money >= Garden22.Tomato.price) {
                Garden22.Inventory.tomatoAmount++;
                Garden22.Wallet.money = Garden22.Wallet.money - Garden22.Tomato.price * 2;
            }
            else if (_event.target == document.querySelector("#buycucumbers") && Garden22.Wallet.money >= Garden22.Cucumber.price) {
                Garden22.Inventory.cucumberAmount++;
                Garden22.Wallet.money = Garden22.Wallet.money - Garden22.Cucumber.price * 2;
            }
            else if (_event.target == document.querySelector("#buysalad") && Garden22.Wallet.money >= Garden22.Salad.price) {
                Garden22.Inventory.saladAmount++;
                Garden22.Wallet.money = Garden22.Wallet.money - Garden22.Salad.price * 2;
            }
            else if (_event.target == document.querySelector("#buypeppers") && Garden22.Wallet.money >= Garden22.Pepper.price) {
                Garden22.Inventory.pepperAmount++;
                Garden22.Wallet.money = Garden22.Wallet.money - Garden22.Pepper.price * 2;
            }
            else if (_event.target == document.querySelector("#buyfertalizer") && Garden22.Wallet.money > Garden22.Fertalizer.price) {
                Garden22.Inventory.fertalizerAmount++;
                Garden22.Wallet.money = Garden22.Wallet.money - Garden22.Fertalizer.price;
            }
            else if (_event.target == document.querySelector("#buypesticide") && Garden22.Wallet.money > Garden22.Pesticide.price) {
                Garden22.Inventory.pesticideAmount++;
                Garden22.Wallet.money = Garden22.Wallet.money - Garden22.Pesticide.price;
            }
            Garden22.Inventory.update();
            Garden22.Wallet.update();
        };
        Market.updatePrices = function () {
            Garden22.Carrot.price = Math.random() * Garden22.pVariationNum + 1;
            Garden22.Tomato.price = Math.random() * Garden22.pVariationNum + 1;
            Garden22.Cucumber.price = Math.random() * Garden22.pVariationNum + 1;
            Garden22.Salad.price = Math.random() * Garden22.pVariationNum + 1;
            Garden22.Pepper.price = Math.random() * Garden22.pVariationNum + 1;
            Garden22.Fertalizer.price = Math.random() * Garden22.pVariationNum + 0.5;
            Garden22.Pesticide.price = Math.random() * Garden22.pVariationNum + 0.5;
            document.querySelector("#carrotprice").innerHTML = Garden22.Carrot.price.toFixed(2) + "€";
            document.querySelector("#tomatoprice").innerHTML = Garden22.Tomato.price.toFixed(2) + "€";
            document.querySelector("#cucumberprice").innerHTML = Garden22.Cucumber.price.toFixed(2) + "€";
            document.querySelector("#saladprice").innerHTML = Garden22.Salad.price.toFixed(2) + "€";
            document.querySelector("#pepperprice").innerHTML = Garden22.Pepper.price.toFixed(2) + "€";
            document.querySelector("#fertalizerprice").innerHTML = Garden22.Fertalizer.price.toFixed(2) + "€";
            document.querySelector("#pesticideprice").innerHTML = Garden22.Pesticide.price.toFixed(2) + "€";
        };
        return Market;
    }());
    Garden22.Market = Market;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=market.js.map