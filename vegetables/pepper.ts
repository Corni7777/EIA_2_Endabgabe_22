namespace Garden22 {
    export class Pepper extends Plant {
        public static price: number = Math.random() + 1;

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 0.3333333;
            this.name = "Pepper";
            this.water = 4;
        }
        public draw(): void {
            crc2.save();
            crc2.fillStyle = "yellow";
            crc2.translate(this.position.x + 50, this.position.y + 50);
            crc2.beginPath();
            crc2.moveTo(0, 15 * (this.size * 0.75));
            crc2.bezierCurveTo(-20 * (this.size * 0.75), 30 * (this.size * 0.75), -20 * (this.size * 0.75), -30 * (this.size * 0.75), 0, -15 * (this.size * 0.75));
            crc2.bezierCurveTo(20 * (this.size * 0.75), -30 * (this.size * 0.75), 20 * (this.size * 0.75), 30 * (this.size * 0.75), 0, 15 * (this.size * 0.75));
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
}