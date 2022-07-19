namespace Garden22 {
    export enum TOOLACTION {
        FERTILIZE,
        HARVEST,
        WATER,
        PLANT,
        PESTICIDE
    }
    export enum PLANTING {
        CARROT,
        TOMATO,
        CUCUMBER,
        SALAD,
        PEPPER
    }
    export class Player {
        public static toolAction: TOOLACTION;
        public static planting: PLANTING;
        static usePesticide(_position: Vector, _field: Field): void {
            for (let i: number = 0; i < plants.length; i++) {
                if (plants[i].position == _position && plants[i].holdsPest == true && plants[i].water > 0) {
                    plants[i].holdsPest = false;
                    plants[i].growthrate = plants[i].growthrate * - 1;
                    Pesticide.removePest(i);
                    Inventory.pesticideAmount--;
                    Inventory.update();
                    _field.draw();
                    Fertalizer.update();
                    plants[i].draw();
                }
            }
        }
        static harvest(_i: number): void {
            switch (plants[_i].name) {
                case "Carrot":
                    Wallet.money = Wallet.money + Carrot.price;
                case "Tomato":
                    Wallet.money = Wallet.money + Tomato.price;
                case "Cucumber":
                    Wallet.money = Wallet.money + Cucumber.price;
                case "Salad":
                    Wallet.money = Wallet.money + Salad.price;
                case "Pepper":
                    Wallet.money = Wallet.money + Pepper.price;
            }
            Wallet.update();
            plants.splice(_i, 1);
        }
        static useWater(_position: Vector, _field: Field): void {
            for (let i: number = 0; i < plants.length; i++) {
                if (plants[i].position == _position && plants[i].water <= 0) {
                    plants[i].water = 5;
                    _field.draw();
                    Fertalizer.update();
                    plants[i].draw();
                }
                else if (plants[i].position == _position && plants[i].water > 0) {
                    if (plants[i].holdsPest == true) {
                        Pesticide.removePest(i);
                    }
                    plants.splice(i, 1);
                    _field.draw();
                }
            }
        }
        static useFertalizer(_position: Vector, _field: Field): void {
            for (let i: number = 0; i < plants.length; i++) {
                if (plants[i].position == _position && plants[i].fertalized == false) {
                    plants[i].fertalized = true;
                    Fertalizer.draw(_position);
                    Inventory.fertalizerAmount--;
                    Inventory.update();
                    plants[i].growthrate = plants[i].growthrate + 0.2;

                }
                else if (plants[i].position == _position && plants[i].fertalized == true) {
                    if (plants[i].holdsPest == true) {
                        Pesticide.removePest(i);
                    }
                    plants.splice(i, 1);
                    _field.draw();
                }
            }
        }
        static plant(_position: Vector): void {
            if (Player.planting == PLANTING.CARROT && Inventory.carrotAmount > 0) {
                plants.push(new Carrot(_position));
                Inventory.carrotAmount--;
            }
            else if (Player.planting == PLANTING.TOMATO == true && Inventory.tomatoAmount > 0) {
                plants.push(new Tomato(_position));
                Inventory.tomatoAmount--;
            }
            else if (Player.planting == PLANTING.CUCUMBER && Inventory.cucumberAmount > 0) {
                plants.push(new Cucumber(_position));
                Inventory.cucumberAmount--;
            }
            else if (Player.planting == PLANTING.SALAD && Inventory.saladAmount > 0) {
                plants.push(new Salad(_position));
                Inventory.saladAmount--;
            }
            else if (Player.planting == PLANTING.PEPPER && Inventory.pepperAmount > 0) {
                plants.push(new Pepper(_position));
                Inventory.pepperAmount--;
            }
            Inventory.update();
            plants[plants.length - 1].draw();
        }
    }
}