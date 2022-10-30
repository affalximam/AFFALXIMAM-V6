/*

  Table Of Contents :
  +-----+-----------------------------------------+
  | NO. | Name                                    |
  +-----+-----------------------------------------+
  |  1. | BASIC                                   |
  |  2. | NAVBAR                                  |
  |  3. | SCROLLIT                                |
  |  4. | BACK TO TOP                             |
  |  5. | AOS                                     |
  |  6. | GSAP                                    |
  |  7. | PARALAX                                 |
  |  8. | CLEAR CONSOLE LOG                       |
  +-----+-----------------------------------------+

*/

/* 
==================================================
  1. BASIC
==================================================
*/

/*
==================================================
  2. NAVBAR
==================================================
*/

$(function() {

	let navMain = $(".navbar-collapse");
	navMain.on("click", ".nav-item:not([data-toggle])", null, function () {
		navMain.collapse('hide');
	});

});

$(document).ready(function () {

  $(".navbar-toggler").on('click', function () {
    $(".navbar-toggler").toggleClass('open');
  });

  $(".nav-item").on('click', function () {
    $(".navbar-toggler").toggleClass('open');
  });

});

(function() {

	$(".navbar-nav li.nav-item").addClass("link")
	$(".navbar-nav li.nav-item .nav-link").addClass("text")

});

$(document).ready(function() {
	$(window).scroll(function() {

		if ($(this).scrollTop() < $(".jumbotron-home").height() / 10) {
			$(".navbar").removeClass("navbar-light");
			$(".navbar-nav").addClass("navbar-nav-color");
			$(".nav-link").addClass("nav-link-color");
			$(".navbar").removeClass("navbar-custom");
		} else {
			$(".navbar").addClass("navbar-light");
			$(".navbar-nav").removeClass("navbar-nav-color");
			$(".nav-link").removeClass("nav-link-color");
			$(".navbar").addClass("navbar-custom");
		}

	});
});

/*
==================================================
  3. SCROLLIT
==================================================
*/

(function($) {
  'use strict';

  var pluginName = 'ScrollIt',
      pluginVersion = '1.0.3';

  /*
   * OPTIONS
   */
  var defaults = {
      upKey: 38,
      downKey: 40,
      easing: 'linear',
      scrollTime: 800,
      activeClass: 'active',
      onPageChange: null,
      topOffset : 0
  };

  $.scrollIt = function(options) {

      /*
       * DECLARATIONS
       */
      var settings = $.extend(defaults, options),
          active = 0,
          lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

      /*
       * METHODS
       */

      /**
       * navigate
       *
       * sets up navigation animation
       */
      var navigate = function(ndx) {
          if(ndx < 0 || ndx > lastIndex) return;

          var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
          $('html,body').animate({
              scrollTop: targetTop,
              easing: settings.easing
          }, settings.scrollTime);
      };

      /**
       * doScroll
       *
       * runs navigation() when criteria are met
       */
      var doScroll = function (e) {
          var target = $(e.target).closest("[data-scroll-nav]").attr('data-scroll-nav') ||
          $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
          navigate(parseInt(target));
      };

      /**
       * keyNavigation
       *
       * sets up keyboard navigation behavior
       */
      var keyNavigation = function (e) {
          var key = e.which;
          if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
              return false;
          }
          if(key == settings.upKey && active > 0) {
              navigate(parseInt(active) - 1);
              return false;
          } else if(key == settings.downKey && active < lastIndex) {
              navigate(parseInt(active) + 1);
              return false;
          }
          return true;
      };

      /**
       * updateActive
       *
       * sets the currently active item
       */
      var updateActive = function(ndx) {
          if(settings.onPageChange && ndx && (active != ndx)) settings.onPageChange(ndx);

          active = ndx;
          $('[data-scroll-nav]').removeClass(settings.activeClass);
          $('[data-scroll-nav=' + ndx + ']').addClass(settings.activeClass);
      };

      /**
       * watchActive
       *
       * watches currently active item and updates accordingly
       */
      var watchActive = function() {
          var winTop = $(window).scrollTop();

          var visible = $('[data-scroll-index]').filter(function(ndx, div) {
              return winTop >= $(div).offset().top + settings.topOffset &&
              winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight()
          });
          var newActive = visible.first().attr('data-scroll-index');
          updateActive(newActive);
      };

      /*
       * runs methods
       */
      $(window).on('scroll',watchActive).scroll();

      $(window).on('keydown', keyNavigation);

      $('body').on('click','[data-scroll-nav], [data-scroll-goto]', function(e){
          e.preventDefault();
          doScroll(e);
      });

  };
}(jQuery));

