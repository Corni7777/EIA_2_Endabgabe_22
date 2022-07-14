namespace Garden22 {
    export class Pepper extends Plant {
        static price: number = 1;

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 0.3333333;
            this.name = "Pepper";
        }
        draw(): void {
            crc2.save();
            crc2.fillStyle = "yellow";
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            crc2.restore();
        }
    }
}