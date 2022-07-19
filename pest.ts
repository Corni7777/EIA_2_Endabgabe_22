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
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 20, 20);
            crc2.restore();
        }
    }
}