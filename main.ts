namespace Garden22 {
    let fieldCanvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    let enablePlant: boolean = false;
    let enableCarrot: boolean = false;
    let enableTomato: boolean = false;
    let enableCucumber: boolean = false;
    let enableSalad: boolean = false;
    let enablePepper: boolean = false;

    let carrotInventory: number = 0;
    let tomatoInventory: number = 0;
    let cucumberInventory: number = 0;
    let saladInventory: number = 0;
    let pepperInventory: number = 0;

    let wallet: number = 20;

    let fields: Field[] = [];
    let plants: Plant[] = [];

    // window.addEventListener("load", hndLoad);
    // function hndLoad(): void {
    //     document.querySelector("#start").addEventListener("click", hndSimulationLoad);
    // }

    window.addEventListener("load", hndSimulationLoad);
    function hndSimulationLoad(): void {
        fieldCanvas = document.querySelector("#field");
        crc2 = fieldCanvas.getContext("2d");

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
    function drawField(): void {
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
                break;
            }
            enablePlant = false;
        }
    }
    function plantPlant(_position: Vector): void {
        if (enableCarrot == true && carrotInventory > 0) {
            plants.push(new Carrot(_position));
            enableCarrot = false;
            carrotInventory--;
        }
        else if (enableTomato == true && tomatoInventory > 0) {
            plants.push(new Tomato(_position));
            enableTomato = false;
            tomatoInventory--;
        }
        else if (enableCucumber == true && cucumberInventory > 0) {
            plants.push(new Cucumber(_position));
            enableCucumber = false;
            cucumberInventory--;
        }
        else if (enableSalad == true && saladInventory > 0) {
            plants.push(new Salad(_position));
            enableSalad = false;
            saladInventory--;
        }
        else if (enablePepper == true && pepperInventory > 0) {
            plants.push(new Pepper(_position));
            enablePepper = false;
            pepperInventory--;
        }
        updateInventory();
        plants[plants.length - 1].draw();
    }
    function update(): void {
        for (let plant of plants) {
            if (plant.size > 2.8) {
                continue;
            }
            plant.grow();
        }
    }
    function getPlantButton(_event: MouseEvent): void {
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
    function buyPlant(_event: MouseEvent): void {
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
        updateInventory();
        updateWallet();
    }
    function updateInventory(): void {
        document.querySelector("#carrotamount").innerHTML = carrotInventory.toString() + "x";
        document.querySelector("#tomatoamount").innerHTML = tomatoInventory.toString() + "x";
        document.querySelector("#cucumberamount").innerHTML = cucumberInventory.toString() + "x";
        document.querySelector("#saladamount").innerHTML = saladInventory.toString() + "x";
        document.querySelector("#pepperamount").innerHTML = pepperInventory.toString() + "x";
    }
    function updateWallet(): void {
        document.querySelector("#wallet").innerHTML = "Your Wallet: " + wallet.toString() + "€";
    }
}