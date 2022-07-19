var Garden22;
(function (Garden22) {
    var Plant = /** @class */ (function () {
        function Plant(_position) {
            this.position = _position;
            this.size = 1;
            this.holdsPest = false;
            this.fertalized = false;
        }
        Plant.drawHarvestIndicator = function (_position) {
            Garden22.crc2.save();
            Garden22.crc2.strokeStyle = "goldenrod";
            Garden22.crc2.translate(_position.x, _position.y);
            Garden22.crc2.beginPath();
            Garden22.crc2.moveTo(3, 3);
            Garden22.crc2.lineTo(97, 3);
            Garden22.crc2.lineTo(97, 97);
            Garden22.crc2.lineTo(3, 97);
            Garden22.crc2.closePath();
            Garden22.crc2.lineWidth = 6;
            Garden22.crc2.stroke();
            Garden22.crc2.restore();
        };
        Plant.prototype.draw = function () {
            Garden22.crc2.save();
            Garden22.crc2.fillStyle = "green";
            Garden22.crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            Garden22.crc2.restore();
        };
        Plant.prototype.grow = function () {
            this.size = this.size + this.growthrate;
            this.draw();
        };
        Plant.prototype.recievePest = function () {
            this.holdsPest = true;
            this.growthrate = this.growthrate * -1;
        };
        return Plant;
    }());
    Garden22.Plant = Plant;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=plant.js.map