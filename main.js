var Garden22;
(function (Garden22) {
    var fieldCanvas;
    var fields = [];
    var plants = [];
    window.addEventListener("load", hndLoad);
    function hndLoad() {
        fieldCanvas = document.querySelector("#field");
        Garden22.crc2 = fieldCanvas.getContext("2d");
        fieldCanvas.addEventListener("click", getField);
        drawField();
        window.setInterval(update, 2000);
    }
    function drawField() {
        var c = new Garden22.Vector(10, 10);
        for (var i = 0; i < 40; i++) {
            if (c.x > 780) {
                c.x = 10;
                c.y = c.y + 110;
            }
            fields.push(new Garden22.Field(new Garden22.Vector(c.x, c.y)));
            c.x = c.x + 110;
        }
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            field.draw();
        }
        var w = 5;
        for (var i = 0; i < 10; i++) {
            w = w + 110;
            if (i == 0) {
                w = 5;
            }
            Garden22.crc2.moveTo(w, fieldCanvas.height);
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
            Garden22.crc2.lineTo(fieldCanvas.width, h);
            Garden22.crc2.lineWidth = 10;
            Garden22.crc2.stroke();
        }
    }
    function getField(_event) {
        for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
            var field = fields_2[_i];
            var plantPosition = field.getClicked(_event);
            if (plantPosition == undefined) {
                continue;
            }
            console.log(plantPosition);
            plantPlant(plantPosition);
            break;
        }
    }
    function plantPlant(_position) {
        plants.push(new Garden22.Plant(_position));
        plants[plants.length - 1].draw();
    }
    function update() {
        for (var _i = 0, plants_1 = plants; _i < plants_1.length; _i++) {
            var plant = plants_1[_i];
            if (plant.size > 2.5) {
                continue;
            }
            plant.grow();
        }
    }
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=main.js.map