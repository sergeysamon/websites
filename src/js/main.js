;
(function() {

    'use strict';



    // iPad and iPod detection
    var isiPad = function() {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function() {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };


    // // Main Menu Superfish
    // var mainMenu = function() {

    //  $('#fh5co-primary-menu').superfish({
    //      delay: 0,
    //      animation: {
    //          opacity: 'show'
    //      },
    //      speed: 'fast',
    //      cssArrows: true,
    //      disableHI: true
    //  });

    // };

    // // Parallax
    // var parallax = function() {
    //  $(window).stellar();
    // };


    // // Offcanvas and cloning of the main menu
    // var offcanvas = function() {

    //  var $clone = $('#fh5co-menu-wrap').clone();
    //  $clone.attr({
    //      'id' : 'offcanvas-menu'
    //  });
    //  $clone.find('> ul').attr({
    //      'class' : '',
    //      'id' : ''
    //  });

    //  $('#fh5co-page').prepend($clone);

    //  // click the burger
    //  $('.js-fh5co-nav-toggle').on('click', function(){

    //      if ( $('body').hasClass('fh5co-offcanvas') ) {
    //          $('body').removeClass('fh5co-offcanvas');
    //      } else {
    //          $('body').addClass('fh5co-offcanvas');
    //      }
    //      // $('body').toggleClass('fh5co-offcanvas');

    //  });

    //  $('#offcanvas-menu').css('height', $(window).height());

    //  $(window).resize(function(){
    //      var w = $(window);


    //      $('#offcanvas-menu').css('height', w.height());

    //      if ( w.width() > 769 ) {
    //          if ( $('body').hasClass('fh5co-offcanvas') ) {
    //              $('body').removeClass('fh5co-offcanvas');
    //          }
    //      }

    //  });

    // }



    // // Click outside of the Mobile Menu
    // var mobileMenuOutsideClick = function() {
    //  $(document).click(function (e) {
    //     var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
    //     if (!container.is(e.target) && container.has(e.target).length === 0) {
    //       if ( $('body').hasClass('fh5co-offcanvas') ) {
    //          $('body').removeClass('fh5co-offcanvas');
    //      }
    //     }
    //  });
    // };


    // // Animations

    // var contentWayPoint = function() {
    //  var i = 0;
    //  $('.animate-box').waypoint( function( direction ) {

    //      if( direction === 'down' && !$(this.element).hasClass('animated') ) {

    //          i++;

    //          $(this.element).addClass('item-animate');
    //          setTimeout(function(){

    //              $('body .animate-box.item-animate').each(function(k){
    //                  var el = $(this);
    //                  setTimeout( function () {
    //                      el.addClass('fadeInUp animated');
    //                      el.removeClass('item-animate');
    //                  },  k * 200, 'easeInOutExpo' );
    //              });

    //          }, 100);

    //      }

    //  } , { offset: '85%' } );
    // };


    // // Document on load.
    // $(function(){
    //  mainMenu();
    //  parallax();
    //  offcanvas();
    //  mobileMenuOutsideClick();
    //  contentWayPoint();


    // });

}());







// Refactor
$(document).ready(function() {

    (function() {


        $('.play').on('click', function(e) {
            $('.header_content').fadeOut(500, function() {
                $('.bg-wrapper').fadeOut(300);
                $('.bg-video').get(0).play();
            });

        })

        $('.carousel').carousel({
            interval: 20000
        })
        $('.counter').counterUp({
            delay: 30,
            time: 1500
        });


        $('.circle').waypoint(function(direction) {
            if (direction === 'down') {
                $('.circle').fadeIn(100).circleProgress({
                    fill: "#42b8dd",
                    emptyFill: "rgba(0, 0, 0, 0)",
                    startAngle: -Math.PI / 2,
                    size: 170,
                    animationStartValue: 0,
                    thickness: 10
                }).on('circle-animation-progress', function(event, progress) {
                    var value = $(this).data('value');
                    $(this).find('strong').html(parseInt(100 * progress * value));
                });
            } else if (direction === "up") {
                $('.circle').fadeOut(300);
            }
        }, { offset: '80%' })

        var icons = {
            header: "fa fa-plus",
            activeHeader: "fa fa-minus"
        };
        $("#accordion").accordion({
                icons: icons,
                heightStyle: "content"
            })
            .on("accordionactivate", function(event, ui) {
                $(ui.newHeader[0]).find('.accord_icon')[0].innerHTML = "-"
                    // ui.oldHeader
            });

        $(".ui-accordion-header").on('click', function(e) {
            $(".ui-accordion-header").find('.accord_icon').each(function(i, val) {
                val.innerHTML = "+";
            })

        })

        $('.form_group').find('input, textarea').on('focus', function(e) {
                $(this).siblings().fadeOut(300)
                    .end().on('blur', function(e) {
                        var value = $(this)[0].value;
                        if (value === '') {
                            $(this).siblings().fadeIn(300)
                        }
                    })
            }).end()
            .find('label').on('click', function(e) {
                $(this).fadeOut().siblings().trigger('focus');
            })
    })();
})
