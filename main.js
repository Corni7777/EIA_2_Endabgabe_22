var Garden22;
(function (Garden22) {
    var fieldCanvas;
    window.addEventListener("load", hndLoad);
    function hndLoad() {
        fieldCanvas = document.querySelector("#field");
        Garden22.crc2 = fieldCanvas.getContext("2d");
        drawField();
    }
    function drawField() {
        Garden22.crc2.fillStyle = "saddlebrown";
        Garden22.crc2.fillRect(0, 0, fieldCanvas.width, fieldCanvas.height);
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
})(Garden22 || (Garden22 = {}));
//# sourceMappingURL=main.js.map