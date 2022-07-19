var Garden22;
(function (Garden22) {
    // let enablePlant: boolean = false;
    // let enableCarrot: boolean = false;
    // let enableTomato: boolean = false;
    // let enableCucumber: boolean = false;
    // let enableSalad: boolean = false;
    // let enablePepper: boolean = false;
    // let enableHarvest: boolean = false;
    // let enablePestice: boolean = false;
    // let enableWater: boolean = false;
    // let enableFertalizer: boolean = false;
    var TOOLACTION;
    (function (TOOLACTION) {
        TOOLACTION[TOOLACTION["FERTILIZE"] = 0] = "FERTILIZE";
        TOOLACTION[TOOLACTION["HARVEST"] = 1] = "HARVEST";
        TOOLACTION[TOOLACTION["WATER"] = 2] = "WATER";
        TOOLACTION[TOOLACTION["PLANT"] = 3] = "PLANT";
        TOOLACTION[TOOLACTION["PESTICIDE"] = 4] = "PESTICIDE";
    })(TOOLACTION = Garden22.TOOLACTION || (Garden22.TOOLACTION = {}));
    var PLANTING;
    (function (PLANTING) {
        PLANTING[PLANTING["CARROT"] = 0] = "CARROT";
        PLANTING[PLANTING["TOMATO"] = 1] = "TOMATO";
        PLANTING[PLANTING["CUCUMBER"] = 2] = "CUCUMBER";
        PLANTING[PLANTING["SALAD"] = 3] = "SALAD";
        PLANTING[PLANTING["PEPPER"] = 4] = "PEPPER";
    })(PLANTING = Garden22.PLANTING || (Garden22.PLANTING = {}));
    var Player = /** @class */ (function () {
        function Player() {
        }
        Player.usePesticide = function (_position, _field) {
            for (var i = 0; i < Garden22.plants.length; i++) {
                if (Garden22.plants[i].position == _position && Garden22.plants[i].holdsPest == true && Garden22.plants[i].water > 0) {
                    Garden22.plants[i].holdsPest = false;
                    Garden22.plants[i].growthrate = Garden22.plants[i].growthrate * -1;
                    Garden22.Pesticide.removePest(i);
                    Garden22.Inventory.pesticideAmount--;
                    Garden22.Inventory.update();
                    _field.draw();
                    Garden22.Fertalizer.update();
                    Garden22.plants[i].draw();
                }
            }
        };
        Player.harvest = function (_i) {
            switch (Garden22.plants[_i].name) {
                case "Carrot":
                    Garden22.Wallet.money = Garden22.Wallet.money + Garden22.Carrot.price;
                case "Tomato":
                    Garden22.Wallet.money = Garden22.Wallet.money + Garden22.Tomato.price;
                case "Cucumber":
                    Garden22.Wallet.money = Garden22.Wallet.money + Garden22.Cucumber.price;
                case "Salad":
                    Garden22.Wallet.money = Garden22.Wallet.money + Garden22.Salad.price;
                case "Pepper":
                    Garden22.Wallet.money = Garden22.Wallet.money + Garden22.Pepper.price;
            }
            Garden22.Wallet.update();
            Garden22.plants.splice(_i, 1);
        };
        Player.useWater = function (_position, _field) {
            for (var i = 0; i < Garden22.plants.length; i++) {
                if (Garden22.plants[i].position == _position && Garden22.plants[i].water <= 0) {
                    Garden22.plants[i].water = 5;
                    _field.draw();
                    Garden22.Fertalizer.update();
                    Garden22.plants[i].draw();
                }
                else if (Garden22.plants[i].position == _position && Garden22.plants[i].water > 0) {
                    if (Garden22.plants[i].holdsPest == true) {
                        Garden22.Pesticide.removePest(i);
                    }
                    Garden22.plants.splice(i, 1);
                    _field.draw();
                }
            }
        };
        Player.useFertalizer = function (_position, _field) {
            for (var i = 0; i < Garden22.plants.length; i++) {
                if (Garden22.plants[i].position == _position && Garden22.plants[i].fertalized == false) {
                    Garden22.plants[i].fertalized = true;
                    Garden22.Fertalizer.draw(_position);
                    Garden22.Inventory.fertalizerAmount--;
                    Garden22.Inventory.update();
                    Garden22.plants[i].growthrate = Garden22.plants[i].growthrate + 0.2;
                }
                else if (Garden22.plants[i].position == _position && Garden22.plants[i].fertalized == true) {
                    if (Garden22.plants[i].holdsPest == true) {
                        Garden22.Pesticide.removePest(i);
                    }
                    Garden22.plants.splice(i, 1);
                    _field.draw();
                    console.log(Garden22.plants);
                }
            }
        };
        Player.plant = function (_position) {
            if (Player.planting == PLANTING.CARROT && Garden22.Inventory.carrotAmount > 0) {
                Garden22.plants.push(new Garden22.Carrot(_position));
                Garden22.Inventory.carrotAmount--;
            }
            else if (Player.planting == PLANTING.TOMATO == true && Garden22.Inventory.tomatoAmount > 0) {
                Garden22.plants.push(new Garden22.Tomato(_position));
                Garden22.Inventory.tomatoAmount--;
            }
            else if (Player.planting == PLANTING.CUCUMBER && Garden22.Inventory.cucumberAmount > 0) {
                Garden22.plants.push(new Garden22.Cucumber(_position));
                Garden22.Inventory.cucumberAmount--;
            }
            else if (Player.planting == PLANTING.SALAD && Garden22.Inventory.saladAmount > 0) {
                Garden22.plants.push(new Garden22.Salad(_position));
                Garden22.Inventory.saladAmount--;
            }
            else if (Player.planting == PLANTING.PEPPER && Garden22.Inventory.pepperAmount > 0) {
                Garden22.plants.push(new Garden22.Pepper(_position));
                Garden22.Inventory.pepperAmount--;
            }
            Garden22.Inventory.update();
            Garden22.plants[Garden22.plants.length - 1].draw();
        };
        return Player;
    }());
    Garden22.Player = Player;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=player.js.map