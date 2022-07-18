namespace Garden22 {
    export class Salad extends Plant {
        public static price: number = Math.random() + 1;

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 0.25;
            this.name = "Salad";
            this.water = 4;
        }

        public draw(): void {
            crc2.save();
            crc2.fillStyle = "limegreen";
            crc2.translate(this.position.x + 50, this.position.y + 50);
            crc2.beginPath();
            crc2.arc(Math.random() * 30 - 15, Math.random() * 8 - 4, 9 * this.size, 0, 30);
            crc2.arc(Math.random() * 30 - 15, Math.random() * 8 - 4, 9 * this.size, 0, 30);
            crc2.arc(Math.random() * 30 - 15, Math.random() * 8 - 4, 9 * this.size, 0, 30);
            crc2.arc(Math.random() * 30 - 15, Math.random() * 8 - 4, 9 * this.size, 0, 30);
            crc2.arc(Math.random() * 30 - 15, Math.random() * 8 - 4, 9 * this.size, 0, 30);
            crc2.arc(Math.random() * 30 - 15, Math.random() * 8 - 4, 9 * this.size, 0, 30);
            crc2.arc(Math.random() * 30 - 15, Math.random() * 8 - 4, 9 * this.size, 0, 30);
            crc2.arc(Math.random() * 30 - 15, Math.random() * 8 - 4, 9 * this.size, 0, 30);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
}
