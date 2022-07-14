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
    var Cucumber = /** @class */ (function (_super) {
        __extends(Cucumber, _super);
        function Cucumber(_position) {
            var _this = _super.call(this, _position) || this;
            _this.growthrate = 0.333333;
            _this.name = "Cucumber";
            return _this;
        }
        Cucumber.prototype.draw = function () {
            Garden22.crc2.save();
            Garden22.crc2.fillStyle = "seagreen";
            Garden22.crc2.fillRect(this.position.x + 5, this.position.y + 5, 30 * this.size, 30 * this.size);
            Garden22.crc2.restore();
        };
        Cucumber.price = 1;
        return Cucumber;
    }(Garden22.Plant));
    Garden22.Cucumber = Cucumber;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=cucumber.js.map