$(function() {
	$.scrollIt({
		upKey: 38,
		// key code to navigate to the next section
		downKey: 40,
		// key code to navigate to the previous section
		easing: 'easeOutExpo',
		// the easing function for animation
		scrollTime: 1000,
		// how long (in ms) the animation takes
		activeClass: 'active',
		// class given to the active nav element
		onPageChange: null,
		// function(pageIndex) that is called when page is changed
		topOffset: -50
	});
});

(function() {

  window.addEventListener("keydown", function(e) {

    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }

  }, false);

})();

/*
==================================================
  4. BACK TO TOP
==================================================
*/


$(document).ready(function() {
	$(window).scroll(function() {

		if ($(this).scrollTop() < $(".jumbotron-home").height() / 10) {
      $('.backtotop').css({
        'display': 'none'
      });

    } else {
      $('.backtotop').css({
        'display': 'block'
      });
		}

	});
});

/*
==================================================
  5. AOS
==================================================
*/

(function() {

  // ABOUT HOME
  let abouthomeh2 = document.querySelectorAll(".about-home h2");
  abouthomeh2.forEach((h2, i) => {
    h2.dataset.aos = 'fade-in';
    h2.dataset.aosaosAnchorPlacement = "center-bottom";
    h2.dataset.aosDelay = 1;
  });

  let abouthomeimg = document.querySelectorAll(".about-home img");
  abouthomeimg.forEach((img, i) => {
    img.dataset.aos = 'fade-right';
    img.dataset.aosAnchorPlacement = "center-bottom";
    img.dataset.aosDelay = 1;
  });

  let abouthomep = document.querySelectorAll(".about-home p");
  abouthomep.forEach((p, i) => {
    p.dataset.aos = 'fade-left';
    p.dataset.aosAnchorPlacement = "center-bottom";
    p.dataset.aosDelay = 1;
  });

  let abouthomea = document.querySelectorAll(".about-home a");
  abouthomea.forEach((a, i) => {
    a.dataset.aos = 'fade-left';
    a.dataset.aosAnchorPlacement = "center-bottom";
    a.dataset.aosDelay = 1;
  });
  

  // PORTFOLIO HOME
  let portfoliohomeh2 = document.querySelectorAll(".portfolio-home h2");
  portfoliohomeh2.forEach((h2, i) => {
    h2.dataset.aos = 'fade-in';
    h2.dataset.aosAnchorPlacement = "center-bottom";
  });
  
  let portfoliohomecard = document.querySelectorAll(".portfolio-home .card");
  portfoliohomecard.forEach(function (card, i) {
    card.dataset.aos = 'fade-up';
    card.dataset.aosAnchorPlacement = "top-bottom";
  });

  
  // BLOG HOME
  let bloghomeh2 = document.querySelectorAll(".blog-home h2");
  bloghomeh2.forEach((h2, i) => {
    h2.dataset.aos = 'fade-in';
    h2.dataset.aosAnchorPlacement = "center-bottom";
  });
  
  let bloghome = document.querySelectorAll(".blog-home .card");
  bloghome.forEach((div, i) => {
    div.dataset.aos = 'fade-up';
    div.dataset.aosAnchorPlacement = "top-bottom";
  });

  
  // CONTACT
  let contact = document.querySelectorAll(".contact .contain");
  contact.forEach((div, i) => {
    div.dataset.aos = 'fade-in';
    div.dataset.aosAnchorPlacement = 'top-bottom';
  });


  // ABOUT
  let abouth2 = document.querySelectorAll(".about h2");
  abouth2.forEach((h2, i) => {
    h2.dataset.aos = 'fade-in';
    h2.dataset.aos.aosAnchorPlacement = 'center-center';
  });

  let aboutimg = document.querySelectorAll(".about img");
  aboutimg.forEach((img, i) => {
    img.dataset.aos = 'fade-in';
    img.dataset.aosDelay = '50';
    img.dataset.aosAnchorPlacement = 'top-bottom';
  });
  
  let aboutp = document.querySelectorAll(".about p");
  aboutp.forEach((p, i) => {
    p.dataset.aos = 'fade-right';
    p.dataset.aosAnchorPlacement = 'center-bottom';
  });

  // SKILL
  let skillh2 = document.querySelectorAll(".skill h2");
  skillh2.forEach((h2, i) => {
    h2.dataset.aos = 'fade-in';
    h2.dataset.aosAnchorPlacement = 'bottom-bottom';
  });
  
  let skillbars = document.querySelectorAll(".skill .bars");
  skillbars.forEach(function (bars, i) {
    bars.dataset.aos = 'fade-up';
    bars.dataset.aosAnchorPlacement = 'center-bottom';
  });

  // CERTIVICATE
  let certh2 = document.querySelectorAll(".cert h2");
  certh2.forEach((h2, i) => {
    h2.dataset.aos = 'fade-in';
    h2.dataset.aosAnchorPlacement = 'bottom-bottom';
  });

  let certimg = document.querySelectorAll(".cert .col-md-6");
  certimg.forEach((img, i) => {
    img.dataset.aos = 'fade-up';
    img.dataset.aosAnchorPlacement = 'center-bottom';
  });

  // COMMUNITY
  let communityh2 = document.querySelectorAll(".community h2");
  communityh2.forEach((h2, i) => {
    h2.dataset.aos = 'fade-in';
    h2.dataset.aosAnchorPlacement = 'bottom-bottom';
  });

  let communityimg = document.querySelectorAll(".community img");
  communityimg.forEach((img, i) => {
    img.dataset.aos = 'fade-in';
    img.dataset.aosAnchorPlacement = 'center-bottom';
  });


  // PORTFOLIO
  let portfolioh2 = document.querySelectorAll(".portfolio h2");
  portfolioh2.forEach((h2, i) => {
    h2.dataset.aos = 'fade-in';
    h2.dataset.aosAnchorPlacement = 'bottom-bottom';
  });

  let portfoliocard = document.querySelectorAll(".portfolio .card");
  portfoliocard.forEach(function (card, i) {
    card.dataset.aos = 'fade-up';
    card.dataset.aosAnchorPlacement = 'top-bottom';
  });

  // AOS UTAMA
  AOS.init({
    once: 'true',
    duration: 1000,
  });

})();


