var Garden22;
(function (Garden22) {
    var Fertalizer = /** @class */ (function () {
        function Fertalizer() {
        }
        Fertalizer.draw = function (_position) {
            Garden22.crc2.save();
            Garden22.crc2.strokeStyle = "white";
            Garden22.crc2.translate(_position.x, _position.y);
            Garden22.crc2.beginPath();
            Garden22.crc2.moveTo(1, 1);
            Garden22.crc2.lineTo(99, 1);
            Garden22.crc2.lineTo(99, 99);
            Garden22.crc2.lineTo(1, 99);
            Garden22.crc2.closePath();
            Garden22.crc2.lineWidth = 2;
            Garden22.crc2.stroke();
            Garden22.crc2.restore();
        };
        Fertalizer.update = function () {
            for (var _i = 0, plants_1 = Garden22.plants; _i < plants_1.length; _i++) {
                var plant = plants_1[_i];
                if (plant.fertalized == true) {
                    Fertalizer.draw(plant.position);
                }
            }
        };
        Fertalizer.price = Math.random() + 0.5;
        return Fertalizer;
    }());
    Garden22.Fertalizer = Fertalizer;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=fertalizer.js.map