namespace Garden22 {
    export let fieldCanvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    let currentUse: HTMLSpanElement;

    let formData: FormData;
    let moneyString: string;
    let pVariationString: string;
    export let pVariationNum: number;
    export let fields: Field[] = [];
    export let plants: Plant[] = [];
    export let pests: Pest[] = [];

    window.addEventListener("load", hndLoad);
    function hndLoad(): void {
        formData = new FormData(document.forms[0]);
        pVariationString = (formData.get("variation").toString());
        pVariationNum = parseFloat(pVariationString);
        document.querySelector("#settings").addEventListener("change", hndSettingChange);
        document.querySelector("#start").addEventListener("click", hndSimulationLoad);
    }
    function hndSettingChange(): void {
        formData = new FormData(document.forms[0]);
        moneyString = formData.get("money").toString();
        pVariationString = (formData.get("variation").toString());
        pVariationNum = parseFloat(pVariationString);
    }

    function hndSimulationLoad(): void {
        document.querySelector("#format").setAttribute("style", "visibility: visible");
        moneyString = formData.get("money").toString();
        Wallet.money = parseInt(moneyString);

        
        document.querySelector("#settingsformat").remove();
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


        document.querySelector("#buycarrots").addEventListener("click", Market.buy);
        document.querySelector("#buytomatos").addEventListener("click", Market.buy);
        document.querySelector("#buycucumbers").addEventListener("click", Market.buy);
        document.querySelector("#buysalad").addEventListener("click", Market.buy);
        document.querySelector("#buypeppers").addEventListener("click", Market.buy);

        document.querySelector("#buyfertalizer").addEventListener("click", Market.buy);
        document.querySelector("#buypesticide").addEventListener("click", Market.buy);


        Inventory.update();
        Wallet.update();
        Market.updatePrices();


        fieldCanvas.addEventListener("click", getAction);
        Field.createFields();
        window.setInterval(update, 3000);
    }
    function getAction(_event: MouseEvent): void {
        if (Player.toolAction == TOOLACTION.PLANT) {
            for (let field of fields) {
                let plantPosition: Vector = field.getClicked(_event);
                if (plantPosition == undefined) {
                    continue;
                }
                Player.plant(plantPosition);
                field.holdPlant = true;
                break;
            }
        }
        if (Player.toolAction == TOOLACTION.HARVEST) {
            for (let field of fields) {
                let harvestPosition: Vector = field.getClicked(_event);
                if (harvestPosition == undefined) {
                    continue;
                }
                if (field.holdPlant == true) {
                    for (let i: number = 0; i < plants.length; i++) {
                        if (plants[i].position == harvestPosition && plants[i].size > 2.7 && plants[i].holdsPest == false) {
                            Player.harvest(i);
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
        if (Player.toolAction == TOOLACTION.PESTICIDE && Inventory.pesticideAmount > 0) {
            for (let field of fields) {
                let pesticidePosition: Vector = field.getClicked(_event);
                if (pesticidePosition == undefined) {
                    continue;
                }
                Player.usePesticide(pesticidePosition, field);
            }
        }
        if (Player.toolAction == TOOLACTION.WATER) {
            for (let field of fields) {
                let waterPosition: Vector = field.getClicked(_event);
                if (waterPosition == undefined) {
                    continue;
                }
                Player.useWater(waterPosition, field);
            }
        }
        if (Player.toolAction == TOOLACTION.FERTILIZE && Inventory.fertalizerAmount > 0) {
            for (let field of fields) {
                let fertalizerPosition: Vector = field.getClicked(_event);
                if (fertalizerPosition == undefined) {
                    continue;
                }
                Player.useFertalizer(fertalizerPosition, field);
            }
        }
    }

    function update(): void {
        for (let field of fields) {
            field.draw();
        }
        Fertalizer.update();
        let r: number = Math.round(Math.random() * 2 + 0.2);
        if (r == 2) {
            Pest.spawn();
        }
        Water.update();
        for (let i: number = 0; i < plants.length; i++) {
            if (plants[i].water <= 0 && plants[i].holdsPest == false) {
                plants[i].draw();
                Water.draw(plants[i].position);
                if (plants[i].water <= -4) {
                    for (let field of fields) {
                        if (field.position == plants[i].position) {
                            field.draw();
                            field.holdPlant = false;
                            if (plants[i].holdsPest == true) {
                                Pesticide.removePest(i);
                            }
                        }
                    }
                    plants.splice(i, 1);
                    if (plants.length > 0) {
                        plants[i].draw();
                        Water.draw(plants[i].position);
                        continue;
                    }
                }
            }
            else if (plants[i].size > 2.7 && plants[i].holdsPest == false) {
                plants[i].draw();
                Plant.drawHarvestIndicator(plants[i].position);
            }
            else if (plants[i].size < 1 && plants[i].holdsPest == true) {
                for (let field of fields) {
                    if (field.position == plants[i].position) {
                        field.draw();
                        field.holdPlant = false;
                    }
                }
                Pesticide.removePest(i);
                plants.splice(i, 1);
                if (plants.length > 0) { plants[i].draw(); }
            }
            else {
                plants[i].grow();
                if (plants[i].size > 2.7) {
                    Plant.drawHarvestIndicator(plants[i].position);
                }
                console.log(plants[i].size);
            }
        }
        for (let pest of pests) {
            pest.draw();
        }
        Market.updatePrices();

    }
    function getPlantButton(_event: MouseEvent): void {
        Player.toolAction = TOOLACTION.PLANT;
        switch (_event.target) {
            case document.querySelector("#carrots"):
                Player.planting = PLANTING.CARROT;
                currentUse.innerHTML = "You are currently using: CARROTS";
                break;
            case document.querySelector("#tomatos"):
                Player.planting = PLANTING.TOMATO;
                currentUse.innerHTML = "You are currently using: TOMATOS";
                break;
            case document.querySelector("#cucumbers"):
                Player.planting = PLANTING.CUCUMBER;
                currentUse.innerHTML = "You are currently using: CUCUMBERS";
                break;
            case document.querySelector("#salad"):
                Player.planting = PLANTING.SALAD;
                currentUse.innerHTML = "You are currently using: SALAD";
                break;
            case document.querySelector("#peppers"):
                Player.planting = PLANTING.PEPPER;
                currentUse.innerHTML = "You are currently using: PEPPERS";
                break;
        }
    }
    function getToolButton(_event: MouseEvent): void {
        switch (_event.target) {
            case document.querySelector("#harvest"):
                Player.toolAction = TOOLACTION.HARVEST;
                currentUse.innerHTML = "You are currently using: HARVEST";
                break;
            case document.querySelector("#pesticide"):
                Player.toolAction = TOOLACTION.PESTICIDE;
                currentUse.innerHTML = "You are currently using: PESTICIDE";
                break;
            case document.querySelector("#water"):
                Player.toolAction = TOOLACTION.WATER;
                currentUse.innerHTML = "You are currently using: WATER";
                break;
            case document.querySelector("#fertalizer"):
                Player.toolAction = TOOLACTION.FERTILIZE;
                currentUse.innerHTML = "You are currently using: FERTALIZER";
                break;

        }
    }
}
