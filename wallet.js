var Garden22;
(function (Garden22) {
    var Wallet = /** @class */ (function () {
        function Wallet() {
        }
        Wallet.update = function () {
            document.querySelector("#wallet").innerHTML = "Your Wallet: " + Wallet.money.toFixed(2) + "€";
        };
        Wallet.money = 0;
        return Wallet;
    }());
    Garden22.Wallet = Wallet;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=wallet.js.map