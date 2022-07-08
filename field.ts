namespace Garden22 {
    export class Field {
        position: Vector;

        constructor (_position: Vector) {
            this.position = _position;
        }
        draw (): void {
            crc2.fillStyle = "saddlebrown";
            crc2.fillRect(this.position.x, this.position.y,  100,   100);

        }
    }
}
