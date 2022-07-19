var Garden22;
(function (Garden22) {
    var Field = /** @class */ (function () {
        function Field(_position) {
            this.position = _position;
            this.holdPlant = false;
        }
        Field.createFields = function () {
            // fields and black lines
            var c = new Garden22.Vector(10, 10);
            for (var i = 0; i < 40; i++) {
                if (c.x > 780) {
                    c.x = 10;
                    c.y = c.y + 110;
                }
                Garden22.fields.push(new Field(new Garden22.Vector(c.x, c.y)));
                c.x = c.x + 110;
            }
            for (var _i = 0, fields_1 = Garden22.fields; _i < fields_1.length; _i++) {
                var field = fields_1[_i];
                field.draw();
            }
            var w = 5;
            for (var i = 0; i < 10; i++) {
                w = w + 110;
                if (i == 0) {
                    w = 5;
                }
                Garden22.crc2.moveTo(w, Garden22.fieldCanvas.height);
                Garden22.crc2.lineTo(w, 0);
                Garden22.crc2.lineWidth = 10;
                Garden22.crc2.stroke();
            }
            var h = 5;
            for (var i = 0; i < 10; i++) {
                h = h + 110;
                if (i == 0) {
                    h = 5;
                }
                Garden22.crc2.moveTo(0, h);
                Garden22.crc2.lineTo(Garden22.fieldCanvas.width, h);
                Garden22.crc2.lineWidth = 10;
                Garden22.crc2.stroke();
            }
        };
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