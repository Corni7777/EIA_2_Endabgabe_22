namespace Garden22 {
    export class Cucumber extends Plant {
        public static price: number = Math.random() + 1;

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 0.333333;
            this.name = "Cucumber";
            this.water = 4;
        }
        public draw(): void {
            crc2.save();
            crc2.fillStyle = "seagreen";
            
            crc2.translate(this.position.x + 50, this.position.y + 50);
            crc2.beginPath();
            crc2.ellipse(0, 0, 15 * this.size, 15 * (this.size / 3), 15, 0, 30);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
}