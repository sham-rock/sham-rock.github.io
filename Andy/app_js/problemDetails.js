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
            $fb.css("text-indent", "1.7rem");
        } else {
            $btn.addClass("fb-blue").removeClass("fb-gray").siblings("span").removeClass("magn");
            $fb.css({
                "text-indent": "0",
                // "height": "1.6rem"
            });
        }
        timer = setInterval(function() {
            // console.log($fb.val());
            var h = $searchtext.text($fb.val()).height();
            console.log(h);
            if (parseInt(h) > 20 && parseInt(h) < 80) {
                $fb.css({
                    "height": h
                })
            } else if (parseInt(h) > 80) {
                $fb.css({
                    "height": "76px"
                })
            } else {
                $fb.css({
                    "height": "1.6rem"
                });
            }


        }, 800)
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