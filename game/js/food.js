


; (function (window, undefined) {
    var document = window.document;
    var position = 'absolute';
    var elements = [];
    // window.elements = elements;
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 40;
        this.height = height || 40;
        this.color = color || 'trasparent';
    }
    Food.prototype.render = function (map) {
        remove()
        this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;

        var div = document.createElement('div');
        map.appendChild(div);
        div.style.position = position;
        div.style.top = this.y + 'px';
        div.style.left = this.x + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
        div.className = 'iconfont';
        div.innerHTML = '&#xe637;'
        elements.push(div);
    }
    function remove() {
        if(elements.length > 0 ){
            elements[0].parentNode.removeChild(elements[0]);
            elements.splice(0, 1);
        }
       
    }
    window.Food = Food;

})(window, undefined)



