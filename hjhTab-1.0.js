/*
* $.fn.hjhTab
* @extends jQuery
* @anthor 迦若
* @version 1.0
* @date 2014-6-11
* @example
* $("test").hjhTab({width: 100, height: 100});
* */
(function($){

    $.fn.hjhTab = function(options){
        var sets = $.extend({}, $.fn.hjhTab.defaults, options);
        return this.each(function(){
            var obj = $(this),
                method,
                cL = obj.find("a.l"),
                cR = obj.find("a.r");
            method = {
                left: function(){//向左
                    var $cur = obj.find("ul li.cur");
                    if($cur.nextAll().length && !$cur.is(":animated")){
                        $cur.next().css({left: sets.width});
                        $cur.animate({left: -sets.width}, sets.speed, function(){
                            $(this).css({left: sets.width}).removeClass("cur").hide();
                            $(this).next().addClass("cur");
                        });
                        $cur.next().show().animate({left: 0}, sets.speed, function(){
                            method.gudge();
                        });
                    }
                },
                right: function(){//向右
                    var $cur = obj.find("ul li.cur");
                    if($cur.prevAll().length && !$cur.is(":animated")){
                        $cur.prev().css({left: -sets.width});
                        $cur.animate({left: sets.width}, sets.speed, function(){
                            $(this).css({left: 0}).removeClass("cur").hide();
                            $(this).prev().addClass("cur");
                        });
                        $cur.prev().show().animate({left: 0}, sets.speed, function(){
                            method.gudge();
                        });
                    }
                },
                gudge: function(){//判断按钮可点击
                    var $cur = obj.find("ul li.cur");
                    if($cur.nextAll().length){
                        cL.fadeTo(sets.speed, 1);
                    }else{
                        cL.fadeTo(sets.speed, sets.fade);
                    }
                    if($cur.prevAll().length){
                        cR.fadeTo(sets.speed, 1);
                    }else{
                        cR.fadeTo(sets.speed, sets.fade);
                    }
                }
            }
            obj.css({width: sets.width, height: sets.height});
            obj.find("ul").css({width: sets.width, height: sets.height});
            method.gudge();
            cL.bind(sets.type, function(e){
                method.left();
                e.preventDefault();
            });
            cR.bind(sets.type, function(e){
                method.right();
                e.preventDefault();
            });
        });
    }
    $.fn.hjhTab.defaults = {
        width: 'auto',
        height: 'auto',
        speed: 500,
        type: "click",
        fade: 0.5,
        callback: function(){  }
    };
    $.fn.hjhTab.version = 1.0; //版本号
})(jQuery);