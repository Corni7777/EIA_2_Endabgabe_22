var Garden22;
(function (Garden22) {
    var fieldCanvas;
    var fields = [];
    window.addEventListener("load", hndLoad);
    function hndLoad() {
        fieldCanvas = document.querySelector("#field");
        Garden22.crc2 = fieldCanvas.getContext("2d");
        drawField();
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
            // console.log(c);
            console.log(fields[2]);
            console.log(fields[3]);
        }
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            field.draw();
        }
        // let w: number = 5;
        // for (let i: number = 0; i < 10; i++) {
        //     w = w + 110;
        //     if (i == 0) {
        //         w = 5;
        //     }
        //     crc2.moveTo(w, fieldCanvas.height);
        //     crc2.lineTo(w, 0);
        //     crc2.lineWidth = 10;
        //     crc2.stroke();
        // }
        // let h: number = 5;
        // for (let i: number = 0; i < 10; i++) {
        //     h = h + 110;
        //     if (i == 0) {
        //         h = 5;
        //     }
        //     crc2.moveTo(0, h);
        //     crc2.lineTo(fieldCanvas.width, h);
        //     crc2.lineWidth = 10;
        //     crc2.stroke();
        // }
    }
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=main.js.map