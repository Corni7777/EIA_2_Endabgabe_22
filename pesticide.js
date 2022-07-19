var Garden22;
(function (Garden22) {
    var Pesticide = /** @class */ (function () {
        function Pesticide() {
        }
        Pesticide.removePest = function (_i) {
            for (var j = 0; j < Garden22.pests.length; j++) {
                if (Garden22.pests[j].position == Garden22.plants[_i].position) {
                    Garden22.pests.splice(j, 1);
                }
            }
        };
        Pesticide.price = Math.random() + 0.5;
        return Pesticide;
    }());
    Garden22.Pesticide = Pesticide;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=pesticide.js.map