export default {
    checkDirection: function() {
        let direction = JSON.parse(localStorage.getItem("direction"));
        let x = direction.direction;
        const hash = {
            "top": {
                canvasX: 600,
                canvasY: 610
            },
            "bottom": {
                canvasX: 600,
                canvasY: 90
            },
            "left": {
                canvasX: 1100,
                canvasY: 360
            },
            "right": {
                canvasX: 90,
                canvasY: 360
            }
        };
        return hash[x];
    }
}