/*
==================================================
  6. GSAP
==================================================
*/

(function() {
  
  // REGISTER PLUGIN
  gsap.registerPlugin(TextPlugin);
  
  // NAVBAR HOME
  gsap.from('.navbar-home .navbar-brand', {
    duration: 2,
    y: '-100%',
    opacity: 0,
    ease: "bounce.out"
  });

  // JUMBOTRON HOME
  gsap.from('.jumbotron-home img', {
    duration: 1,
    opacity: 0,
    ease: "slow(0.7, 0.7, false)",
  });

  gsap.from('.jumbotron-home h1', {
    duration: 1.5,
    text: '',
    delay: 1,
  });

  gsap.from('.jumbotron-home h2', {
    duration: 2,
    text: '',
    delay: 2
  });

  gsap.from('.jumbotron-home .left', {
    duration: 1,
    x: -100,
    opacity: 0,
    delay: 3
  });

  gsap.from('.jumbotron-home .right', {
    duration: 1,
    x: 100,
    opacity: 0,
    delay: 3
  });

  // BACK TO TOP 2
  gsap.to('.backtotop-two', {
    duration: 1,
    opacity: 1,
    x: 0
  });


  // NAVBAR ABOUT
  gsap.from('.navbar-about', {
    duration: 2,
    y: '-100%',
    opacity: 0,
    ease: "bounce.out"
  });


  // JUMBOTRON ABOUT
  gsap.from('.jumbotron-about h1', {
    duration: 1,
    text: '',
    delay: .75
  });


    // NAVBAR PORTFOLIO
    gsap.from('.navbar-portfolio', {
      duration: 2,
      y: '-100%',
      opacity: 0,
      ease: "bounce.out"
    });


  // JUMBOTRON PORTFOLIO
  gsap.from('.jumbotron-portfolio h1', {
    duration: 1,
    text: '',
    delay: .75
  });

})();


/*
==================================================
  7. PARALAX
==================================================
*/

// JUMBOTRON HOME

