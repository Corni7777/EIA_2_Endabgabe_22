var Garden22;
(function (Garden22) {
    var fieldCanvas;
    var currentUse;
    var formData;
    var moneyString;
    var pVariationString;
    var pVariationNum;
    var enablePlant = false;
    var enableCarrot = false;
    var enableTomato = false;
    var enableCucumber = false;
    var enableSalad = false;
    var enablePepper = false;
    var enableHarvest = false;
    var enablePestice = false;
    var enableWater = false;
    var enableFertalizer = false;
    var carrotInventory = 0;
    var tomatoInventory = 0;
    var cucumberInventory = 0;
    var saladInventory = 0;
    var pepperInventory = 0;
    var fertalizerInventory = 0;
    var pesticideInventory = 0;
    var wallet;
    var fertalizerPrice = Math.random() * 0.5 + 0.5;
    var pesticidePrice = Math.random() * 0.5 + 0.5;
    var fields = [];
    Garden22.plants = [];
    var pests = [];
    window.addEventListener("load", hndLoad);
    function hndLoad() {
        formData = new FormData(document.forms[0]);
        pVariationString = (formData.get("variation").toString());
        pVariationNum = parseFloat(pVariationString);
        document.querySelector("#settings").addEventListener("change", hndSettingChange);
        document.querySelector("#start").addEventListener("click", hndSimulationLoad);
    }
    function hndSettingChange() {
        formData = new FormData(document.forms[0]);
        moneyString = formData.get("money").toString();
        pVariationString = (formData.get("variation").toString());
        pVariationNum = parseFloat(pVariationString);
    }
    // window.addEventListener("load", hndSimulationLoad);
    function hndSimulationLoad() {
        document.querySelector("#format").setAttribute("style", "visibility: visible");
        moneyString = formData.get("money").toString();
        wallet = parseInt(moneyString);
        console.log(wallet);
        document.querySelector("#settingsformat").remove();
        fieldCanvas = document.querySelector("#field");
        Garden22.crc2 = fieldCanvas.getContext("2d");
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
        document.querySelector("#buycarrots").addEventListener("click", buy);
        document.querySelector("#buytomatos").addEventListener("click", buy);
        document.querySelector("#buycucumbers").addEventListener("click", buy);
        document.querySelector("#buysalad").addEventListener("click", buy);
        document.querySelector("#buypeppers").addEventListener("click", buy);
        document.querySelector("#buyfertalizer").addEventListener("click", buy);
        document.querySelector("#buypesticide").addEventListener("click", buy);
        Garden22.Inventory.update();
        updateWallet();
        updatePrices();
        fieldCanvas.addEventListener("click", getField);
        createFields();
        window.setInterval(update, 3000);
    }
    function createFields() {
        // fields and black lines
        var c = new Garden22.Vector(10, 10);
        for (var i = 0; i < 40; i++) {
            if (c.x > 780) {
                c.x = 10;
                c.y = c.y + 110;
            }
            fields.push(new Garden22.Field(new Garden22.Vector(c.x, c.y)));
            c.x = c.x + 110;
        }
        for (var _a = 0, fields_1 = fields; _a < fields_1.length; _a++) {
            var field = fields_1[_a];
            field.draw();
        }
        var w = 5;
        for (var i = 0; i < 10; i++) {
            w = w + 110;
            if (i == 0) {
                w = 5;
            }
            Garden22.crc2.moveTo(w, fieldCanvas.height);
            Garden22.crc2.lineTo(w, 0);
            Garden22.crc2.lineWidth = 10;
            Garden22.crc2.stroke();
        }
        var h = 5;
        for (var i = 0; i < 10; i++) {
            h = h + 110;
            if (i == 0) {
                h = 5;
            }
            Garden22.crc2.moveTo(0, h);
            Garden22.crc2.lineTo(fieldCanvas.width, h);
            Garden22.crc2.lineWidth = 10;
            Garden22.crc2.stroke();
        }
    }
    function getField(_event) {
        if (enablePlant == true) {
            for (var _a = 0, fields_2 = fields; _a < fields_2.length; _a++) {
                var field = fields_2[_a];
                var plantPosition = field.getClicked(_event);
                if (plantPosition == undefined) {
                    continue;
                }
                plantPlant(plantPosition);
                field.holdPlant = true;
                break;
            }
        }
        if (enableHarvest == true) {
            for (var _b = 0, fields_3 = fields; _b < fields_3.length; _b++) {
                var field = fields_3[_b];
                var harvestPosition = field.getClicked(_event);
                if (harvestPosition == undefined) {
                    continue;
                }
                if (field.holdPlant == true) {
                    for (var i = 0; i < Garden22.plants.length; i++) {
                        if (Garden22.plants[i].position == harvestPosition && Garden22.plants[i].size > 2.76 && Garden22.plants[i].holdsPest == false) {
                            harvest(i);
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
        if (enablePestice == true && Garden22.Inventory.pesticideAmount > 0) {
            console.log(enableFertalizer);
            for (var _c = 0, fields_4 = fields; _c < fields_4.length; _c++) {
                var field = fields_4[_c];
                var pesticidePosition = field.getClicked(_event);
                if (pesticidePosition == undefined) {
                    continue;
                }
                usePesticide(pesticidePosition, field);
            }
        }
        if (enableWater == true) {
            for (var _d = 0, fields_5 = fields; _d < fields_5.length; _d++) {
                var field = fields_5[_d];
                var waterPosition = field.getClicked(_event);
                if (waterPosition == undefined) {
                    continue;
                }
                useWater(waterPosition, field);
            }
        }
        if (enableFertalizer == true && Garden22.Inventory.fertalizerAmount > 0) {
            for (var _e = 0, fields_6 = fields; _e < fields_6.length; _e++) {
                var field = fields_6[_e];
                var fertalizerPosition = field.getClicked(_event);
                if (fertalizerPosition == undefined) {
                    continue;
                }
                useFertalizer(fertalizerPosition, field);
            }
        }
    }
    function plantPlant(_position) {
        if (enableCarrot == true && Garden22.Inventory.carrotAmount > 0) {
            Garden22.plants.push(new Garden22.Carrot(_position));
            Garden22.Inventory.carrotAmount--;
        }
        else if (enableTomato == true && Garden22.Inventory.tomatoAmount > 0) {
            Garden22.plants.push(new Garden22.Tomato(_position));
            Garden22.Inventory.tomatoAmount--;
        }
        else if (enableCucumber == true && Garden22.Inventory.cucumberAmount > 0) {
            Garden22.plants.push(new Garden22.Cucumber(_position));
            Garden22.Inventory.cucumberAmount--;
        }
        else if (enableSalad == true && Garden22.Inventory.saladAmount > 0) {
            Garden22.plants.push(new Garden22.Salad(_position));
            Garden22.Inventory.saladAmount--;
        }
        else if (enablePepper == true && Garden22.Inventory.pepperAmount > 0) {
            Garden22.plants.push(new Garden22.Pepper(_position));
            Garden22.Inventory.pepperAmount--;
        }
        Garden22.Inventory.update();
        Garden22.plants[Garden22.plants.length - 1].draw();
    }
    function update() {
        for (var _a = 0, fields_7 = fields; _a < fields_7.length; _a++) {
            var field = fields_7[_a];
            field.draw();
        }
        Garden22.Fertalizer.update();
        var r = Math.round(Math.random() * 2 + 0.2);
        if (r == 2) {
            spawnPest();
        }
        updateWater();
        for (var i = 0; i < Garden22.plants.length; i++) {
            console.log(Garden22.plants[i].water);
            if (Garden22.plants[i].water <= 0 && Garden22.plants[i].holdsPest == false) {
                Garden22.plants[i].draw();
                drawWater(Garden22.plants[i].position);
                if (Garden22.plants[i].water <= -4) {
                    for (var _b = 0, fields_8 = fields; _b < fields_8.length; _b++) {
                        var field = fields_8[_b];
                        if (field.position == Garden22.plants[i].position) {
                            field.draw();
                            field.holdPlant = false;
                            if (Garden22.plants[i].holdsPest == true) {
                                removePest(i);
                            }
                        }
                    }
                    Garden22.plants.splice(i, 1);
                    if (Garden22.plants.length > 0) {
                        Garden22.plants[i].draw();
                        drawWater(Garden22.plants[i].position);
                        console.log(Garden22.plants);
                        continue;
                    }
                }
            }
            else if (Garden22.plants[i].size > 2.7 && Garden22.plants[i].holdsPest == false) {
                Garden22.plants[i].draw();
                drawHarvestIndicator(Garden22.plants[i].position);
            }
            else if (Garden22.plants[i].size < 1 && Garden22.plants[i].holdsPest == true) {
                for (var _c = 0, fields_9 = fields; _c < fields_9.length; _c++) {
                    var field = fields_9[_c];
                    if (field.position == Garden22.plants[i].position) {
                        field.draw();
                        field.holdPlant = false;
                    }
                }
                removePest(i);
                Garden22.plants.splice(i, 1);
                if (Garden22.plants.length > 0) {
                    Garden22.plants[i].draw();
                }
            }
            else {
                Garden22.plants[i].grow();
                if (Garden22.plants[i].size > 2.7) {
                    drawHarvestIndicator(Garden22.plants[i].position);
                }
                console.log(Garden22.plants[i].size);
            }
        }
        for (var _d = 0, pests_1 = pests; _d < pests_1.length; _d++) {
            var pest = pests_1[_d];
            pest.draw();
        }
        Garden22.Carrot.price = Math.random() * pVariationNum + 1;
        Garden22.Tomato.price = Math.random() * pVariationNum + 1;
        Garden22.Cucumber.price = Math.random() * pVariationNum + 1;
        Garden22.Salad.price = Math.random() * pVariationNum + 1;
        Garden22.Pepper.price = Math.random() * pVariationNum + 1;
        fertalizerPrice = Math.random() * pVariationNum + 0.5;
        pesticidePrice = Math.random() * pVariationNum + 0.5;
        updatePrices();
    }
    function getPlantButton(_event) {
        allFalse();
        enablePlant = true;
        switch (_event.target) {
            case document.querySelector("#carrots"):
                enableCarrot = true;
                currentUse.innerHTML = "You are currently using: CARROTS";
                break;
            case document.querySelector("#tomatos"):
                enableTomato = true;
                currentUse.innerHTML = "You are currently using: TOMATOS";
                break;
            case document.querySelector("#cucumbers"):
                enableCucumber = true;
                currentUse.innerHTML = "You are currently using: CUCUMBERS";
                break;
            case document.querySelector("#salad"):
                enableSalad = true;
                currentUse.innerHTML = "You are currently using: SALAD";
                break;
            case document.querySelector("#peppers"):
                enablePepper = true;
                currentUse.innerHTML = "You are currently using: PEPPERS";
                break;
        }
    }
    function getToolButton(_event) {
        allFalse();
        switch (_event.target) {
            case document.querySelector("#harvest"):
                enableHarvest = true;
                currentUse.innerHTML = "You are currently using: HARVEST";
                break;
            case document.querySelector("#pesticide"):
                enablePestice = true;
                currentUse.innerHTML = "You are currently using: PESTICIDE";
                break;
            case document.querySelector("#water"):
                enableWater = true;
                currentUse.innerHTML = "You are currently using: WATER";
                break;
            case document.querySelector("#fertalizer"):
                enableFertalizer = true;
                currentUse.innerHTML = "You are currently using: FERTALIZER";
                break;
        }
    }
    function buy(_event) {
        if (_event.target == document.querySelector("#buycarrots") && wallet >= Garden22.Carrot.price) {
            Garden22.Inventory.carrotAmount++;
            wallet = wallet - Garden22.Carrot.price * 2;
        }
        else if (_event.target == document.querySelector("#buytomatos") && wallet >= Garden22.Tomato.price) {
            Garden22.Inventory.tomatoAmount++;
            wallet = wallet - Garden22.Tomato.price * 2;
        }
        else if (_event.target == document.querySelector("#buycucumbers") && wallet >= Garden22.Cucumber.price) {
            Garden22.Inventory.cucumberAmount++;
            wallet = wallet - Garden22.Cucumber.price * 2;
        }
        else if (_event.target == document.querySelector("#buysalad") && wallet >= Garden22.Salad.price) {
            Garden22.Inventory.saladAmount++;
            wallet = wallet - Garden22.Salad.price * 2;
        }
        else if (_event.target == document.querySelector("#buypeppers") && wallet >= Garden22.Pepper.price) {
            Garden22.Inventory.pepperAmount++;
            wallet = wallet - Garden22.Pepper.price * 2;
        }
        else if (_event.target == document.querySelector("#buyfertalizer") && wallet > fertalizerPrice) {
            Garden22.Inventory.fertalizerAmount++;
            wallet = wallet - fertalizerPrice;
        }
        else if (_event.target == document.querySelector("#buypesticide") && wallet > pesticidePrice) {
            Garden22.Inventory.pesticideAmount++;
            wallet = wallet - pesticidePrice;
        }
        Garden22.Inventory.update();
        updateWallet();
    }
    function updateWallet() {
        document.querySelector("#wallet").innerHTML = "Your Wallet: " + wallet.toFixed(2) + "€";
    }
    function updatePrices() {
        document.querySelector("#carrotprice").innerHTML = Garden22.Carrot.price.toFixed(2) + "€";
        document.querySelector("#tomatoprice").innerHTML = Garden22.Tomato.price.toFixed(2) + "€";
        document.querySelector("#cucumberprice").innerHTML = Garden22.Cucumber.price.toFixed(2) + "€";
        document.querySelector("#saladprice").innerHTML = Garden22.Salad.price.toFixed(2) + "€";
        document.querySelector("#pepperprice").innerHTML = Garden22.Pepper.price.toFixed(2) + "€";
        document.querySelector("#fertalizerprice").innerHTML = fertalizerPrice.toFixed(2) + "€";
        document.querySelector("#pesticideprice").innerHTML = pesticidePrice.toFixed(2) + "€";
    }
    function harvest(_i) {
        switch (Garden22.plants[_i].name) {
            case "Carrot":
                wallet = wallet + Garden22.Carrot.price;
            case "Tomato":
                wallet = wallet + Garden22.Tomato.price;
            case "Cucumber":
                wallet = wallet + Garden22.Cucumber.price;
            case "Salad":
                wallet = wallet + Garden22.Salad.price;
            case "Pepper":
                wallet = wallet + Garden22.Pepper.price;
        }
        updateWallet();
        Garden22.plants.splice(_i, 1);
    }
    function drawHarvestIndicator(_position) {
        Garden22.crc2.save();
        Garden22.crc2.strokeStyle = "goldenrod";
        Garden22.crc2.translate(_position.x, _position.y);
        Garden22.crc2.beginPath();
        Garden22.crc2.moveTo(3, 3);
        Garden22.crc2.lineTo(97, 3);
        Garden22.crc2.lineTo(97, 97);
        Garden22.crc2.lineTo(3, 97);
        Garden22.crc2.closePath();
        Garden22.crc2.lineWidth = 6;
        Garden22.crc2.stroke();
        Garden22.crc2.restore();
    }
    function spawnPest() {
        if (Garden22.plants.length > 0) {
            var x = Math.round(Math.random() * (Garden22.plants.length - 1));
            if (Garden22.plants[x].holdsPest == false && Garden22.plants[x].water > 0 && Garden22.plants[x].size > 1.4) {
                pests.push(new Garden22.Pest(Garden22.plants[x].position));
                Garden22.plants[x].recievePest();
                for (var _a = 0, pests_2 = pests; _a < pests_2.length; _a++) {
                    var pest = pests_2[_a];
                    pest.draw();
                }
            }
            else if (Garden22.plants[x].holdsPest == undefined || Garden22.plants[x].holdsPest == true) {
                return;
            }
        }
    }
    function usePesticide(_position, _field) {
        for (var i = 0; i < Garden22.plants.length; i++) {
            if (Garden22.plants[i].position == _position && Garden22.plants[i].holdsPest == true && Garden22.plants[i].water > 0) {
                Garden22.plants[i].holdsPest = false;
                Garden22.plants[i].growthrate = Garden22.plants[i].growthrate * -1;
                removePest(i);
                pesticideInventory--;
                Garden22.Inventory.update();
                _field.draw();
                Garden22.Fertalizer.update();
                Garden22.plants[i].draw();
            }
        }
    }
    function removePest(_i) {
        for (var j = 0; j < pests.length; j++) {
            if (pests[j].position == Garden22.plants[_i].position) {
                pests.splice(j, 1);
            }
        }
    }
    function useWater(_position, _field) {
        for (var i = 0; i < Garden22.plants.length; i++) {
            if (Garden22.plants[i].position == _position && Garden22.plants[i].water <= 0) {
                Garden22.plants[i].water = 5;
                _field.draw();
                Garden22.Fertalizer.update();
                Garden22.plants[i].draw();
            }
            else if (Garden22.plants[i].position == _position && Garden22.plants[i].water > 0) {
                if (Garden22.plants[i].holdsPest == true) {
                    removePest(i);
                }
                Garden22.plants.splice(i, 1);
                _field.draw();
            }
        }
    }
    function updateWater() {
        for (var _a = 0, plants_1 = Garden22.plants; _a < plants_1.length; _a++) {
            var plant = plants_1[_a];
            if (plant.holdsPest == false) {
                plant.water--;
            }
        }
    }
    function drawWater(_position) {
        Garden22.crc2.save();
        Garden22.crc2.fillStyle = "deepskyblue";
        Garden22.crc2.fillRect(_position.x + 80, _position.y, 20, 20);
        Garden22.crc2.restore();
    }
    function allFalse() {
        enablePlant = false;
        enableCarrot = false;
        enableTomato = false;
        enableCucumber = false;
        enableSalad = false;
        enablePepper = false;
        enableHarvest = false;
        enablePestice = false;
        enableWater = false;
        enableFertalizer = false;
    }
    function useFertalizer(_position, _field) {
        for (var i = 0; i < Garden22.plants.length; i++) {
            if (Garden22.plants[i].position == _position && Garden22.plants[i].fertalized == false) {
                Garden22.plants[i].fertalized = true;
                Garden22.Fertalizer.draw(_position);
                fertalizerInventory--;
                Garden22.Inventory.update();
                Garden22.plants[i].growthrate = Garden22.plants[i].growthrate + 0.2;
            }
            else if (Garden22.plants[i].position == _position && Garden22.plants[i].fertalized == true) {
                if (Garden22.plants[i].holdsPest == true) {
                    removePest(i);
                }
                Garden22.plants.splice(i, 1);
                _field.draw();
                console.log(Garden22.plants);
            }
        }
    }
    function updateFertalizer() {
        for (var _a = 0, plants_2 = Garden22.plants; _a < plants_2.length; _a++) {
            var plant = plants_2[_a];
            if (plant.fertalized == true) {
                Garden22.Fertalizer.draw(plant.position);
            }
        }
    }
    // function drawFertalizer(_position: Vector): void {
    //     crc2.save();
    //     crc2.strokeStyle = "white";
    //     crc2.translate(_position.x, _position.y);
    //     crc2.beginPath();
    //     crc2.moveTo(1, 1);
    //     crc2.lineTo(99, 1);
    //     crc2.lineTo(99, 99);
    //     crc2.lineTo(1, 99);
    //     crc2.closePath();
    //     crc2.lineWidth = 2;
    //     crc2.stroke();
    //     crc2.restore();
    // }
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=main.js.map