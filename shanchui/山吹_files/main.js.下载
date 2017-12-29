!window.$yhsd && (window.$yhsd = {});
window.$yhsd.route = {
    path: window.location.pathname,
    init: function (oConf) {
        var self = this;
        //
        if (oConf) {
            //
            var oConfAll = self.pathRegexp;
            // 添加自定义路由
            $.each(oConf, function (key) {
                if (!oConfAll[key]) {
                    var aRegExp = key.split('/');
                    aRegExp.shift();
                    aRegExp.pop();
                    oConfAll[key] = new RegExp(aRegExp.join('/'));
                }
            });
            // 运行匹配的controller
            $.each(oConfAll, function (key, rPath) {
                var aPath = self.path.match(rPath);
                if (aPath && aPath.length === 1) {
                    oConf[key] && oConf[key](aPath[0]);
                }
            });
        }
    },
    pathRegexp: {
        all: /.*/, // 所有页面
        index: /^\/$/, //首页
        cart: /^\/cart\/?$/, //购物车
        accountIndex: /^\/account\/?$/, // 个人信息
        accountLogin: /^\/account\/login\/?$/, // 登录
        accountRegister: /^\/account\/register\/?$/, // 注册
        accountRegisterWithEmail: /^\/account\/register_with_email\/?$/, // 注册 - 邮箱
        accountRegisterWithUsername: /^\/account\/register_with_user_name\/?$/, // 注册 - 用户名
        accountRegisterWithMobile: /^\/account\/register_with_mobile\/?$/, // 注册 - 手机号码
        accountChangePassword: /^\/account\/change_password\/?$/, // 修改密码
        accountForgetPassword: /^\/account\/forget_password\/?$/, // 忘记密码
        accountResetPasswordWithEmail: /^\/account\/reset_password_with_email\/?$/, // 忘记密码 - 邮箱
        accountResetPasswordWithMobile: /^\/account\/reset_password_with_mobile\/?$/, // 忘记密码 - 手机号码
        accountReset: /^\/account\/reset\/.+\/?$/, // 重设密码
        accountValidateEmail: /^\/account\/reset\/.+\/?$/, // 邮箱注册成功 - 验证邮箱
        accountSocialBind: /^\/account\/social\/bind$/, // 社交绑定
        orderCreate: /^\/account\/create_order\/?$/, // 创建订单
        orderAll: /^\/account\/orders\/?$/, // 订单列表
        orderDetail: /^\/account\/orders\/.+\/?$/, // 订单详情
        productAll: /^\/products\/?$/, //所有商品
        productDetail: /^\/products\/.+\/?$/, //商品详情
        discounts: /^\/discounts\/.+\/?$/, // 参加某个优惠活动的商品列表
        types: /^\/types\/.+\/?$/, // 拥有某个分类的商品列表
        vendors: /^\/vendors\/.+\/?$/, // 拥有某个品牌的商品列表
        search: /^\/search\/?$/, // 搜索结果
        page: /^\/pages\/.+\/?$/, // 所有自定义页面
        blogAll: /^\/blogs\/?$/, //所有博客
        blogDetail: /^\/blogs\/.+\/?$/, //博客详情
        postAll: /^\/posts\/?$/, //所有博客
        postDetail: /^\/posts\/.+\/?$/ //文章详情
    }
};

