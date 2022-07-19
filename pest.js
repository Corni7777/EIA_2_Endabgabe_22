var Garden22;
(function (Garden22) {
    var Pest = /** @class */ (function () {
        function Pest(_position) {
            this.position = _position;
        }
        Pest.spawn = function () {
            if (Garden22.plants.length > 0) {
                var x = Math.round(Math.random() * (Garden22.plants.length - 1));
                if (Garden22.plants[x].holdsPest == false && Garden22.plants[x].water > 0 && Garden22.plants[x].size > 1.4) {
                    Garden22.pests.push(new Pest(Garden22.plants[x].position));
                    Garden22.plants[x].recievePest();
                    for (var _i = 0, pests_1 = Garden22.pests; _i < pests_1.length; _i++) {
                        var pest = pests_1[_i];
                        pest.draw();
                    }
                }
                else if (Garden22.plants[x].holdsPest == undefined || Garden22.plants[x].holdsPest == true) {
                    return;
                }
            }
        };
        Pest.prototype.draw = function () {
            Garden22.crc2.save();
            Garden22.crc2.fillStyle = "black";
            Garden22.crc2.translate(this.position.x + 45, this.position.y + 50);
            Garden22.crc2.beginPath();
            Garden22.crc2.arc(0, 0, 7, 0, 30);
            Garden22.crc2.closePath();
            Garden22.crc2.fill();
            Garden22.crc2.moveTo(0, 0);
            Garden22.crc2.lineTo(10, 10);
            Garden22.crc2.moveTo(0, 0);
            Garden22.crc2.lineTo(15, 0);
            Garden22.crc2.moveTo(0, 0);
            Garden22.crc2.lineTo(10, -10);
            Garden22.crc2.moveTo(0, 0);
            Garden22.crc2.lineTo(-10, 10);
            Garden22.crc2.moveTo(0, 0);
            Garden22.crc2.lineTo(-15, 0);
            Garden22.crc2.moveTo(0, 0);
            Garden22.crc2.lineTo(-10, -10);
            Garden22.crc2.closePath();
            Garden22.crc2.lineWidth = 1;
            Garden22.crc2.stroke();
            Garden22.crc2.restore();
        };
        return Pest;
    }());
    Garden22.Pest = Pest;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=pest.js.map