/**
 * Created by EX-ZHANGCHAOCHENG001 on 2017/12/21.
 */
$(function() {
    sp();
    // $('.sp-search .warp').on('focus', function() {
    //     $(this).siblings('.btn').hide();
    //     $(this).css({ 'width': '18.4rem' });
    // })
    var wHeight = window.innerHeight; //获取初始可视窗口高度  
    window.addEventListener('resize', function() { //监测窗口大小的变化事件  
        var hh = window.innerHeight; //当前可视窗口高度  

        if (wHeight > hh) { //可以作为虚拟键盘弹出事件  
            $('.sp-search .btn').hide();
            $('.sp-search .warp').css({ 'width': '18.4rem' });
        } else { //可以作为虚拟键盘关闭事件  
            $('.sp-search .btn').show();
            $('.sp-search .warp').css({ 'width': '15.3rem' });
        }
        // wHeight = hh;
    });
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