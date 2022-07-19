var Garden22;
(function (Garden22) {
    var Inventory = /** @class */ (function () {
        function Inventory() {
        }
        Inventory.update = function () {
            console.log(Inventory.carrotAmount);
            document.querySelector("#carrotamount").innerHTML = Inventory.carrotAmount.toString() + "x";
            document.querySelector("#tomatoamount").innerHTML = Inventory.tomatoAmount.toString() + "x";
            document.querySelector("#cucumberamount").innerHTML = Inventory.cucumberAmount.toString() + "x";
            document.querySelector("#saladamount").innerHTML = Inventory.saladAmount.toString() + "x";
            document.querySelector("#pepperamount").innerHTML = Inventory.pepperAmount.toString() + "x";
            document.querySelector("#fertalizeramount").innerHTML = Inventory.fertalizerAmount.toString() + "x";
            document.querySelector("#pesticideamount").innerHTML = Inventory.pesticideAmount.toString() + "x";
        };
        Inventory.carrotAmount = 0;
        Inventory.tomatoAmount = 0;
        Inventory.cucumberAmount = 0;
        Inventory.saladAmount = 0;
        Inventory.pepperAmount = 0;
        Inventory.fertalizerAmount = 0;
        Inventory.pesticideAmount = 0;
        return Inventory;
    }());
    Garden22.Inventory = Inventory;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=inventory.js.map