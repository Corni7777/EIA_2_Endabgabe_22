namespace Garden22 {
    export abstract class Plant {
        static price: number;
        position: Vector;
        size: number;
        growthrate: number;
        name: string;
        holdsPest: boolean;
        water: number; 
        fertalized: boolean;


        constructor(_position: Vector) {
            this.position = _position;
            this.size = 1;
            this.holdsPest = false;
            this.fertalized = false;
        }

        draw(): void {
            crc2.save();
            crc2.fillStyle = "green";
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            crc2.restore();
        }
        grow(): void {
            this.size = this.size + this.growthrate;
            this.draw();
        }
        recievePest(): void {
            this.holdsPest = true;
            this.growthrate = this.growthrate * -1;
        }
    }
}