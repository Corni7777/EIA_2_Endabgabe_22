var Garden22;
(function (Garden22) {
    var currentUse;
    var formData;
    var moneyString;
    var pVariationString;
    Garden22.fields = [];
    Garden22.plants = [];
    Garden22.pests = [];
    window.addEventListener("load", hndLoad);
    function hndLoad() {
        formData = new FormData(document.forms[0]);
        pVariationString = (formData.get("variation").toString());
        Garden22.pVariationNum = parseFloat(pVariationString);
        document.querySelector("#settings").addEventListener("change", hndSettingChange);
        document.querySelector("#start").addEventListener("click", hndSimulationLoad);
    }
    function hndSettingChange() {
        formData = new FormData(document.forms[0]);
        moneyString = formData.get("money").toString();
        pVariationString = (formData.get("variation").toString());
        Garden22.pVariationNum = parseFloat(pVariationString);
    }
    function hndSimulationLoad() {
        document.querySelector("#format").setAttribute("style", "visibility: visible");
        moneyString = formData.get("money").toString();
        Garden22.Wallet.money = parseInt(moneyString);
        document.querySelector("#settingsformat").remove();
        Garden22.fieldCanvas = document.querySelector("#field");
        Garden22.crc2 = Garden22.fieldCanvas.getContext("2d");
        currentUse = document.querySelector("#currentUse");
        document.querySelector("#carrots").addEventListener("click", getPlantButton);
        document.querySelector("#tomatos").addEventListener("click", getPlantButton);
        document.querySelector("#cucumbers").addEventListener("click", getPlantButton);
        document.querySelector("#salad").addEventListener("click", getPlantButton);
        document.querySelector("#peppers").addEventListener("click", getPlantButton);
        document.querySelector("#harvest").addEventListener("click", getToolButton);
        document.querySelector("#pesticide").addEventListener("click", getToolButton);
        document.querySelector("#water").addEventListener("click", getToolButton);
        document.querySelector("#fertalizer").addEventListener("click", getToolButton);
        document.querySelector("#buycarrots").addEventListener("click", Garden22.Market.buy);
        document.querySelector("#buytomatos").addEventListener("click", Garden22.Market.buy);
        document.querySelector("#buycucumbers").addEventListener("click", Garden22.Market.buy);
        document.querySelector("#buysalad").addEventListener("click", Garden22.Market.buy);
        document.querySelector("#buypeppers").addEventListener("click", Garden22.Market.buy);
        document.querySelector("#buyfertalizer").addEventListener("click", Garden22.Market.buy);
        document.querySelector("#buypesticide").addEventListener("click", Garden22.Market.buy);
        Garden22.Inventory.update();
        Garden22.Wallet.update();
        Garden22.Market.updatePrices();
        Garden22.fieldCanvas.addEventListener("click", getAction);
        Garden22.Field.createFields();
        window.setInterval(update, 3000);
    }
    function getAction(_event) {
        if (Garden22.Player.toolAction == Garden22.TOOLACTION.PLANT) {
            for (var _i = 0, fields_1 = Garden22.fields; _i < fields_1.length; _i++) {
                var field = fields_1[_i];
                var plantPosition = field.getClicked(_event);
                if (plantPosition == undefined) {
                    continue;
                }
                Garden22.Player.plant(plantPosition);
                field.holdPlant = true;
                break;
            }
        }
        if (Garden22.Player.toolAction == Garden22.TOOLACTION.HARVEST) {
            for (var _a = 0, fields_2 = Garden22.fields; _a < fields_2.length; _a++) {
                var field = fields_2[_a];
                var harvestPosition = field.getClicked(_event);
                if (harvestPosition == undefined) {
                    continue;
                }
                if (field.holdPlant == true) {
                    for (var i = 0; i < Garden22.plants.length; i++) {
                        if (Garden22.plants[i].position == harvestPosition && Garden22.plants[i].size > 2.7 && Garden22.plants[i].holdsPest == false) {
                            Garden22.Player.harvest(i);
                            field.draw();
                            field.holdPlant = false;
                        }
                        else {
                            continue;
                        }
                        break;
                    }
                }
            }
        }
        if (Garden22.Player.toolAction == Garden22.TOOLACTION.PESTICIDE && Garden22.Inventory.pesticideAmount > 0) {
            for (var _b = 0, fields_3 = Garden22.fields; _b < fields_3.length; _b++) {
                var field = fields_3[_b];
                var pesticidePosition = field.getClicked(_event);
                if (pesticidePosition == undefined) {
                    continue;
                }
                Garden22.Player.usePesticide(pesticidePosition, field);
            }
        }
        if (Garden22.Player.toolAction == Garden22.TOOLACTION.WATER) {
            for (var _c = 0, fields_4 = Garden22.fields; _c < fields_4.length; _c++) {
                var field = fields_4[_c];
                var waterPosition = field.getClicked(_event);
                if (waterPosition == undefined) {
                    continue;
                }
                Garden22.Player.useWater(waterPosition, field);
            }
        }
        if (Garden22.Player.toolAction == Garden22.TOOLACTION.FERTILIZE && Garden22.Inventory.fertalizerAmount > 0) {
            for (var _d = 0, fields_5 = Garden22.fields; _d < fields_5.length; _d++) {
                var field = fields_5[_d];
                var fertalizerPosition = field.getClicked(_event);
                if (fertalizerPosition == undefined) {
                    continue;
                }
                Garden22.Player.useFertalizer(fertalizerPosition, field);
            }
        }
    }
    function update() {
        for (var _i = 0, fields_6 = Garden22.fields; _i < fields_6.length; _i++) {
            var field = fields_6[_i];
            field.draw();
        }
        Garden22.Fertalizer.update();
        var r = Math.round(Math.random() * 2 + 0.2);
        if (r == 2) {
            Garden22.Pest.spawn();
        }
        Garden22.Water.update();
        for (var i = 0; i < Garden22.plants.length; i++) {
            if (Garden22.plants[i].water <= 0 && Garden22.plants[i].holdsPest == false) {
                Garden22.plants[i].draw();
                Garden22.Water.draw(Garden22.plants[i].position);
                if (Garden22.plants[i].water <= -4) {
                    for (var _a = 0, fields_7 = Garden22.fields; _a < fields_7.length; _a++) {
                        var field = fields_7[_a];
                        if (field.position == Garden22.plants[i].position) {
                            field.draw();
                            field.holdPlant = false;
                            if (Garden22.plants[i].holdsPest == true) {
                                Garden22.Pesticide.removePest(i);
                            }
                        }
                    }
                    Garden22.plants.splice(i, 1);
                    if (Garden22.plants.length > 0) {
                        Garden22.plants[i].draw();
                        Garden22.Water.draw(Garden22.plants[i].position);
                        continue;
                    }
                }
            }
            else if (Garden22.plants[i].size > 2.7 && Garden22.plants[i].holdsPest == false) {
                Garden22.plants[i].draw();
                Garden22.Plant.drawHarvestIndicator(Garden22.plants[i].position);
            }
            else if (Garden22.plants[i].size < 1 && Garden22.plants[i].holdsPest == true) {
                for (var _b = 0, fields_8 = Garden22.fields; _b < fields_8.length; _b++) {
                    var field = fields_8[_b];
                    if (field.position == Garden22.plants[i].position) {
                        field.draw();
                        field.holdPlant = false;
                    }
                }
                Garden22.Pesticide.removePest(i);
                Garden22.plants.splice(i, 1);
                if (Garden22.plants.length > 0) {
                    Garden22.plants[i].draw();
                }
            }
            else {
                Garden22.plants[i].grow();
                if (Garden22.plants[i].size > 2.7) {
                    Garden22.Plant.drawHarvestIndicator(Garden22.plants[i].position);
                }
                console.log(Garden22.plants[i].size);
            }
        }
        for (var _c = 0, pests_1 = Garden22.pests; _c < pests_1.length; _c++) {
            var pest = pests_1[_c];
            pest.draw();
        }
        Garden22.Market.updatePrices();
    }
    function getPlantButton(_event) {
        Garden22.Player.toolAction = Garden22.TOOLACTION.PLANT;
        switch (_event.target) {
            case document.querySelector("#carrots"):
                Garden22.Player.planting = Garden22.PLANTING.CARROT;
                currentUse.innerHTML = "You are currently using: CARROTS";
                break;
            case document.querySelector("#tomatos"):
                Garden22.Player.planting = Garden22.PLANTING.TOMATO;
                currentUse.innerHTML = "You are currently using: TOMATOS";
                break;
            case document.querySelector("#cucumbers"):
                Garden22.Player.planting = Garden22.PLANTING.CUCUMBER;
                currentUse.innerHTML = "You are currently using: CUCUMBERS";
                break;
            case document.querySelector("#salad"):
                Garden22.Player.planting = Garden22.PLANTING.SALAD;
                currentUse.innerHTML = "You are currently using: SALAD";
                break;
            case document.querySelector("#peppers"):
                Garden22.Player.planting = Garden22.PLANTING.PEPPER;
                currentUse.innerHTML = "You are currently using: PEPPERS";
                break;
        }
    }
    function getToolButton(_event) {
        switch (_event.target) {
            case document.querySelector("#harvest"):
                Garden22.Player.toolAction = Garden22.TOOLACTION.HARVEST;
                currentUse.innerHTML = "You are currently using: HARVEST";
                break;
            case document.querySelector("#pesticide"):
                Garden22.Player.toolAction = Garden22.TOOLACTION.PESTICIDE;
                currentUse.innerHTML = "You are currently using: PESTICIDE";
                break;
            case document.querySelector("#water"):
                Garden22.Player.toolAction = Garden22.TOOLACTION.WATER;
                currentUse.innerHTML = "You are currently using: WATER";
                break;
            case document.querySelector("#fertalizer"):
                Garden22.Player.toolAction = Garden22.TOOLACTION.FERTILIZE;
                currentUse.innerHTML = "You are currently using: FERTALIZER";
                break;
        }
    }
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=main.js.map