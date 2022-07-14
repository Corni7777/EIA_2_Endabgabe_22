namespace Garden22 {
    export class Pest {
        position: Vector;

        constructor(_position: Vector) {
            this.position = _position;
        }
        draw(): void {
            crc2.save();
            crc2.fillStyle = "black";
            crc2.fillRect(this.position.x + 5, this.position.y + 5, 20 , 20);
            crc2.restore();
        }
    }
}