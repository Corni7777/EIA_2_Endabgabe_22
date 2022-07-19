var Garden22;
(function (Garden22) {
    var Player = /** @class */ (function () {
        function Player() {
        }
        Player.usePesticide = function (_position, _field) {
            for (var i = 0; i < Garden22.plants.length; i++) {
                if (Garden22.plants[i].position == _position && Garden22.plants[i].holdsPest == true && Garden22.plants[i].water > 0) {
                    Garden22.plants[i].holdsPest = false;
                    Garden22.plants[i].growthrate = Garden22.plants[i].growthrate * -1;
                    removePest(i);
                    Player.pesticideInventory--;
                    Garden22.Inventory.update();
                    _field.draw();
                    Garden22.Fertalizer.update();
                    Garden22.plants[i].draw();
                }
            }
        };
        return Player;
    }());
    Garden22.Player = Player;
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=player.js.map