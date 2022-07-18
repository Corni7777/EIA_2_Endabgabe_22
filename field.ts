namespace Garden22 {
    export class Field {
        public position: Vector;
        public holdPlant: boolean;

        constructor(_position: Vector) {
            this.position = _position;
            this.holdPlant = false;
        }
        public draw(): void {
            crc2.save();
            crc2.fillStyle = "saddlebrown";
            crc2.fillRect(this.position.x, this.position.y, 100, 100);
            crc2.restore();

        }
        public getClicked(_event: MouseEvent): Vector {
            if (_event.offsetX > this.position.x && _event.offsetX < this.position.x + 100 && _event.offsetY > this.position.y && _event.offsetY < this.position.y + 100) {
                return this.position;
            }
        }
    }
}
