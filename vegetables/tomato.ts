namespace Garden22 {
    export class Tomato extends Plant {
        public static price: number = Math.random() + 1;

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 0.25;
            this.name = "Tomato";
            this.water = 5;
        }
        public draw(): void {
            crc2.save();
            crc2.fillStyle = "red";
            // crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            crc2.translate(this.position.x + 50, this.position.y + 50);
            crc2.beginPath();
            crc2.arc(0, 0, 7.5 * this.size, 0 , 30);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
}