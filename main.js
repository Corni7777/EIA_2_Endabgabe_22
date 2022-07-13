var Garden22;
(function (Garden22) {
    var fieldCanvas;
    var enablePlant = false;
    var enableCarrot = false;
    var enableTomato = false;
    var enableCucumber = false;
    var enableSalad = false;
    var enablePepper = false;
    var carrotInventory = 0;
    var tomatoInventory = 0;
    var cucumberInventory = 0;
    var saladInventory = 0;
    var pepperInventory = 0;
    var wallet = 20;
    var fields = [];
    var plants = [];
    // window.addEventListener("load", hndLoad);
    // function hndLoad(): void {
    //     document.querySelector("#start").addEventListener("click", hndSimulationLoad);
    // }
    window.addEventListener("load", hndSimulationLoad);
    function hndSimulationLoad() {
        fieldCanvas = document.querySelector("#field");
        Garden22.crc2 = fieldCanvas.getContext("2d");
        document.querySelector("#carrots").addEventListener("click", getPlantButton);
        document.querySelector("#tomatos").addEventListener("click", getPlantButton);
        document.querySelector("#cucumbers").addEventListener("click", getPlantButton);
        document.querySelector("#salad").addEventListener("click", getPlantButton);
        document.querySelector("#peppers").addEventListener("click", getPlantButton);
        document.querySelector("#buycarrots").addEventListener("click", buyPlant);
        document.querySelector("#buytomatos").addEventListener("click", buyPlant);
        document.querySelector("#buycucumbers").addEventListener("click", buyPlant);
        document.querySelector("#buysalad").addEventListener("click", buyPlant);
        document.querySelector("#buypeppers").addEventListener("click", buyPlant);
        updateInventory();
        updateWallet();
        fieldCanvas.addEventListener("click", getField);
        drawField();
        window.setInterval(update, 2000);
    }
    function drawField() {
        var c = new Garden22.Vector(10, 10);
        for (var i = 0; i < 40; i++) {
            if (c.x > 780) {
                c.x = 10;
                c.y = c.y + 110;
            }
            fields.push(new Garden22.Field(new Garden22.Vector(c.x, c.y)));
            c.x = c.x + 110;
        }
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
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
            for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
                var field = fields_2[_i];
                var plantPosition = field.getClicked(_event);
                if (plantPosition == undefined) {
                    continue;
                }
                plantPlant(plantPosition);
                break;
            }
            enablePlant = false;
        }
    }
    function plantPlant(_position) {
        if (enableCarrot == true && carrotInventory > 0) {
            plants.push(new Garden22.Carrot(_position));
            enableCarrot = false;
            carrotInventory--;
        }
        else if (enableTomato == true && tomatoInventory > 0) {
            plants.push(new Garden22.Tomato(_position));
            enableTomato = false;
            tomatoInventory--;
        }
        else if (enableCucumber == true && cucumberInventory > 0) {
            plants.push(new Garden22.Cucumber(_position));
            enableCucumber = false;
            cucumberInventory--;
        }
        else if (enableSalad == true && saladInventory > 0) {
            plants.push(new Garden22.Salad(_position));
            enableSalad = false;
            saladInventory--;
        }
        else if (enablePepper == true && pepperInventory > 0) {
            plants.push(new Garden22.Pepper(_position));
            enablePepper = false;
            pepperInventory--;
        }
        updateInventory();
        plants[plants.length - 1].draw();
    }
    function update() {
        for (var _i = 0, plants_1 = plants; _i < plants_1.length; _i++) {
            var plant = plants_1[_i];
            if (plant.size > 2.8) {
                continue;
            }
            plant.grow();
        }
    }
    function getPlantButton(_event) {
        enablePlant = true;
        if (_event.target == document.querySelector("#carrots")) {
            enableCarrot = true;
        }
        else if (_event.target == document.querySelector("#tomatos")) {
            enableTomato = true;
        }
        else if (_event.target == document.querySelector("#cucumbers")) {
            enableCucumber = true;
        }
        else if (_event.target == document.querySelector("#salad")) {
            enableSalad = true;
        }
        else if (_event.target == document.querySelector("#peppers")) {
            enablePepper = true;
        }
    }
    function buyPlant(_event) {
        if (_event.target == document.querySelector("#buycarrots") && wallet >= Garden22.Carrot.price) {
            carrotInventory++;
            wallet = wallet - Garden22.Carrot.price;
        }
        else if (_event.target == document.querySelector("#buytomatos") && wallet >= Garden22.Tomato.price) {
            tomatoInventory++;
            wallet = wallet - Garden22.Tomato.price;
        }
        else if (_event.target == document.querySelector("#buycucumbers") && wallet >= Garden22.Cucumber.price) {
            cucumberInventory++;
            wallet = wallet - Garden22.Cucumber.price;
        }
        else if (_event.target == document.querySelector("#buysalad") && wallet >= Garden22.Salad.price) {
            saladInventory++;
            wallet = wallet - Garden22.Salad.price;
        }
        else if (_event.target == document.querySelector("#buypeppers") && wallet >= Garden22.Pepper.price) {
            pepperInventory++;
            wallet = wallet - Garden22.Pepper.price;
        }
        updateInventory();
        updateWallet();
    }
    function updateInventory() {
        document.querySelector("#carrotamount").innerHTML = carrotInventory.toString() + "x";
        document.querySelector("#tomatoamount").innerHTML = tomatoInventory.toString() + "x";
        document.querySelector("#cucumberamount").innerHTML = cucumberInventory.toString() + "x";
        document.querySelector("#saladamount").innerHTML = saladInventory.toString() + "x";
        document.querySelector("#pepperamount").innerHTML = pepperInventory.toString() + "x";
    }
    function updateWallet() {
        document.querySelector("#wallet").innerHTML = "Your Wallet: " + wallet.toString() + "€";
    }
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=main.js.map