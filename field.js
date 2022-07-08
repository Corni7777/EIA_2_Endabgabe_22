var Garden22;
(function (Garden22) {
    var Field = /** @class */ (function () {
        function Field(_position) {
            this.position = _position;
        }
        Field.prototype.draw = function () {
            Garden22.crc2.fillStyle = "saddlebrown";
            Garden22.crc2.fillRect(this.position.x, this.position.y, 100, 100);
        };
        return Field;
    }());
    Garden22.Field = Field;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=field.js.map