(function() {

  $(document).ready(function() {
    $(window).scroll(function() {

      if ($(this).scrollTop() < $('.jumbotron-home').height()/3 ) {
        $('.jumbotron-home img').css({
          'opacity': '1',
          'transform': "translateY(0px)"
        });
        $('.jumbotron-home h1, .jumbotron-home h2').css({
          'opacity': '1',
          'transform': "translateY(0px)"
        });
        
      } else {
        $('.jumbotron-home img').css({
          'opacity': '0',
          'transform': "translateY(-100px)"
        });
        $('.jumbotron-home h1, .jumbotron-home h2').css({
          'opacity': '0',
          'transform': "translateY(-100px)"
        });
      }

    });

    $(window).scroll(function() {

      if ($(this).scrollTop() < $('.jumbotron-home').height()/ 1.6 ) {

        $('.jumbotron-home .left a').css({
          'opacity': '1',
          'transform': "translateY(0px)"
        });

        $('.jumbotron-home .right a').css({
          'opacity': '1',
          'transform': "translateY(0px)"
        });
        
      } else {

        $('.jumbotron-home .left a').css({
          'opacity': '0',
          'transform': "translateX(-100px)"
        });

        $('.jumbotron-home .right a').css({
          'opacity': '0',
          'transform': "translateX(100px)"
        });

      }

    });

  });

})();

// ABOUT HOME

$(document).ready(function() {
	$(window).scroll(function() {

		if ($(this).scrollTop() > $('.jumbotron-home').height() + $('.about-home').height() / 1.1 ) {

			$('.about-home img').css({
				'opacity': '0',
        'transform': "translateX(-100%)"
			});
			
		} else {
			$('.about-home img').css({
				'opacity': '1',
        'transform': "translateX(0px)"
			});
		}

	});

	$(window).scroll(function() {

		if ($(this).scrollTop() > $('.jumbotron-home').height() + $('.about-home').height() / 1.2 ) {

			$('.about-home p').css({
				'opacity': '0',
        'transform': "translateX(100%)"
			});
			
		} else {
			$('.about-home p').css({
				'opacity': '1',
        'transform': "translateX(0px)"
			});
		}

	});

	$(window).scroll(function() {

		if ($(this).scrollTop() > $('.jumbotron-home').height() + $('.about-home').height() / 1.2 ) {

			$('.about-home a').css({
				'opacity': '0',
        'transform': "translateX(100%)"
			});
			
		} else {

			$('.about-home a').css({
				'opacity': '1',
        'transform': "translateX(0px)"
			});
		}

	});
  
});

// ABOUT

(function() {

  // SKILL

  $(document).ready(function() {
    $(window).scroll(function() {

      if ($(this).scrollTop() > $('.jumbotron-about').height() + $('.about').height()  ) {

        $('.about .group-2 img').css({
          'opacity' : '0',
          'transform': "translateY(-100px)"
        });

        $('.about .group-3 p').css({
          'opacity': '0',
          'transform': "translateY(-100%)"
        });

      } else {

        $('.about .group-2 img').css({
          'opacity' : '1',
          'transform': "translateY(0)"
        });

        $('.about .group-3 p').css({
          'opacity': '1',
          'transform': "translateX(0)"
        });

      }

    });     
  });

  $(document).ready(function() {
    $(window).scroll(function() {

      if ($(this).scrollTop() > $('.jumbotron-about').height() + $('.about').height() / 8 ) {
        
        $(".skill .bars .html").css({
          'width' : '95%'
        });

        $(".skill .bars .css").css({
          'width' : '90%'
        });

        $(".skill .bars .javascript").css({
          'width' : '80%'
        });

        $(".skill .bars .hacking").css({
          'width' : '83%'
        });

        $(".skill .bars .networking").css({
          'width' : '75%'
        });

        $(".skill .bars .editing").css({
          'width' : '85%'
        });

      } else {

        $(".skill .bars .html").css({
          'width' : '0'
        });

        $(".skill .bars .css").css({
          'width' : '0'
        });

        $(".skill .bars .javascript").css({
          'width' : '0'
        });

        $(".skill .bars .hacking").css({
          'width' : '0'
        });

        $(".skill .bars .networking").css({
          'width' : '0'
        });

        $(".skill .bars .editing").css({
          'width' : '0'
        });
        
      }

    });
  });

})();

/*
==================================================
  8. CLEAR CONSOLE LOG
==================================================
*/


(function() {
  
  let name, author;
  name = "AFFALXIMAM V6";
  author = "AFFAL";
  console.clear();
  console.log("Name = " + name);
  console.log("Author = " + author);
  
})();