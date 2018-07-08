
/**
 * 获取元素样式兼容函数 兼容IE8
 * @param {*} element 元素
 * @param {*} attr 需要获取对象内样式
 */
function getStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}

/**
 * 元素内属性变化加动画函数
 * @param {*} ele 元素
 * @param {*} target 变化目标
 * @param {*} attr 元素内属性（px单位结尾的）
 */
function animateAttr(ele, target, attr) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var current = parseInt(getStyle(ele,attr));//兼容处理，字符串变数字
        var step = (target - current) / 10;
        current += target - current >= 0 ? Math.ceil(step) : Math.floor(step);
        ele.style[attr] = current + 'px';
        if (current == target) {
            clearInterval(ele.timer);
        }
    }, 20)
}

/**
 * 元素内多个属性动画函数
 * @param {*} ele 元素
 * @param {*} obj 对象集{元素内属性:变化目标}
 *     列：{
 *         height : 100,
 *         z-index : 1,
 *         opacity : .8
 *       }
 */
function animateObj(ele, obj) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var flag = true; //用于判断动画是否全部执行完毕，反证法，true代表全部执行完毕
        for (var attr in obj) {//遍历元素属性对象集
            var target = obj[attr];
            if (attr == 'opacity') {//透明度需特殊操作，因为透明度的值为0~1，无单位有小数
                var current = parseFloat(getStyle(ele, attr)); //获取元素当前透明度，是小数
                /**
                 * 因为浮点数相加会有误差，先扩大一定的倍数再做运算
                 * 扩大的倍数取决于你想要的精度
                 * 透明度的精度一般是100倍
                 */
                target *= 100;
                current *= 100;
                var step = (target - current) / 10;
                step = step >= 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                ele.style[attr] = current / 100;   
            } else if (attr == 'zIndex') {//层级需特殊操作，因为层级的值为整数，无单位！！
                ele.style[attr] = target; //层级变化看不见效果，不需要动画，直接赋值
                var current = target;//如果不声明current，最后判断动画flag永远为false
            } else {//属性单位为px的操作
                var current = parseInt(getStyle(ele, attr)); //因为属性值带单位，先取单位前的数字
                var step = (target - current) / 10;
                current += target - current >= 0 ? Math.ceil(step) : Math.floor(step);
                ele.style[attr] = current + 'px';
            }
            if (target != current) {//判断动画是否完成
                flag = false;
            }
        }
        if (flag) {//动画全部执行完毕，停止定时器
            clearInterval(ele.timer);
        }

    }, 20)
}

/**
 * 元素内多个属性动画回调函数
 * @param {*} ele 元素
 * @param {*} obj 对象集{元素内属性:变化目标}
 *     列：{
 *         height : 100,
 *         z-index : 1,
 *         opacity : .8
 *       }
 *  @param {*} callback 回调函数，执行完上一个动作后调用的函数,可写可不写
 */
function animateCall(ele, obj, callback) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var flag = true; //用于判断动画是否全部执行完毕，反证法，true代表全部执行完毕
        for (var attr in obj) {//遍历元素属性对象集
            if (attr == 'opacity') {//透明度需特殊操作，因为透明度的值为0~1，无单位有小数
                var current = parseFloat(getStyle(ele, attr)); //获取元素当前透明度，是小数
                var target = obj[attr];
                /**
                 * 因为浮点数相加会有误差，先扩大一定的倍数再做运算
                 * 扩大的倍数取决于你想要的精度
                 * 透明度的精度一般是100倍
                 */
                target *= 100;
                current *= 100;
                var step = (target - current) / 5;
                step = step >= 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                ele.style[attr] = current / 100;
                //这种方式在target是三位数小数精度以上会无法结束,在_v6中改进
                if (target != current) {//判断动画是否完成
                    flag = false;
                }
            } else if (attr == 'zIndex') {//层级需特殊操作，因为层级的值为整数，无单位！！
                ele.style[attr] = obj[attr]; //层级变化看不见效果，不需要动画，直接赋值
            } else {//属性单位为px的操作
                var current = parseInt(getStyle(ele, attr)); //因为属性值带单位，先取单位前的数字
                var target = obj[attr];
                var step = (target - current) / 10;
                current += target - current >= 0 ? Math.ceil(step) : Math.floor(step);
                ele.style[attr] = current + 'px';
                if (target != current) {//判断动画是否完成
                    flag = false;
                }
            }
        }
        if (flag) {//动画全部执行完毕，停止定时器
            clearInterval(ele.timer);
            if(callback){//判断是否有callback
                callback();
            }
        }
    }, 20)
}

/**
 * 匀速动画
 * @param {*} element 元素
 * @param {*} target 移动目标
 * @param {*} step 步长
 */
function animateAve(element, target, step) {
    clearInterval(element.timer);
    step = step || 40;
    element.timer = setInterval(function () {
        // 获得元素现在的水平位置
        var current = element.offsetLeft;
        // 判断元素与目标的距离
        current += (current - target < 0 ) ? +step : - step;
        element.style.left = current + 'px';
        // 最后一步前停止计时，元素直接获得目标位置
        if (Math.abs(element.offsetLeft - target) <= step) {
            clearInterval(element.timer);
            element.style.left = target + 'px';
        }
    }, 20)
}

/**
 * 减速动画
 * @param {*} element 元素
 * @param {*} target 移动目标
 */
function animateSlowDown(element, target) {
    clearInterval(element.timer); 
    element.timer = setInterval(function () {
        var current = element.offsetLeft;
        step = (target - current) / 10;
        current += current - target <= 0 ?  Math.ceil(step) : Math.floor(step);
        element.style.left = current + 'px';
        if (current == target) {
            clearInterval(element.timer);
        }
    }, 20)
}

/**
 * 加速动画（需改进）
 * @param {*} element 元素
 * @param {*} target 移动目标
 */
function animateSpeedUp(element, target) {
    clearInterval(element.timer);
    var step = 1;
    element.timer = setInterval(function () {
        var current = element.offsetLeft;
        console.log(flag);
        step *= 1.1;
        console.log(step);
        current += current - target <= 0 ? Math.ceil(step) : Math.floor(step);
        element.style.left = current + 'px';
        if (Math.abs(current - target) <= step) {
            clearInterval(element.timer);
            element.style.left = target + 'px';
        }
    }, 20)
}


function animate_v6(element,obj,callback){
    clearInterval(element.timer);
    
    element.timer = setInterval(function(){
        var flag = true ;
        for(var attr in obj){
            if(attr == 'opacity'){
                var current = parseFloat(getStyle(element,attr));
                var target = obj[attr];
                var step = (target - current) / 10;
                current += step ;
                element.style[attr] = current ;
                current = Math.floor(current*100);
                target = Math.floor(target*100);
                console.log(current - target);
                if(Math.abs(current - target) ){
                    element.style[attr] = obj[attr];
                }else{
                    flag = false;
                }
            }else if(attr == 'zIndex'){
                element.style[attr] = obj[attr];
            }else{
                var current = parseInt(getStyle(element,attr));
                var target = obj[attr];
                var step = (target - current) / 10;
                current += target - current >= 0 ? Math.ceil(step) : Math.floor(step);
                element.style[attr] = current + 'px';
                if(current != target){
                    flag = false;
                }
            }
        }
        if(flag){
            clearInterval(element.timer);
            if (callback) {
                callback();
            }
        }
    },20)
}