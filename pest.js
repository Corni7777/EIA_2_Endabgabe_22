var Garden22;
(function (Garden22) {
    var Pest = /** @class */ (function () {
        function Pest(_position) {
            this.position = _position;
        }
        Pest.prototype.draw = function () {
            Garden22.crc2.save();
            Garden22.crc2.fillStyle = "black";
            Garden22.crc2.fillRect(this.position.x + 5, this.position.y + 5, 20, 20);
            Garden22.crc2.restore();
        };
        return Pest;
    }());
    Garden22.Pest = Pest;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=pest.js.map