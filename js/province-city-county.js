$(function(){
	//初始化省份选择
	(function(){
		// alert("start");
		var optionStr="<option value=\"-1\">请选择省</option>";
		$.ajax({
			url:"http://b2b.haier.com/shop/api/process/app/getAreaInfo",
			type:"get",
			datatype:"jsonp",
			scriptCharset: "utf-8",
			success:function(data){
				// console.log(data.body.result);
				var html=optionStr+template("optionTemp",data.body);
				$(".province").html(html);
			}
		});
	})();
	//省份选择监听后，初始化市
	$(".province").change(function(){
		var provinceId=$(".province").val();
		var optionStr="<option value=\"-1\">请选择市</option>";
		$.ajax({
			url:"http://b2b.haier.com/shop/api/process/app/getAreaInfo?areaId="+provinceId,
			type:"get",
			datatype:"jsonp",
			scriptCharset: "utf-8",
			success:function(data){
				console.log(data.body);
				var html=optionStr+template("optionTemp",data.body);
				$(".city").html(html);
			}
		});
	});
	//市选择监听，初始化县
	$(".city").change(function(){
		var cityId=$(".city").val();
		console.log(cityId);
		var optionStr="<option value=\"-1\">请选择县</option>";
		$.ajax({
			url:"http://b2b.haier.com/shop/api/process/app/getAreaInfo?areaId="+cityId,
			type:"get",
			datatype:"jsonp",
			scriptCharset: "utf-8",
			success:function(data){
				console.log(data.body);
				var html=optionStr+template("optionTemp",data.body);
				$(".county").html(html);
			}
		});
	});
	//县选择 监听
})