var Index = {
    _post_count: 4,
    postTpl: '<div class="post-list-each #{is_last}">' +
        '    <a href="#{url}" class="post-list-each-pic settings-main_header_color">' +
        '        <div class="post-list-each-pic-inner"><img class="lazyload" src="//asset.ibanquan.com/common/img/blank.gif" data-src="#{cover_url}"/></div>' +
        '    </a>' +
        '    <div class="post-list-each-pic-sub settings-main_color"></div>' +
        '    <h3>' +
        '        <a href="#{url}" class="settings-main_header_color settings-main_border">#{title}</a>' +
        '    </h3>' +
        '    <p class="settings-main_header_color">#{summary}</p>' +
        '</div>',
    init: function () {
        var self = this;
        var $postList = $('#yhsd_main_list');
        var defaultPostImage = (window.assetPath + window.postImage).replace('noimage', 'noimage_w220h151gc');
        yhsd.ready(function (jssdk) {
            window.Jssdk = jssdk;
            jssdk.post.get({
                size: self._post_count
            }, function (data) {
                var listInner = '';
                var postTpl = self.postTpl;
                var currentHandle = location.pathname.slice(7);
                if (data.res.code === 200 && data.res.posts.length > 1) {
                    var posts = data.res.posts,
                        i,
                        cover_image,
                        cover_url;
                    for (i = 0; i < posts.length; i++) {
                        cover_image = posts[i].cover_image;
                        if(!cover_image || JSON.stringify(cover_image) === '{}') {
                            cover_url = defaultPostImage;
                        } else {
                            cover_url = jssdk.util.getImageUrl(cover_image.image_id, cover_image.image_name, 'w220h151gc', cover_image.image_epoch);
                        }
                        listInner += postTpl.replace(/#{url}/g, posts[i].page_url)
                            .replace(/#{title}/, posts[i].title)
                            .replace(/#{cover_url}/, cover_url)
                            .replace(/#{summary}/, posts[i].summary)
                            .replace(/#{is_last}/, (i === 3) ? 'last-child' : '');
                    }
                } else {
                    listInner = '<div class="post-re-list-tip settings-main_desc_color">暂无内容</div>';
                }
                $postList.html(listInner);
                if(window.lazyload && window.lazyload.init) {
                    window.lazyload.init();
                }
            });
        });
    }
}

// var Nav = {
//     init: function () {
//         var $dropdown = $('#dropdown-list');
//         var $currentActive;
//         var timer;
//         $('.dropdown-list-item').on('mouseenter', function (e) {
//                 if (timer) {
//                     clearTimeout(timer);
//                     timer = null;
//                 }
//                 var $tar = $(e.currentTarget);
//                 if ($currentActive) {
//                     $currentActive.removeClass('active');
//                 }
//                 $tar.addClass('active');
//                 $currentActive = $tar;
//             })
//             .on('mouseleave', function (e) {
//                 var $tar = $(e.currentTarget);
//                 timer = setTimeout(function () {
//                     $tar.removeClass('active');
//                     $currentActive = null;
//                 }, 200);
//             });
//     }
// };


// 移动导航
var Mobilenav = {
  navEl : $('#nav_mobile'),
  menuEl : $('#mobile_menu'),
  bgEl : $('#mobile_bg'),
  closeMbileNav:$('#closeMbileNav'),
  init : function(){
    var self = this;
    var bInMenu = false;
    var bStartMove = false;
    //
    if($('html')[0].className.indexOf('ie') > -1){
        return false;
    }
    //
    $(window).on('resize', function(){
      self.menuEl.css({'left' : '-100%'});
      $('.page').css({'height' : 'auto', 'overflow' : 'auto'});
    });
    //
    self.closeMbileNav.on('click', function(){
      $('#mobile_menu').animate({
          'right' : '-100%'
        },function(){
          $('.page').css({'height' : 'auto', 'overflow' : 'auto'});
        });
       $('#side_film').css('display','none');
    });
    self.navEl.on('click', function(){
      //
      self.menuEl.show();
      //
      $('html,body').addClass('page');
      $('#mobile_menu').animate({
        'right' : '0'
      }, function(){
        var sHeight = $(window).height() + 'px';
        $('.page').css({'height' : sHeight, 'overflow' : 'hidden'});
        bInMenu = true;
      });
    });

    var touchSatrtFunc = function(evt){
      if(!bInMenu){
        return;
      }
      var touch = evt.touches[0]; //获取第一个触点
      var x = Number(touch.pageX); //页面触点X坐标
      self.startX = x;
      bStartMove = true;
    };

    $('.side-nav-link-has_sub a').click(function(e) {
        var _item, _itemP;
        _item = $(e.target);
        _itemP = $(e.target).parent();
        linkID = _item.data('linkid');


        /* 事件父元素 */
        if (_itemP.hasClass('active')) {
          _itemP.removeClass('active');
          _itemP.addClass('noactive');
          $('.noactive + li > .side-nav-link-sub_list').slideUp();
        } else {
          _itemP.addClass('active');
          _itemP.removeClass('noactive');
         $('.active + li > .side-nav-link-sub_list').slideDown();
        }
      });
    document.addEventListener('touchstart', touchSatrtFunc, false);
  }
};

var PostLoad = {
    PostEach:$('.post-list-each '),
    init:function(){
        var self = this;
        self.PostEach.each(function(i){
            var that = this;
            setTimeout(function(){
                $(that).addClass('animated');
            },i*100)
            
        })
    }
};

$(document).ready(function () {
    var oRouteCustom = {};
    oRouteCustom['all'] = function (path) {
        // Nav.init();
        Mobilenav.init();
    };
    oRouteCustom['index'] = function (path) {
        Index.init();
    };
    oRouteCustom['post'] = function (path) {
        PostLoad.init();
    };
    $yhsd.route.init(oRouteCustom);
});