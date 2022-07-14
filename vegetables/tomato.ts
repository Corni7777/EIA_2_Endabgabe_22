namespace Garden22 {
    export class Tomato extends Plant {
        static price: number = Math.random() + 1;

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 0.25;
            this.name = "Tomato";
        }
        draw(): void {
            crc2.save();
            crc2.fillStyle = "red";
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            crc2.restore();
        }
    }
}