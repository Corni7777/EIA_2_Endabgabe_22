namespace Garden22 {
    export class Field {
        public position: Vector;
        public holdPlant: boolean;

        constructor(_position: Vector) {
            this.position = _position;
            this.holdPlant = false;
        }
        static createFields(): void {
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
        public draw(): void {
            crc2.save();
            crc2.fillStyle = "saddlebrown";
            crc2.fillRect(this.position.x, this.position.y, 100, 100);
            crc2.restore();

        }
        public getClicked(_event: MouseEvent): Vector {
            if (_event.offsetX > this.position.x && _event.offsetX < this.position.x + 100 && _event.offsetY > this.position.y && _event.offsetY < this.position.y + 100) {
                return this.position;
            }
        }
    }
}
