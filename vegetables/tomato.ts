namespace Garden22 {
    export class Tomato extends Plant {

        constructor(_position: Vector) {
            super(_position);
            this.price = 3;
            this.growthrate = 0.25;
        }
        draw(): void {
            crc2.save();
            crc2.fillStyle = "red";
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            crc2.restore();
        }
    }
}