/**
 * Created by EX-ZHANGCHAOCHENG001 on 2017/12/21.
 */
$(function() {
    sp();
    $('.sp-search .warp').on('focus', function() {
        $(this).siblings('.btn').hide();
        $(this).css({ 'width': '18.4rem' });
    })
    $('.sp-search .warp').on('blus', function() {
        $(this).siblings('.btn').show();
        $(this).css({ 'width': '15.46666667rem' });
    })
});

function sp() {
    $(".w-list>li").each(function() {
        $(this).find("p").off("touchstart");
        $(this).find("p").on("touchstart", function() {
            if ($(this).hasClass("p-orange")) {
                $(this).removeClass("p-orange");
                $(".searchresult").css("display", "none");

            } else {
                //console.log("2");
                $(".w-list>li").find("P").removeClass("p-orange");
                $(this).addClass("p-orange");
                $(".searchresult").css("display", "block");
                console.log($(this).parent().index())
            }
        });
    });
}