$(document).ready(function(){!function(){$(".play").on("click",function(n){$(".header_content").fadeOut(500,function(){$(".bg-wrapper").fadeOut(300),$(".bg-video").get(0).play()})}),$(".carousel").carousel({interval:2e4}),$(".counter").counterUp({delay:30,time:1500}),$(".circle").waypoint(function(n){"down"===n?$(".circle").fadeIn(100).circleProgress({fill:"#42b8dd",emptyFill:"rgba(0, 0, 0, 0)",startAngle:-Math.PI/2,size:170,animationStartValue:0,thickness:10}).on("circle-animation-progress",function(n,i){var e=$(this).data("value");$(this).find("strong").html(parseInt(100*i*e))}):"up"===n&&$(".circle").fadeOut(300)},{offset:"80%"}),$("#accordion").accordion({heightStyle:"content"}).on("accordionactivate",function(n,i){$(i.newHeader[0]).find(".accord_icon")[0].innerHTML="-"}),$(".ui-accordion-header").on("click",function(n){$(".ui-accordion-header").find(".accord_icon").each(function(n,i){i.innerHTML="+"})}),$(".form_group").find("input, textarea").on("focus",function(n){$(this).siblings().fadeOut(300).end().on("blur",function(n){var i=$(this)[0].value;""===i&&$(this).siblings().fadeIn(300)})}).end().find("label").on("click",function(n){$(this).fadeOut().siblings().trigger("focus")}),$("#portfolio_container").mixItUp(),$(".popup-with-zoom-anim").magnificPopup({type:"inline",fixedContentPos:!1,fixedBgPos:!0,overflowY:"auto",closeBtnInside:!0,preloader:!1,midClick:!0,removalDelay:300,mainClass:"my-mfp-zoom-in"})}(),$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")||location.hostname==this.hostname){var n=$(this.hash);if(n=n.length?n:$("[name="+this.hash.slice(1)+"]"),n.length)return $("html,body").animate({scrollTop:n.offset().top},1e3),!1}})});