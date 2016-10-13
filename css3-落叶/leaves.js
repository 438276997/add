/* 叶子的数量定义为用于动画 */
const shuliang = 30;//常量生成30个叶子
  /*  当“落叶”页面完全加载.*/
function init()
{
    /*得到一个参考的元素将包含树叶 */  
    var divs = document.getElementById('leafContainer');
    /*填满空集装箱新叶子 */
    for (var i = 0; i < shuliang; i++) 
    {
    	//console.log(1)
    		//把 生成叶子放在div里
        divs.appendChild(createALeaf());
    }
}
/*
 		 接收范围的最低和最高价值
	 	 返回一个随机整数,落在范围之内  
*/
//可以随机生成叶子图片 
function randomInteger(low, high)
{
		//low（1）+ 向上取整-随机生成（0-1）*(5-1)的区间 = 1-5随机生成
    return low + Math.floor(Math.random() * (high - low));
}
/*
 	 	 接收范围的最低和最高价值
  	返回一个随机整数,落在范围之内  
*/
function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}
/*
 		 收到一个号码并返回其CSS像素值   
*/
function Values(value)
{
    return value + 'px';
}
/*
    	返回一个时间值下降的动画。
*/
function durationValue(value)
{
    return value + 's';
}

//生成叶子
function createALeaf(){

    //首先创建一个包装器div,和一个空的img元素
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');    
    //随机选择一个叶子图像,并将其分配给新创建的元素 */
   	//console.log(randomInteger(1, 5))
    image.src = 'images/realLeaf' + randomInteger(1, 5) + '.png';
   	// console.log( image.src )
   	//刚创建叶子隐藏-100
    leafDiv.style.top = "-100px";

    //位置的叶子在一个随机位置在屏幕上 
    //随机生left值0-500坐标随机下落
    leafDiv.style.left = Values(randomInteger(0, 500));  
    
    //随机选择一个旋转的动画   
    //随机两种运动状态 css3
    var yundong = (Math.random() < 0.5) ? 'zuoyiban' : 'youyiban';    
    //与这些值设置-webkit-animation-name属性 
    //div位移运动 {透明度，位移}
    leafDiv.style.webkitAnimationName = 'fade, drop';
    image.style.webkitAnimationName = yundong;  
    //算出一个随机时间褪色和动画
    //叶子下落随机时间（5-11）完成
    var times = durationValue(randomFloat(5, 11));  
       
    //找出另一个随机时间的旋转的动画 时间
    var spinDuration = durationValue(randomFloat(4, 8));
    
    //与这些值设置-webkit-animation-duration属性
   
    //leafDiv.style.webkitAnimationDuration = times + ', ' + times;
    //div随机运动时间
    leafDiv.style.webkitAnimationDuration = times;
		//console.log(leafDiv)
		//下落延迟时间
    var leafDelay = durationValue(randomFloat(0, 5));
    //leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
    
    ////div随机运动延迟时间
    leafDiv.style.s = leafDelay;
    
    //图片运动旋转随机时间
    image.style.webkitAnimationDuration = spinDuration;
    // add the <img> to the <div>
    
    //img  appendChild 在div里 
    leafDiv.appendChild(image);
    
    //返回这个img元素,因此它可以添加到文档中 
    return leafDiv;
}
		//调用init函数当“落叶”页面完全加载
//window.addEventListener('load', init, false);
window.onload = function(){
	init();
}
