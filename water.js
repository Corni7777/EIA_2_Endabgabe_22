var Garden22;
(function (Garden22) {
    var Water = /** @class */ (function () {
        function Water() {
        }
        Water.draw = function (_position) {
            Garden22.crc2.save();
            Garden22.crc2.fillStyle = "deepskyblue";
            Garden22.crc2.fillRect(_position.x + 80, _position.y, 20, 20);
            Garden22.crc2.restore();
        };
        Water.update = function () {
            for (var _i = 0, plants_1 = Garden22.plants; _i < plants_1.length; _i++) {
                var plant = plants_1[_i];
                if (plant.holdsPest == false) {
                    plant.water--;
                }
            }
        };
        return Water;
    }());
    Garden22.Water = Water;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=water.js.map