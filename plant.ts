namespace Garden22 {
    export class Plant {
        position: Vector;
        size: number;

        constructor(_position: Vector) {
            this.position = _position;
            this.size = 1;
        }

        draw(): void {
            crc2.save();
            crc2.fillStyle = "green";
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            crc2.restore();
        }
        grow(): void {
            this.size = this.size + 0.5;
            this.draw();
        }
    }
}