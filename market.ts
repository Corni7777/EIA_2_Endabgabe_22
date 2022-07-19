namespace Garden22 {
    export class Market {

        static buy(_event: MouseEvent): void {
            if (_event.target == document.querySelector("#buycarrots") && Wallet.money >= Carrot.price) {
                Inventory.carrotAmount++;
                Wallet.money = Wallet.money - Carrot.price * 2;
            }
            else if (_event.target == document.querySelector("#buytomatos") && Wallet.money >= Tomato.price) {
                Inventory.tomatoAmount++;
                Wallet.money = Wallet.money - Tomato.price * 2;
            }
            else if (_event.target == document.querySelector("#buycucumbers") && Wallet.money >= Cucumber.price) {
                Inventory.cucumberAmount++;
                Wallet.money = Wallet.money - Cucumber.price * 2;
            }
            else if (_event.target == document.querySelector("#buysalad") && Wallet.money >= Salad.price) {
                Inventory.saladAmount++;
                Wallet.money = Wallet.money - Salad.price * 2;
            }
            else if (_event.target == document.querySelector("#buypeppers") && Wallet.money >= Pepper.price) {
                Inventory.pepperAmount++;
                Wallet.money = Wallet.money - Pepper.price * 2;
            }
            else if (_event.target == document.querySelector("#buyfertalizer") && Wallet.money > Fertalizer.price) {
                Inventory.fertalizerAmount++;
                Wallet.money = Wallet.money - Fertalizer.price;
            }
            else if (_event.target == document.querySelector("#buypesticide") && Wallet.money > Pesticide.price) {
                Inventory.pesticideAmount++;
                Wallet.money = Wallet.money - Pesticide.price;
            }
            Inventory.update();
            Wallet.update();
        }

        static updatePrices(): void {
            Carrot.price = Math.random() * pVariationNum + 1;
            Tomato.price = Math.random() * pVariationNum + 1;
            Cucumber.price = Math.random() * pVariationNum + 1;
            Salad.price = Math.random() * pVariationNum + 1;
            Pepper.price = Math.random() * pVariationNum + 1;
    
            Fertalizer.price = Math.random() * pVariationNum + 0.5;
            Pesticide.price = Math.random() *  pVariationNum + 0.5;
            document.querySelector("#carrotprice").innerHTML = Carrot.price.toFixed(2) + "€";
            document.querySelector("#tomatoprice").innerHTML = Tomato.price.toFixed(2) + "€";
            document.querySelector("#cucumberprice").innerHTML = Cucumber.price.toFixed(2) + "€";
            document.querySelector("#saladprice").innerHTML = Salad.price.toFixed(2) + "€";
            document.querySelector("#pepperprice").innerHTML = Pepper.price.toFixed(2) + "€";
    
            document.querySelector("#fertalizerprice").innerHTML = Fertalizer.price.toFixed(2) + "€";
            document.querySelector("#pesticideprice").innerHTML = Pesticide.price.toFixed(2) + "€";
        }
    }
}