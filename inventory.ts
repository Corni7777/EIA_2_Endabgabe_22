namespace Garden22 {
    export class Inventory {
        static carrotAmount: number = 0;
        static tomatoAmount: number = 0;
        static cucumberAmount: number = 0;
        static saladAmount: number = 0;
        static pepperAmount: number = 0;

        static fertalizerAmount: number = 0;
        static pesticideAmount: number = 0;


        static update(): void {
            console.log(Inventory.carrotAmount);
            document.querySelector("#carrotamount").innerHTML = Inventory.carrotAmount.toString() + "x";
            document.querySelector("#tomatoamount").innerHTML = Inventory.tomatoAmount.toString() + "x";
            document.querySelector("#cucumberamount").innerHTML = Inventory.cucumberAmount.toString() + "x";
            document.querySelector("#saladamount").innerHTML = Inventory.saladAmount.toString() + "x";
            document.querySelector("#pepperamount").innerHTML = Inventory.pepperAmount.toString() + "x";

            document.querySelector("#fertalizeramount").innerHTML = Inventory.fertalizerAmount.toString() + "x";
            document.querySelector("#pesticideamount").innerHTML = Inventory.pesticideAmount.toString() + "x";
        }
    }
}