$(function(){
    quote.init();
    var $wp = $("#wrapper");//主体元素
    var range = 0; //距下边界长度/单位px
    var maxnum = 20; //设置加载最多次数
    var num = 1;
    var totalheight = 0;
    $(window).scroll(function() {
        var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)

        //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());
        //console.log("页面的文档高度 ："+$(document).height());
        //console.log('浏览器的高度：'+$(window).height());

        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
        if (($(document).height() - range) <= totalheight && num != maxnum) {
            $wp.append('<div class="item"> <div class="userImg"> <i class="uImg"><img src="./app_images/user1.png" alt=""/></i> <span class="tel">136****9911</span> </div> <div class="txt"> <a href="./problemDetails.html"> <p class="t1">我在今年双十一时候买了保险，送了意外无忧险和绿色通道服务，明年续保的时候这两款赠送的还…</p> <p class="t2">意外险是2017双十一指定赠送险哦，只赠送一年，明年可以… </p></a> </div> <div class="otherInfo"> <div class="lpfw fl">投保查询</div> <div class="like fr"> <span class="like_interest"><i class="attention"></i><em class="c-quiz">22</em>人关注</span> <span>|</span> <span><i class="reply"></i>3人回答</span> </div> </div> </div>');
            num++;
        }
        });

});
var quote ={
    sComment:$(".s-comment"),
    init:function(){
        quote.mySwiper();
        quote.clickQuiz();
    },
    mySwiper:function(){
        var swipe= new Swiper("#banner",{
            //direction:"vertical",
            loop:true,
            autoplay:3000,
            pagination:".swiper-pagination"
        })
    },
    clickQuiz: function () {
        $(".s-comment .item").each(function () {
            $(this).find("span.like_interest").off("touchstart");
            $(this).find("span.like_interest").on("touchstart", function () {
                if ($(this).hasClass("blue-act")) {
                    $(this).removeClass("blue-act");
                    $(this).children(".attention").removeClass("attention-blue");
                } else {
                    console.log("2");
                    $(this).addClass("blue-act");
                    $(this).children(".attention").addClass("attention-blue");
                }
            });
        });
    }
};

