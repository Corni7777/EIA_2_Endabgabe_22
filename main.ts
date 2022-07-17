namespace Garden22 {
    let fieldCanvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    let currentUse: HTMLSpanElement;

    let enablePlant: boolean = false;
    let enableCarrot: boolean = false;
    let enableTomato: boolean = false;
    let enableCucumber: boolean = false;
    let enableSalad: boolean = false;
    let enablePepper: boolean = false;

    let enableHarvest: boolean = false;
    let enablePestice: boolean = false;
    let enableWater: boolean = false;
    let enableFertalizer: boolean = false;

    let carrotInventory: number = 0;
    let tomatoInventory: number = 0;
    let cucumberInventory: number = 0;
    let saladInventory: number = 0;
    let pepperInventory: number = 0;

    let fertalizerInventory: number = 0;
    let pesticideInventory: number = 0;

    let wallet: number = 20;

    let fertalizerPrice: number = Math.random() * 0.5 + 0.5;
    let pesticidePrice: number = Math.random() * 0.5 + 0.5;

    let fields: Field[] = [];
    let plants: Plant[] = [];
    let pests: Pest[] = [];

    // window.addEventListener("load", hndLoad);
    // function hndLoad(): void {
    //     document.querySelector("#start").addEventListener("click", hndSimulationLoad);
    // }

    window.addEventListener("load", hndSimulationLoad);
    function hndSimulationLoad(): void {
        fieldCanvas = document.querySelector("#field");
        crc2 = fieldCanvas.getContext("2d");
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


        updateInventory();
        updateWallet();
        updatePrices();


        fieldCanvas.addEventListener("click", getField);
        createFields();
        window.setInterval(update, 3000);
    }
    function createFields(): void {
        // fields and black lines
        let c: Vector = new Vector(10, 10);
        for (let i: number = 0; i < 40; i++) {

            if (c.x > 780) {
                c.x = 10;
                c.y = c.y + 110;
            }
            fields.push(new Field(new Vector(c.x, c.y)));
            c.x = c.x + 110;
        }
        for (let field of fields) {
            field.draw();
        }
        let w: number = 5;
        for (let i: number = 0; i < 10; i++) {
            w = w + 110;
            if (i == 0) {
                w = 5;
            }
            crc2.moveTo(w, fieldCanvas.height);
            crc2.lineTo(w, 0);

            crc2.lineWidth = 10;
            crc2.stroke();

        }
        let h: number = 5;
        for (let i: number = 0; i < 10; i++) {
            h = h + 110;
            if (i == 0) {
                h = 5;
            }
            crc2.moveTo(0, h);
            crc2.lineTo(fieldCanvas.width, h);

            crc2.lineWidth = 10;
            crc2.stroke();

        }
    }
    function getField(_event: MouseEvent): void {
        if (enablePlant == true) {
            for (let field of fields) {
                let plantPosition: Vector = field.getClicked(_event);
                if (plantPosition == undefined) {
                    continue;
                }
                plantPlant(plantPosition);
                field.holdPlant = true;
                break;
            }
        }
        if (enableHarvest == true) {
            for (let field of fields) {
                let harvestPosition: Vector = field.getClicked(_event);
                if (harvestPosition == undefined) {
                    continue;
                }
                if (field.holdPlant == true) {
                    for (let i: number = 0; i < plants.length; i++) {
                        if (plants[i].position == harvestPosition && plants[i].size > 2.76 && plants[i].holdsPest == false) {
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
        if (enablePestice == true && pesticideInventory > 0) {
            console.log(enableFertalizer);
            for (let field of fields) {
                let pesticidePosition: Vector = field.getClicked(_event);
                if (pesticidePosition == undefined) {
                    continue;
                }
                usePesticide(pesticidePosition, field);
            }
        }
        if (enableWater == true) {
            for (let field of fields) {
                let waterPosition: Vector = field.getClicked(_event);
                if (waterPosition == undefined) {
                    continue;
                }
                useWater(waterPosition, field);
            }
        }
        if (enableFertalizer == true && fertalizerInventory > 0) {
            for (let field of fields) {
                let fertalizerPosition: Vector = field.getClicked(_event);
                if (fertalizerPosition == undefined) {
                    continue;
                }
                useFertalizer(fertalizerPosition, field);
            }
        }
    }


    function plantPlant(_position: Vector): void {
        if (enableCarrot == true && carrotInventory > 0) {
            plants.push(new Carrot(_position));
            carrotInventory--;
        }
        else if (enableTomato == true && tomatoInventory > 0) {
            plants.push(new Tomato(_position));
            tomatoInventory--;
        }
        else if (enableCucumber == true && cucumberInventory > 0) {
            plants.push(new Cucumber(_position));
            cucumberInventory--;
        }
        else if (enableSalad == true && saladInventory > 0) {
            plants.push(new Salad(_position));
            saladInventory--;
        }
        else if (enablePepper == true && pepperInventory > 0) {
            plants.push(new Pepper(_position));
            pepperInventory--;
        }
        updateInventory();
        plants[plants.length - 1].draw();
    }
    function update(): void {
        for (let field of fields) {
            field.draw();
        }
        updateFertalizer();
        let r: number = Math.round(Math.random() * 2 + 0.2);
        if (r == 2) {
            spawnPest();
        }
        updateWater();
        for (let i: number = 0; i < plants.length; i++) {
            console.log(plants[i].water);
            if (plants[i].water <= 0 && plants[i].holdsPest == false) {
                plants[i].draw();
                drawWater(plants[i].position);
                if (plants[i].water <= -4) {
                    for (let field of fields) {
                        if (field.position == plants[i].position) {
                            field.draw();
                            field.holdPlant = false;
                            if (plants[i].holdsPest == true) {
                                removePest(i);
                            }
                        }
                    }
                    plants.splice(i, 1);
                    if (plants.length > 0) {
                        plants[i].draw();
                        drawWater(plants[i].position);
                        console.log(plants);
                        continue;
                    }
                }
            }
            else if (plants[i].size > 2.7 && plants[i].holdsPest == false) {
                plants[i].draw();
            }
            else if (plants[i].size < 1 && plants[i].holdsPest == true) {
                for (let field of fields) {
                    if (field.position == plants[i].position) {
                        field.draw();
                        field.holdPlant = false;
                    }
                }
                removePest(i);
                plants.splice(i, 1);
                plants[i].draw();
            }
            else { plants[i].grow(); console.log(plants[i].size)}
        }
        for (let pest of pests) {
            pest.draw();
        }
        Carrot.price = Math.random() + 1;
        Tomato.price = Math.random() + 1;
        Cucumber.price = Math.random() + 1;
        Salad.price = Math.random() + 1;
        Pepper.price = Math.random() + 1;

        fertalizerPrice = Math.random() * 0.5 + 0.5;
        pesticidePrice = Math.random() * 0.5 + 0.5;
        updatePrices();

    }
    function getPlantButton(_event: MouseEvent): void {
        allFalse();
        enablePlant = true;
        // if (_event.target == document.querySelector("#carrots")) {
        //     enableCarrot = true;
        // }
        // else if (_event.target == document.querySelector("#tomatos")) {
        //     enableTomato = true;
        // }
        // else if (_event.target == document.querySelector("#cucumbers")) {
        //     enableCucumber = true;
        // }
        // else if (_event.target == document.querySelector("#salad")) {
        //     enableSalad = true;
        // }
        // else if (_event.target == document.querySelector("#peppers")) {
        //     enablePepper = true;
        // }
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
    function getToolButton(_event: MouseEvent): void {
        allFalse();
        // if (_event.target == document.querySelector("#harvest")) {
        //     enableHarvest = true;
        // }
        // else if (_event.target == document.querySelector("#pesticide")) {
        //     enablePestice = true;
        // }
        // else if (_event.target == document.querySelector("#water")) {
        //     enableWater = true;
        // }
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
    function buy(_event: MouseEvent): void {
        if (_event.target == document.querySelector("#buycarrots") && wallet >= Carrot.price) {
            carrotInventory++;
            wallet = wallet - Carrot.price;
        }
        else if (_event.target == document.querySelector("#buytomatos") && wallet >= Tomato.price) {
            tomatoInventory++;
            wallet = wallet - Tomato.price;
        }
        else if (_event.target == document.querySelector("#buycucumbers") && wallet >= Cucumber.price) {
            cucumberInventory++;
            wallet = wallet - Cucumber.price;
        }
        else if (_event.target == document.querySelector("#buysalad") && wallet >= Salad.price) {
            saladInventory++;
            wallet = wallet - Salad.price;
        }
        else if (_event.target == document.querySelector("#buypeppers") && wallet >= Pepper.price) {
            pepperInventory++;
            wallet = wallet - Pepper.price;
        }
        else if (_event.target == document.querySelector("#buyfertalizer") && wallet > fertalizerPrice) {
            fertalizerInventory++;
            wallet = wallet - fertalizerPrice;
        }
        else if (_event.target == document.querySelector("#buypesticide") && wallet > pesticidePrice) {
            pesticideInventory++;
            wallet = wallet - pesticidePrice;
        }
        updateInventory();
        updateWallet();
    }
    function updateInventory(): void {
        document.querySelector("#carrotamount").innerHTML = carrotInventory.toString() + "x";
        document.querySelector("#tomatoamount").innerHTML = tomatoInventory.toString() + "x";
        document.querySelector("#cucumberamount").innerHTML = cucumberInventory.toString() + "x";
        document.querySelector("#saladamount").innerHTML = saladInventory.toString() + "x";
        document.querySelector("#pepperamount").innerHTML = pepperInventory.toString() + "x";

        document.querySelector("#fertalizeramount").innerHTML = fertalizerInventory.toString() + "x";
        document.querySelector("#pesticideamount").innerHTML = pesticideInventory.toString() + "x";

    }
    function updateWallet(): void {
        document.querySelector("#wallet").innerHTML = "Your Wallet: " + wallet.toFixed(2) + "€";
    }
    function updatePrices(): void {
        document.querySelector("#carrotprice").innerHTML = Carrot.price.toFixed(2) + "€";
        document.querySelector("#tomatoprice").innerHTML = Tomato.price.toFixed(2) + "€";
        document.querySelector("#cucumberprice").innerHTML = Cucumber.price.toFixed(2) + "€";
        document.querySelector("#saladprice").innerHTML = Salad.price.toFixed(2) + "€";
        document.querySelector("#pepperprice").innerHTML = Pepper.price.toFixed(2) + "€";

        document.querySelector("#fertalizerprice").innerHTML = fertalizerPrice.toFixed(2) + "€";
        document.querySelector("#pesticideprice").innerHTML = pesticidePrice.toFixed(2) + "€";
    }
    function harvest(_i: number): void {
        // for (let i: number = 0; i < plants.length; i++) {
        //     if (plants[i].position == _position) {
        // if (plants[_i].name == "Carrot") {
        //     wallet = wallet + Carrot.price;
        // }
        // if (plants[_i].name == "Tomato") {
        //     wallet = wallet + Tomato.price;
        // }
        // if (plants[_i].name == "Cucumber") {
        //     wallet = wallet + Cucumber.price;
        // }
        // if (plants[_i].name == "Salad") {
        //     wallet = wallet + Salad.price;
        // }
        // if (plants[_i].name == "Pepper") {
        //     wallet = wallet + Pepper.price;
        // }
        switch (plants[_i].name) {
            case "Carrot":
                wallet = wallet + Carrot.price;
            case "Tomato":
                wallet = wallet + Tomato.price;
            case "Cucumber":
                wallet = wallet + Cucumber.price;
            case "Salad":
                wallet = wallet + Salad.price;
            case "Pepper":
                wallet = wallet + Pepper.price;
        }
        updateWallet();
        plants.splice(_i, 1);
    }
    function spawnPest(): void {
        if (plants.length > 0) {
            let x: number = Math.round(Math.random() * (plants.length - 1));
            if (plants[x].holdsPest == false && plants[x].water > 0 && plants[x].size > 1.4) {
                pests.push(new Pest(plants[x].position));
                plants[x].recievePest();
                for (let pest of pests) {
                    pest.draw();
                }
            }
            else if (plants[x].holdsPest == undefined || plants[x].holdsPest == true) {
                return;
            }
        }
    }
    function usePesticide(_position: Vector, _field: Field): void {
        for (let i: number = 0; i < plants.length; i++) {
            if (plants[i].position == _position && plants[i].holdsPest == true && plants[i].water > 0) {
                plants[i].holdsPest = false;
                plants[i].growthrate = plants[i].growthrate * - 1;
                removePest(i);
                pesticideInventory--;
                updateInventory();
                _field.draw();
                updateFertalizer();
                plants[i].draw();
            }
        }
    }
    function removePest(_i: number): void {
        for (let j: number = 0; j < pests.length; j++) {
            if (pests[j].position == plants[_i].position) {
                pests.splice(j, 1);
            }
        }
    }
    function useWater(_position: Vector, _field: Field): void {
        for (let i: number = 0; i < plants.length; i++) {
            if (plants[i].position == _position && plants[i].water <= 0) {
                plants[i].water = 5;
                _field.draw();
                updateFertalizer();
                plants[i].draw();
            }
            else if (plants[i].position == _position && plants[i].water > 0) {
                if (plants[i].holdsPest == true) {
                    removePest(i);
                }
                plants.splice(i, 1);
                _field.draw();
            }
        }
    }
    function updateWater(): void {
        for (let plant of plants) {
            if (plant.holdsPest == false) {
                plant.water--;
            }
        }
    }
    function drawWater(_position: Vector): void {
        crc2.save();
        crc2.fillStyle = "deepskyblue";
        crc2.fillRect(_position.x + 80, _position.y, 20, 20);
        crc2.restore();
    }
    function allFalse(): void {
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
    function useFertalizer(_position: Vector, _field: Field): void {
        for (let i: number = 0; i < plants.length; i++) {
            if (plants[i].position == _position && plants[i].fertalized == false) {
                plants[i].fertalized = true;
                drawFertalizer(_position);
                fertalizerInventory --;
                updateInventory();
                plants[i].growthrate = plants[i].growthrate + 0.2;

            }
            else if (plants[i].position == _position && plants[i].fertalized == true) {
                if (plants[i].holdsPest == true) {
                    removePest(i);
                }
                plants.splice(i, 1);
                _field.draw();  
                console.log(plants); 
            }   
        }
    }
    function updateFertalizer(): void {
        for (let plant of plants) {
            if (plant.fertalized == true) {
                drawFertalizer(plant.position);
            }
        }
    }
    function drawFertalizer(_position: Vector): void {
        crc2.save();
        crc2.strokeStyle = "white";
        crc2.beginPath();
        crc2.moveTo(_position.x + 1, _position.y + 1);
        crc2.lineTo(_position.x + 99, _position.y + 1);
        crc2.lineTo(_position.x + 99, _position.y + 99);
        crc2.lineTo(_position.x + 1, _position.y + 99);
        crc2.closePath();
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.restore();
    }
}



