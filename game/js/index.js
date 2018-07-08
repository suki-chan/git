var map = document.getElementById('map')
var btn = document.getElementById('test');
var intro = document.querySelector('.intro')
var a = new Game(map);
btn.onmouseover = function(){
    intro.style.display = 'block';
}
btn.onmouseout = function(){
    intro.style.display = 'none';
}
btn.onclick = function () {
    a.start();
}