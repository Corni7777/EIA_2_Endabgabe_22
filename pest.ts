namespace Garden22 {
    export class Pest {
        public position: Vector;

        constructor(_position: Vector) {
            this.position = _position;
        }
        static spawn(): void {
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
        public draw(): void {
            crc2.save();
            crc2.fillStyle = "black";
            crc2.translate(this.position.x + 45, this.position.y + 50);
            crc2.beginPath();
            crc2.arc(0, 0, 7, 0, 30);
            crc2.closePath();
            crc2.fill();
            crc2.moveTo(0, 0);
            crc2.lineTo(10, 10);
            crc2.moveTo(0, 0);
            crc2.lineTo(15, 0);
            crc2.moveTo(0, 0);
            crc2.lineTo(10, -10);
            crc2.moveTo(0, 0);
            crc2.lineTo(-10, 10);
            crc2.moveTo(0, 0);
            crc2.lineTo(-15, 0);
            crc2.moveTo(0, 0);
            crc2.lineTo(-10, -10);
            crc2.closePath();
            crc2.lineWidth = 1;
            crc2.stroke();
            crc2.restore();
        }
    }
}