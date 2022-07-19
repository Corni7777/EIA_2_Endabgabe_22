namespace Garden22 {
    export class Player {
        static pesticideInventory: number;

        static usePesticide(_position: Vector, _field: Field): void {
            for (let i: number = 0; i < plants.length; i++) {
                if (plants[i].position == _position && plants[i].holdsPest == true && plants[i].water > 0) {
                    plants[i].holdsPest = false;
                    plants[i].growthrate = plants[i].growthrate * - 1;
                    removePest(i);
                    Player.pesticideInventory--;
                    Inventory.update();
                    _field.draw();
                    Fertalizer.update();
                    plants[i].draw();
                }
            }
        }
    }
}