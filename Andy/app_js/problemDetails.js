/**
 * Created by EX-ZHANGCHAOCHENG001 on 2017/12/21.
 */
$(function() {
    replyPublic();
    clickQuiz();
    ssQuiz();
    //������һҳ
    var qr = $(".inner").height();
    //console.log(qr)
    $(".feedback").css({
            "margin-bottom": qr
        })
        //修复ios输入框获取焦点时不支持fixed的bug
        // console.log(navigator.appVersion)
        // var isIOS = (/iphone|ipad/gi).test(navigator.appVersion);
        // //窗口高度
        // var windowH = $(window).height();
        // console.log(windowH)

    // if (isIOS) {
    //     $(".qa-reply .inner").on('focus', 'input', function() { //js_wrap是中间含有文本框的区域
    //         // 聚焦后窗口的高度  
    // setTimeOut(function() {
    //     var windowH1 = $(window).height();
    //             console.log(windowH1)
    // }, 100);
    //         $fb.css({ "position": "absolute", "bottom":window-windowH1 });

    //     }).on('blur', 'input', function() {
    //         $(".qa-reply .inner").css({ "position": "fixed", "bottom": 0 });

    //     });

    // }
    // $("#ipt").on('focus', function() {
    //     console.log(222)
    //     var target = $(".qa-reply .inner");
    //     setTimeout(function() {
    //         // target.scrollIntoView(true);
    //         target.animate({ scrollTop: target.offset().top + 100000 }, 1000);
    //     }, 100);

    // })

    // $("#msgShow").animate({scrollTop:$("#msgRear").offset().top+100000}, 1000);

    // setTimeout(function() {
    //     // document.body.scrollTop = document.body.scrollHeight;
    //     console.log(document.body.scrollTop)
    //     console.log(document.body.scrollHeight)
    // }, 300);
});

//����ظ�����
function replyPublic() {
    var $fb = $(".qa-reply .search");
    var $btn = $(".qa-reply .public");
    $fb.keyup(function() {
        if ($.trim($fb.val()) == '') {
            console.log(1);
            $btn.addClass("fb-gray").removeClass("fb-blue").siblings("span").addClass("magn");
        } else {
            $btn.addClass("fb-blue").removeClass("fb-gray").siblings("span").removeClass("magn");
        }
    });

    $btn.off("touchstart");
    $btn.on("touchstart", function() {
        if ($(this).hasClass("fb-blue")) {
            var value = $fb.val();
            var h = $(document.body).height();
            var wh = $(window).height();
            if (value.length <= 200) {
                $(".question_fullscreen").css({
                    height: h > wh ? h : wh
                }).show();

            } else {
                commonPlugin.reTips("您的问题过长，请输入少于200字的问题");
                return false;
            }
        }
    });

}
//�7�8����
function clickQuiz() {
    $(".qa-comment .item").each(function() {
        $(this).find("span.like_interest").off("touchstart");
        $(this).find("span.like_interest").on("touchstart", function() {
            if ($(this).hasClass("blue-act")) {
                $(this).removeClass("blue-act");
                $(this).children(".attention").removeClass("attention-blue");
            } else {
                $(this).addClass("blue-act");
                $(this).children(".attention").addClass("attention-blue");
            }
        });
    });
}
//����ͼ�����

function ssQuiz() {
    $(".feedback .item").each(function() {
        $(this).find("i.attention").off("touchstart");
        $(this).find("i.attention").on("touchstart", function() {
            if ($(this).hasClass("attention-blue")) {
                $(this).removeClass("attention-blue").addClass("attention-gray");
            } else {
                $(this).addClass("attention-blue").removeClass("attention-gray");
            }
        });
    });
}