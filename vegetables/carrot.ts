namespace Garden22 {
    export class Carrot extends Plant {
        public static price: number = Math.random() + 1;

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 0.4;
            this.name = "Carrot";
            this.water = 5;
        }


        public draw(): void {
            crc2.save();
            crc2.fillStyle = "orange";
            crc2.translate(this.position.x + 50, this.position.y + 50);
            crc2.beginPath();
            crc2.moveTo(0, 15 * this.size);
            crc2.lineTo(-15 * (this.size / 2), -15 * this.size);
            crc2.lineTo(15 * (this.size / 2), -15 * this.size);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
}
