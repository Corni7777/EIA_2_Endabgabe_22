namespace Garden22 {
    export class Fertalizer {
        static draw(_position: Vector): void {
            crc2.save();
            crc2.strokeStyle = "white";
            crc2.translate(_position.x, _position.y);
            crc2.beginPath();
            crc2.moveTo(1, 1);
            crc2.lineTo(99, 1);
            crc2.lineTo(99, 99);
            crc2.lineTo(1, 99);
            crc2.closePath();
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.restore();
        }
        static update(): void {
            for (let plant of plants) {
                if (plant.fertalized == true) {
                    Fertalizer.draw(plant.position);
                }
            }
        }
    }
}