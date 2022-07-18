var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Garden22;
(function (Garden22) {
    var Pepper = /** @class */ (function (_super) {
        __extends(Pepper, _super);
        function Pepper(_position) {
            var _this = _super.call(this, _position) || this;
            _this.growthrate = 0.3333333;
            _this.name = "Pepper";
            _this.water = 4;
            return _this;
        }
        Pepper.prototype.draw = function () {
            Garden22.crc2.save();
            Garden22.crc2.fillStyle = "yellow";
            Garden22.crc2.translate(this.position.x + 50, this.position.y + 50);
            Garden22.crc2.beginPath();
            Garden22.crc2.moveTo(0, 15 * (this.size * 0.75));
            Garden22.crc2.bezierCurveTo(-20 * (this.size * 0.75), 30 * (this.size * 0.75), -20 * (this.size * 0.75), -30 * (this.size * 0.75), 0, -15 * (this.size * 0.75));
            Garden22.crc2.bezierCurveTo(20 * (this.size * 0.75), -30 * (this.size * 0.75), 20 * (this.size * 0.75), 30 * (this.size * 0.75), 0, 15 * (this.size * 0.75));
            Garden22.crc2.closePath();
            Garden22.crc2.fill();
            Garden22.crc2.restore();
        };
        Pepper.price = Math.random() + 1;
        return Pepper;
    }(Garden22.Plant));
    Garden22.Pepper = Pepper;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=pepper.js.map