
;(function (window, undefined) {
    var position = 'absolute';
    var elements = [];
    function Snake(width, height, direction) {
        this.width = width || 40;
        this.height = height || 40;
        this.body = [
            { x: 3, y: 2, color: 'transparent' },
            { x: 2, y: 2, color: '#a0a7ad' },
            { x: 1, y: 2, color: '#a0a7ad' }
        ]
        this.direction = direction || 'right';



    }
    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }

    Snake.prototype.render = function (map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);
            if(i == 0){
                var img = document.createElement('img');
                div.appendChild(img);
                img.src = './images/head.jpg';
                img.className = 'img';
            }
            if(i == 1){
               div.innerHTML = '丹';
               div.className = 'second';
            }
            if(i == 2){
                div.innerHTML = '爷';
                div.className = 'third';
             }
            div.style.left = this.width * obj.x + 'px';
            div.style.top = this.height * obj.y + 'px';
            div.style.backgroundColor = obj.color;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.position = position;
            elements.push(div);
        }
    }

    Snake.prototype.move = function (food, map) {
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        switch (this.direction) {
            case 'right':
                this.body[0].x += 1;
                break;
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        }

        var headx = this.body[0].x * this.width;
        var heady = this.body[0].y * this.height;
        if(headx === food.x && heady === food.y){
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
            food.render(map);
        } 


    }
    window.Snake = Snake;
})(window,undefined)

