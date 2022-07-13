var Garden22;
(function (Garden22) {
    var Plant = /** @class */ (function () {
        function Plant(_position) {
            this.position = _position;
            this.size = 1;
        }
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
        Plant.price = 1;
        return Plant;
    }());
    Garden22.Plant = Plant;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=plant.js.map