export default {
    checkDirection: function() {
        let direction = JSON.parse(localStorage.getItem("direction"));
        if (direction){
            let x = direction;
            const hash = {
                "top": {
                    canvasX: 478,
                    canvasY: 476
                },
                "bottom": {
                    canvasX: 478,
                    canvasY: -10
                },
                "left": {
                    canvasX: 974,
                    canvasY: 232
                },
                "right": {
                    canvasX: -28,
                    canvasY: 232
                }
            };
            return hash[x];
        } else {
            return {
                canvasX: 478,
                canvasY: 232
            }
        }
    }
}