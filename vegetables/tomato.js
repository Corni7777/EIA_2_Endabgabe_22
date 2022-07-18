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
    var Tomato = /** @class */ (function (_super) {
        __extends(Tomato, _super);
        function Tomato(_position) {
            var _this = _super.call(this, _position) || this;
            _this.growthrate = 0.25;
            _this.name = "Tomato";
            _this.water = 5;
            return _this;
        }
        Tomato.prototype.draw = function () {
            Garden22.crc2.save();
            Garden22.crc2.fillStyle = "red";
            // crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            Garden22.crc2.translate(this.position.x + 50, this.position.y + 50);
            Garden22.crc2.beginPath();
            Garden22.crc2.arc(0, 0, 7.5 * this.size, 0, 30);
            Garden22.crc2.closePath();
            Garden22.crc2.fill();
            Garden22.crc2.restore();
        };
        Tomato.price = Math.random() + 1;
        return Tomato;
    }(Garden22.Plant));
    Garden22.Tomato = Tomato;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=tomato.js.map