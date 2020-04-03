$(document).ready(function(){
	// $(window).on("load", function(){//加载完再显示图片?
		// console.log("hello")
			getLocation();
			//需要加载的图片资源!!
			var dataImg={"data":[{"src":"8.png"},{"src":"9.png"},{"src":"10.png"}]};
			// 然后绑定滚动事件
			$(window).scroll(function(){
				console.log("scroll");
				//在当前整体高度减掉即将加载的那张图片高度一半的时候,加载新图片
				//当超过时,就加载新的图片资源.
				if(getLastHeight()){
					//遍历dataImg中的资源并加载.
					$.each(dataImg.data,function(index,value){
						//创建并添加盒子
						console.log("new img");
						var pin=$("<div>").addClass("pin").appendTo("#main");
						var box=$("<div>").addClass("box").appendTo(pin);
						var img=$("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(box);
					})
					//调用方法摆放图片
					getLocation();
				}
			})
	// })
});

function getLastHeight(){
	var box=$(".pin");
	//获取最后那张图片的高度的一半的位置!
	// console.log(box.last().offset().top);
	//box.last().get(0)获取的是dom元素,需要用Js的方法获取box.last().get(0).offsetTop;
	var lastImgHeight=(box.last().get(0)).offsetTop-Math.floor(box.last().height()/2);
	//获取窗口高度
	var windowHeight=$(window).height();
	//获取滚动的高度
	var scrollHeight=$(window).scrollTop();
	console.log(scrollHeight+windowHeight+"     "+lastImgHeight);
	//当滚动超过指定的位置时,就返回ture 加载新图片
	if(lastImgHeight<windowHeight+scrollHeight)	return true;
	else	return false;
}
	
function getLocation(){//获取本次插入的位置
	//先计算当前屏幕放几张图片??
	var box=$(".pin");
	// console.log(box.eq(0).width());
	var boxWid=$(".pin").eq(0).width();
	var num=Math.floor($(window).width()/boxWid);
	console.log(num);
	var numArr=[];
	box.each(function(index,value){//参数:索引,值?
		//获取当前索引对象的高度
		var boxHeight=box.eq(index).innerHeight();//用带padding的高度
		// console.log(boxHeight);
		if(index<num){//第一行的直接添加
			numArr[index]=boxHeight;
		}else{
			var minHeight=Math.min.apply(numArr,numArr);
			// console.log(minHeight);
			//查找返回最小高度的索引
			var minIndex=$.inArray(minHeight,numArr);
			//添加到当前最短的列
			$(value).css({
				position:"absolute",
				top:minHeight,
				left:box.eq(minIndex).position().left
			});
			//更新最短列的高度
			numArr[minIndex]+=box.eq(index).innerHeight();
		}
	})
}