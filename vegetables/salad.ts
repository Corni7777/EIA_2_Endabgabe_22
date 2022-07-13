namespace Garden22 {
    export class Salad extends Plant {

        constructor(_position: Vector) {
            super(_position);
            Salad.price = 3;
            this.growthrate = 0.25;
        }

        draw(): void {
            crc2.save();
            crc2.fillStyle = "limegreen";
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            crc2.restore();
        }
    }
}