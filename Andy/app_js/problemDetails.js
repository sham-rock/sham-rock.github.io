/**
 * Created by EX-ZHANGCHAOCHENG001 on 2017/12/21.
 */
$(function() {
    replyPublic();
    clickQuiz();
    ssQuiz();
    //������һҳ
    $(".s-top>.back").click(function() {
        history.back();
    })
    var qr = $(".inner").height();
    //console.log(qr)
    $(".feedback").css({
            "margin-bottom": qr
        })
        //修复ios输入框获取焦点时不支持fixed的bug

    // var isIOS = (/iphone|ipad/gi).test(navigator.appVersion);
    // //窗口高度
    // var windowH = $(window).height();
    // console.log(windowH)

    // if (isIOS) {
    //     $(".qa-reply .inner").on('focus', 'input', function() { //js_wrap是中间含有文本框的区域
    //         // 聚焦后窗口的高度 
    //         var windowH1 = $(window).height();
    //         console.log(windowH1)
    //         $fb.css({ "position": "absolute", "bottom": 0 });

    //     }).on('blur', 'input', function() {
    //         $(".qa-reply .inner").css({ "position": "fixed", "bottom": 0 });

    //     });

    // }

    $('#ipt').focus(function() {
        console.log(222)
        var _this = $(".qa-reply .inner")

        //无键盘时输入框到浏览器窗口顶部距离
        var noInputViewHeight = $(window).height() - $(_this).height();

        //网页正文内容高度
        var contentHeight = $(document).height() - $(_this).height();

        //控制正文内容高度大于一屏，保证输入框固定底部
        contentHeight = contentHeight > noInputViewHeight ? contentHeight : noInputViewHeight;

        //因为弹出输入法需要时间，需延时处理
        setTimeout(function() {

            //弹出输入法时滚动条的起始滚动距离
            var startScrollY = $(window).scrollTop();

            //弹出输入法时输入框到窗口顶部的距离，即到软键盘顶部的起始距离
            var inputTopHeight = $(_this).offset().top - startScrollY;

            //弹出输入法时输入框预期位置，即紧贴软键盘时的位置。因输入框此时处于居中状态，所以其到窗口顶部距离即为需往下移动的距离。
            var inputTopPos = $(_this).offset().top + inputTopHeight;

            //控制div不超出正文范围
            inputTopPos = inputTopPos > contentHeight ? contentHeight : inputTopPos;

            //设置输入框位置使其紧贴输入框
            $(_this).css({ 'position': 'absolute', 'top': inputTopPos });

            //给窗口对象绑定滚动事件，保证页面滚动时div能吸附软键盘
            $(window).bind('scroll', function() {

                //表示此时有软键盘存在，输入框浮在页面上了
                if (inputTopHeight != noInputViewHeight) {

                    //页面滑动后，输入框需跟随移动的距离
                    var offset = $(this).scrollTop() - startScrollY;

                    //输入框移动后位置
                    afterScrollTopPos = inputTopPos + offset;

                    //设置输入框位置使其紧贴输入框
                    $(_this).css({ 'position': 'absolute', 'top': afterScrollTopPos });
                }
            });
        }, 100);
    }).blur(function() { //输入框失焦后还原初始状态
        $(_this).css({ "position": "fixed", "bottom": 0 });
        $(window).unbind('scroll');
    });

});

//����ظ�����
function replyPublic() {
    var $fb = $(".qa-reply .search");
    var $btn = $(".qa-reply .public");
    var $searchtext = $(".qa-reply .text")
    var timer = null;
    $fb.keyup(function() {
        if ($.trim($fb.val()) == '') {
            console.log(1);
            $btn.addClass("fb-gray").removeClass("fb-blue").siblings("span").addClass("magn");
        } else {
            $btn.addClass("fb-blue").removeClass("fb-gray").siblings("span").removeClass("magn");
        }

        // var target = this;
        // setTimeOut(function() {
        // target.scrollIntoView(true);
        // }, 100);

        // setTimeout(() => {
        // let input = $fb ;
        // input.scrollIntoView(true);
        // input.scrollIntoViewIfNeeded();
        // }, 200);
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