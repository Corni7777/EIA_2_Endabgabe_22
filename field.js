var Garden22;
(function (Garden22) {
    var Field = /** @class */ (function () {
        function Field(_position) {
            this.position = _position;
            this.holdPlant = false;
        }
        Field.prototype.draw = function () {
            Garden22.crc2.save();
            Garden22.crc2.fillStyle = "saddlebrown";
            Garden22.crc2.fillRect(this.position.x, this.position.y, 100, 100);
            Garden22.crc2.restore();
        };
        Field.prototype.getClicked = function (_event) {
            if (_event.offsetX > this.position.x && _event.offsetX < this.position.x + 100 && _event.offsetY > this.position.y && _event.offsetY < this.position.y + 100) {
                return this.position;
            }
        };
        return Field;
    }());
    Garden22.Field = Field;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=field.js.map