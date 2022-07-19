namespace Garden22 {
    export abstract class Plant {
        public static price: number;
        public position: Vector;
        public size: number;
        public growthrate: number;
        public name: string;
        public holdsPest: boolean;
        public water: number;
        public fertalized: boolean;


        constructor(_position: Vector) {
            this.position = _position;
            this.size = 1;
            this.holdsPest = false;
            this.fertalized = false;
        }
        static drawHarvestIndicator(_position: Vector): void {
            crc2.save();
            crc2.strokeStyle = "goldenrod";
            crc2.translate(_position.x, _position.y);
            crc2.beginPath();
            crc2.moveTo(3, 3);
            crc2.lineTo(97, 3);
            crc2.lineTo(97, 97);
            crc2.lineTo(3, 97);
            crc2.closePath();
            crc2.lineWidth = 6;
            crc2.stroke();
            crc2.restore();
        }

        public draw(): void {
            crc2.save();
            crc2.fillStyle = "green";
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            crc2.restore();
        }
        public grow(): void {
            this.size = this.size + this.growthrate;
            this.draw();
        }
        public recievePest(): void {
            this.holdsPest = true;
            this.growthrate = this.growthrate * -1;
        }
    }
}
