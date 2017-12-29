$(function(){
	question_textarea();
	question_lists();
	question_sumbit();
	//������һҳ
	console.log(1)
	$(".s-top>.back").click(function(){
		history.back();
	})
})
function question_textarea(){
	$("#question_inputcontentbox").off();
	$("#question_inputcontentbox").on({
		focus:function(){
			$(".question_defaultprop").hide();
		},
		blur:function(){
			if($(this).val()==""){
				$(".question_defaultprop").show();
				$("#question_sumbit").removeClass("question_bnt_blue").addClass("question_bnt_gray");
			}else{
				var value=$(this).val();
				$(".question_wordnum span").text(value.length);
				$(".question_labe_lists li").each(function(){
					if($(this).hasClass("blue")){
						$("#question_sumbit").removeClass("question_bnt_gray").addClass("question_bnt_blue");
					}
				});
			}
		},
		keyup:function(){
			var value=$(this).val();
			$(".question_wordnum span").text(value.length);
		},
		input:function(){
			var value=$(this).val();
			$(".question_wordnum span").text(value.length);
		}
	});

}
function question_lists(){
	$(".question_labe_lists li").off("touchstart");
	$(".question_labe_lists li").on("touchstart",function(){
		$(this).removeClass("gray").addClass("blue");
		$(this).siblings("li").removeClass("blue").addClass("gray");
		if($("#question_inputcontentbox").val()!=""){
			$(".question_labe_lists li").each(function(){
				if($(this).hasClass("blue")){
					$("#question_sumbit").removeClass("question_bnt_gray").addClass("question_bnt_blue");
				}
			});
		}else{
			$("#question_sumbit").removeClass("question_bnt_blue").addClass("question_bnt_gray");
		}
	});
}
function question_sumbit(){
	$("#question_sumbit").off("touchstart")
	$("#question_sumbit").on("touchstart",function(){
		if($(this).hasClass("question_bnt_blue")){
			var reg=/^1[0-9]{10}$/;
			var value=$("#question_inputcontentbox").val();
			if(value.length<=500){
				if($("#question_input_phone").val()!=""){
					let v = StringUtils.validateMobile($("#question_input_phone").val(),false);
					if(!v.isValid){
						commonPlugin.reTips(v.msg);
						return false;
					}else{
						$(".question_fullscreen").show();
						question_confirm();
					}
				}else {
					$(".question_fullscreen").show();
					question_confirm();
				}
			}else{
				commonPlugin.reTips("您的问题过长，请输入少于500字的问题");
				return false;
			}
		}
	});
}
function question_confirm(){

	$("#question_confirm").off("touchstart");
	$("#question_confirm").on("touchstart",function(){
		$(".question_fullscreen").hide();
		$("#question_inputcontentbox").val("").siblings(".question_defaultprop").show();
	});
}


