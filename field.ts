namespace Garden22 {
    export class Field {
        position: Vector;
        holdPlant: boolean;

        constructor(_position: Vector) {
            this.position = _position;
            this.holdPlant = false;
        }
        draw(): void {
            crc2.fillStyle = "saddlebrown";
            crc2.fillRect(this.position.x, this.position.y, 100, 100);

        }
        getClicked(_event: MouseEvent): Vector {
            if (_event.offsetX > this.position.x && _event.offsetX < this.position.x + 100 && _event.offsetY > this.position.y && _event.offsetY < this.position.y + 100) {
                // console.log ("My position is: " + "x:" + this.position.x + " y:" + this.position.y);
                return this.position;
            }
        }
    }
}
