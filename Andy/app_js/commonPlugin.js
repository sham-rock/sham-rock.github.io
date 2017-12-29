var commonPlugin = {
    /**
     * 显示90%宽的弹窗
     * @param  obj  要显示的对象
     * @param  bool 当传false值时，弹窗高度自适应，且不超过90%高，无值时默认显示固定90%高
     */
    popup:function(obj,bool){
        var el = $(obj);
        var st = $(window).scrollTop(), //滚动条长度
            $bd = $("body"),     
            bdW = $bd.width(),
            bdH = $bd.height(),    
            winH = $(window).height(),  //视口高
            winW = $(window).width(),   //视口宽            
            height = (bdH-winH)>0 ? bdH : winH,
            width = (bdW-winW)>0 ? bdW : winW,
            objH = el.height(),         //显示的内容高  
            objW = el.width();          //显示的内容宽        

        if(bool != false){//固定长宽高
            var header = el.find('.popup_header'),
                footer = el.find(".popup_footer"),
                cont = el.find(".popup_cont");

            el.show().css({
                "position":"fixed",
                "top" : winH * 0.05 + "px",
                "left" :(width - bdW)/2 + bdW * 0.05 + "px",
                "width" : bdW * 0.9 + "px",
                "height" : winH * 0.9 + "px",
                "z-index" : "1000"
            });

            //内容体超出高度时可滚动
            cont.height((el.height() - header[0].scrollHeight - footer[0].scrollHeight)+"px");

        }else{//随内容宽高显示
            objW = objW > bdW * 0.9 ? bdW * 0.9 : objW;
            objH = objH > winH * 0.9 ? winH * 0.9 : objH;
            el.css({
                "position":"fixed",
                "top":(winH - objH)/2,
                "left":(width - objW)/2,
                "width":objW,
                "height" : objH,
                "overflow-y" : "scroll",
                "z-index" : "1000"
            }).show();
        }

        $(".modal_overlay").show();

        //禁止弹层下的body滚动
        $bd.css({
            "position":"fixed",
            "top":-st+"px",
            "left":(width - bdW)/2 + "px"
        });

        el.on("touchstart",".close_popup",function(e){
            e.preventDefault();
            $bd.css("position", "static").scrollTop(st);
            $(".modal_overlay").hide();
            el.hide();
        })
    },
    /**
     * 显示自适应且高度不超过90%，宽为100%的弹窗
     * @param  obj  要显示的对象
     */
    modal:function(obj){
        var el = $(obj);
        var st = $(window).scrollTop(), //滚动条长度
            $bd = $("body"),     
            bdW = $bd.width(),
            bdH = $bd.height(),    
            winH = $(window).height(),  //视口高
            winW = $(window).width(),   //视口宽            
            height = (bdH-winH)>0 ? bdH : winH,
            width = (bdW-winW)>0 ? bdW : winW,
            objH = el.height(),         //显示的内容高  
            objW = el.width();          //显示的内容宽  

            el.css({
                "position":"fixed",
                "top":(winH - objH)/2,
                "left":(winW - objW)/2,
                "width":objW,
                "height" : objH,
                "z-index" : "1000"
            }).show();

        $(".modal_overlay").show();

        //禁止弹层下的body滚动
        $bd.css({
            "position":"fixed",
            "top":-st+"px",
            "left":(width - bdW)/2 + "px"
        });

        el.on("touchstart",".close_modal",function(e){
            e.preventDefault();
            $bd.css("position", "static").scrollTop(st);
            $(".modal_overlay").hide();
            el.hide();
        })
    },
    /**
     * 关闭弹窗
     * @param  obj  弹窗对象
     */
    closeModal:function(obj){
        var st = $("body").css("top"); //滚动条长度

            $("body").css("position", "static").scrollTop(-parseInt(st));
            $(".modal_overlay").hide();
            obj.hide();
    },
    /**
     * 显示loading加载
     */
    loadShow:function(){
        var st = $(window).scrollTop(), //滚动条长度
            $bd = $("body"),
            bdW = $bd.width(),
            bdH = $bd.height(),    
            winH = $(window).height(),  //视口高
            winW = $(window).width(),   //视口宽            
            height = (bdH-winH)>0 ? bdH : winH,
            width = (bdW-winW)>0 ? bdW : winW;

        $(".modal_overlay").show();
        $(".loading").show();

        //禁止弹层下的body滚动
        $bd.css({
            "position":"fixed",
            "top":-st+"px",
            "left":(width - bdW)/2 + "px"
        });  
    },
    /**
     * 关闭loading加载
     */
    loadHide:function(){
        var $bd = $("body"),
            st = parseFloat($bd.css("top"));//滚动条长度

        $(".modal_overlay").hide();
        $(".loading").hide();
        $bd.css("position","static").scrollTop(-st);//恢复body滚动
    },
    /**
     * 自定义alert提示框
     * @param  str  提示语
     * @param  btnText  关闭按钮文字，默认“确定”
     * @param  callback  关闭回调函数 
     */
    reAlert:function(str,btnText,callback){
        var st = $(window).scrollTop(), //滚动条长度
            $bd = $("body"),
            bdW = $bd.width(),
            bdH = $bd.height(),    
            winH = $(window).height(),  //视口高
            winW = $(window).width(),   //视口宽            
            height = (bdH-winH)>0 ? bdH : winH,
            width = (bdW-winW)>0 ? bdW : winW;

        var $mode = $("<div class='modal_alert'></div>").css("z-index","1100").appendTo($bd);        
        var $awrap = $("<div class='alert_wrap'><div class='cont'>" + str + "</div><a class='btn_close'>确&nbsp;定</a></div>").appendTo($bd);

        $(".alert_wrap").css({
            "width":bdW * 0.8,
            "left":(width - bdW * 0.8)/2,
            "top":(winH - $(".alert_wrap").height())/2
        });

        //禁止弹层下的body滚动
        $bd.css({
            "position":"fixed",
            "top":-st+"px",
            "left":(width - bdW)/2 + "px"
        });

        $bd.delegate(".alert_wrap .btn_close","touchstart",function(e){
            e.preventDefault();
            $mode.remove();
            $awrap.remove();  
            var st = parseFloat($bd.css("top"));//滚动条长度
            $bd.css("position","static").scrollTop(-st);//恢复body滚动               
        });

        if(btnText != undefined && typeof callback == "function"){
            $(".alert_wrap .btn_close").html(btnText);    
            $bd.delegate(".alert_wrap .btn_close","touchstart",function(){
                callback();
            });   
        }
    },
/**
     * 自定义confirm提示框
     * @param  str  提示语
     * @param  obj 
     * {
     *     okText:确定按钮文字，
     *     cancelText:取消按钮文字，
     *     okCallback:确定回调，
     *     cancelCallback:取消回调
     * }
     */
    reConfirm:function(str,obj){
        var st = $(window).scrollTop(), //滚动条长度
            $bd = $("body"),
            bdW = $bd.width(),
            bdH = $bd.height(),    
            winH = $(window).height(),  //视口高
            winW = $(window).width(),   //视口宽            
            height = (bdH-winH)>0 ? bdH : winH,
            width = (bdW-winW)>0 ? bdW : winW;

        var $mode = $("<div class='modal_alert'></div>").css("z-index","1100").appendTo($bd);        
        var $awrap = $("<div class='alert_wrap'><div class='cont'>" + str + "</div><a class='btn_close btn_ok'>确&nbsp;定</a><a class='btn_close btn_cancel'>取&nbsp;消</a></div>").appendTo($bd);

        $(".alert_wrap").css({
            "width":bdW * 0.8,
            "left":(width - bdW * 0.8)/2,
            "top":(winH - $(".alert_wrap").height())/2
        });

        //禁止弹层下的body滚动
        $bd.css({
            "position":"fixed",
            "top":-st+"px",
            "left":(width - bdW)/2 + "px"
        });

        if(obj){
            var ot = obj.oKText, //“确认”按钮的文字
                ct = obj.cancelText, //“取消”按钮的文字
                oc = obj.okCallback, //点击“确认”按钮回调函数
                cc = obj.cancelCallback; //点击“取消”按钮回调函数
            if(ot){
                $(".alert_wrap .btn_ok").html(ot); 
            }   
            if(ct){
                $(".alert_wrap .btn_cancel").html(ct); 
            }  
            if(oc){
                $(".alert_wrap .btn_ok").on("touchstart",function(){
                    oc();  
                })
            }   
            if(cc){
                $(".alert_wrap .btn_cancel").on("touchstart",function(){
                    cc();  
                })
            }    
        }
        $(".alert_wrap .btn_close").on("touchstart",function(e){
            e.preventDefault();
            $mode.remove();
            $awrap.remove();  
            var st = parseFloat($bd.css("top"));//滚动条长度
            $bd.css("position","static").scrollTop(-st);//恢复body滚动  
        })
    }, 
    /**
     * 错误提示框
     * @param  id  表单字段的id
     * @param  str  提示错误语
     */
    showError:function(id,str){
        if($("#" + id + "_error").length==1)$("#" + id + "_error").remove();
        var li = $("#" + id).closest("li"),
            html = "<div class='errorInfo' id='" + id + "_error'><span>" + str + "</span><em></em></div>";
        li.append($(html));
        setTimeout("commonPlugin.hideError('" + id + "_error')",5000);
        $("body").scrollTop(li.offset().top - 50);
    },    
    /**
     * 隐藏所有错误提示框
     * @param  id  表单字段的id
     */
    hideError:function(id){
        if(typeof id == 'undefined'){
            $(".errorInfo").remove();
        }else{
            $("#" + id).remove();
        }
    },
    reTips:function(str,callback){
        var st = $(window).scrollTop(), //滚动条长度
            $bd = $("body"),
            bdW = $bd.width(),
            bdH = $bd.height(),    
            winH = $(window).height(),  //视口高
            winW = $(window).width(),   //视口宽            
            height = (bdH-winH)>0 ? bdH : winH,
            width = (bdW-winW)>0 ? bdW : winW;

        var $mode = $("<div class='mask_tips'></div>").css("z-index","1100").appendTo($bd);        
        var $awrap = $("<div class='tips_wrap'><p class='cont'>" + str + "</p></div>").appendTo($bd);

        $(".tips_wrap").css({
            "position":"fixed",
            "border-radius":"0.2rem",
            "height":"2.6rem",
            "z-index":1101,
            "font-size":"0.72rem",
            "font-weight":"bold",
            "background-color":"rgba(31,31,31,0.8)",
            "color":"#fff",
            "text-align":"center",
            "line-height":"2.6rem",
            "width":bdW * 0.8,
            "left":(width - bdW * 0.8)/2,
            "top":(winH - $(".alert_wrap").height())/2
        });

        //禁止弹层下的body滚动
        $bd.css({
            "position":"fixed",
            "top":-st+"px",
            "left":(width - bdW)/2 + "px"
        });

        setTimeout(function(){
            $mode.remove();
            $awrap.remove();
            var st = parseFloat($bd.css("top"));//滚动条长度
            $bd.css("position","static").scrollTop(-st);//恢复body滚动 
            callback();
        }, 2000);
    },
}