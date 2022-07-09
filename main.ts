namespace Garden22 {
    let fieldCanvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    let fields: Field[] = [];
    let plants: Plant[] = [];

    window.addEventListener("load", hndLoad);
    function hndLoad(): void {
        fieldCanvas = document.querySelector("#field");
        crc2 = fieldCanvas.getContext("2d");
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
        for (let field of fields) {
            let plantPosition: Vector = field.getClicked(_event);
            if (plantPosition == undefined) {
                continue;
            }
            console.log(plantPosition);
            plantPlant(plantPosition);
            break;
        }
    }
    function plantPlant(_position: Vector): void {
        plants.push(new Plant(_position));
        plants[plants.length - 1].draw();
    }
    function update(): void {
        for (let plant of plants) {
            if (plant.size > 2.5) {
                continue;
            }
            plant.grow();

        }
    }
}