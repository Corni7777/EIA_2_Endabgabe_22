namespace Garden22 {
    export class Water {
        static draw(_position: Vector): void {
            crc2.save();
            crc2.fillStyle = "deepskyblue";
            crc2.fillRect(_position.x + 80, _position.y, 20, 20);
            crc2.restore();
        }
        static update(): void {
            for (let plant of plants) {
                if (plant.holdsPest == false) {
                    plant.water--;
                }
            }
        }
    }
}