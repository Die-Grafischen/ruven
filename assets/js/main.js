"use strict";
/**
 * Custom JavaScript
 * main.js
 *
 * @since 1.0.0
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jQuery(document).ready(function ($) {// $(".projects").on("click", ".project", function () {
  // 	$("body").toggleClass("active-project");
  // });
  // const swiper = new Swiper(".swiper-container", {
  // 	// Optional parameters
  // 	// If we need pagination
  // 	pagination: {
  // 		el: ".swiper-pagination",
  // 	},
  // 	// Navigation arrows
  // 	navigation: {
  // 		nextEl: ".swiper-button-next",
  // 		prevEl: ".swiper-button-prev",
  // 	},
  // });
});

(function ($) {
  var RuvenCore = /*#__PURE__*/function () {
    // Default Settings
    function RuvenCore() {
      _classCallCheck(this, RuvenCore);

      _defineProperty(this, "introText", true);

      _defineProperty(this, "introVideo", true);

      _defineProperty(this, "initialized", false);

      _defineProperty(this, "introTextDuration", this.introText ? 3000 : 0);

      this.intro();
      this.video();
      this.init();
    } // Loads intro text


    _createClass(RuvenCore, [{
      key: "intro",
      value: function intro() {
        if ($("#site-intro").length && this.introText && !this.initialized) {
          console.log("intro");
          var self = this;
          RuvenCore.body.addClass("active-intro");
          setTimeout(function () {
            console.log("intro ended");
            $("#site-intro").fadeOut(function () {
              $("body").removeClass("active-intro");
              self.introText = false;
              self.video();
            });
          }, this.introTextDuration);
          $("#site-intro").on("click", function () {
            console.log("intro ended on click");
            $("#site-intro").fadeOut(function () {
              $("body").removeClass("active-intro");
              self.introText = false;
              self.video();
            });
          });
        }
      } // Loads video

    }, {
      key: "video",
      value: function video() {
        console.log(this.introVideo);
        console.log(this.introText);

        if ($("#video-intro").length && !this.introText && !this.initialized) {
          this.introVideo = false;
          var self = this;
          var video = $("#ruven-video");
          RuvenCore.body.addClass("active-video");

          if (!$("#site-intro").length) {
            this.introTextDuration = 0;
          }

          setTimeout(function () {
            console.log("video");
            video.get(0).play();
          }, this.introTextDuration);
          video.parent().on("click", function () {
            console.log("video ended on click");
            RuvenCore.body.removeClass("active-video");
            self.init();
            return;
          });
          video.on("ended", function () {
            console.log("video ended");
            RuvenCore.body.removeClass("active-video");
            self.init();
          });
        }
      } // Loads the app conainer

    }, {
      key: "init",
      value: function init() {
        console.log("init?");
        console.log(this.introVideo);
        console.log(this.introText);
        var self = this;

        if (!this.introVideo && !this.introText) {
          console.log("init");
          RuvenCore.body.addClass("app-loaded");
          this.initialized = true;
          this.projects();
        }
      }
    }, {
      key: "projects",
      value: function projects() {
        console.log("projects");

        if ($(".projects").length) {
          console.log("projects");
          var projects = new RuvenIsotope();
        }
      }
    }]);

    return RuvenCore;
  }();

  _defineProperty(RuvenCore, "body", $("body"));

  var RuvenIsotope = /*#__PURE__*/function () {
    function RuvenIsotope() {
      _classCallCheck(this, RuvenIsotope);

      this.isotope();
      this.sort();
      this.openProject();
    }

    _createClass(RuvenIsotope, [{
      key: "isotope",
      value: function isotope() {
        if ($(".projects").length) {
          console.log("projects");
          RuvenIsotope.projects = $(".projects").isotope({
            itemSelector: ".project",
            layoutMode: "fitRows",
            getSortData: {
              custom: "[data-custom]",
              default: "[data-default]"
            }
          });
        }
      }
    }, {
      key: "sort",
      value: function sort() {
        $("#sort-button").on("click", function () {
          RuvenIsotope.container.toggleClass("custom-sort");

          if (RuvenIsotope.container.hasClass("custom-sort")) {
            RuvenIsotope.projects.isotope({
              sortBy: "custom"
            });
          } else {
            RuvenIsotope.projects.isotope({
              sortBy: "default"
            });
          }
        });
      }
    }, {
      key: "openProject",
      value: function openProject() {
        RuvenIsotope.container.on("click", ".project", function () {
          RuvenCore.body.toggleClass("active-project");
          var slider = new RuvenSlider(this);
        });
      }
    }]);

    return RuvenIsotope;
  }();

  _defineProperty(RuvenIsotope, "projects", void 0);

  _defineProperty(RuvenIsotope, "container", $(".projects"));

  var RuvenSlider = function RuvenSlider(slider) {
    _classCallCheck(this, RuvenSlider);

    _defineProperty(this, "swiper", new Swiper(".swiper-container", {
      // Optional parameters
      // If we need pagination
      pagination: {
        el: ".swiper-pagination"
      },
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    }));

    console.log(slider);
  }; // Document Ready


  $(document).ready(function () {
    var ruven = new RuvenCore(); //const ruvenSlider = new RuvenSlider();
  }); // Window Load

  $(window).on("load", function () {
    //===== 17. Preloader
    $(".preloader").fadeOut("slow", function () {
      $(this).remove();
    }); //===== 18. Back to top

    $("#backToTop").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop: "0"
      }, 1200);
    });
  }); // Window Scroll

  $(window).on("scroll", function () {
    //===== 19. Sticky header
    var scroll = $(window).scrollTop();

    if (scroll < 150) {
      $(".sticky-header").removeClass("sticky-active");
    } else {
      $(".sticky-header").addClass("sticky-active");
    } //===== 20. Scroll Event on back to top


    if (scroll > 300) $("#backToTop").addClass("active");
    if (scroll < 300) $("#backToTop").removeClass("active");
  });
})(jQuery);
"use strict";
/**
 * Custom JavaScript
 * main.js
 *
 * @since 1.0.0
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jQuery(document).ready(function ($) {// $(".projects").on("click", ".project", function () {
  // 	$("body").toggleClass("active-project");
  // });
  // const swiper = new Swiper(".swiper-container", {
  // 	// Optional parameters
  // 	// If we need pagination
  // 	pagination: {
  // 		el: ".swiper-pagination",
  // 	},
  // 	// Navigation arrows
  // 	navigation: {
  // 		nextEl: ".swiper-button-next",
  // 		prevEl: ".swiper-button-prev",
  // 	},
  // });
});

(function ($) {
  var RuvenCore = /*#__PURE__*/function () {
    // Default Settings
    function RuvenCore() {
      _classCallCheck(this, RuvenCore);

      _defineProperty(this, "introText", false);

      _defineProperty(this, "introVideo", false);

      _defineProperty(this, "initialized", false);

      _defineProperty(this, "introTextDuration", 6000);

      this.init();
    }

    _createClass(RuvenCore, [{
      key: "init",
      value: function init() {
        this.intro();
        this.video();
        this.main();
      } // Loads intro text/logo

    }, {
      key: "intro",
      value: function intro() {
        if ($("#site-intro").length) {
          console.log("START: intro");
          var self = this;
          RuvenCore.body.addClass("active-intro");
          var introTimer = setTimeout(function () {
            console.log("ENDED: intro");
            $("#site-intro").fadeOut(function () {
              $("body").removeClass("active-intro");
              self.introText = true;
              self.video();
            });
          }, this.introTextDuration);
          $("#site-intro").data("introtimer", introTimer);
          $("#site-intro").on("click", function () {
            console.log("ENDED: intro on click"); //remove the settimeout function

            var introTimer = $("#site-intro").data("introtimer");

            if (introTimer) {
              clearTimeout(introTimer);
              $("#site-intro").removeData("introtimer");
            }

            $("#site-intro").fadeOut(function () {
              $("body").removeClass("active-intro");
              self.introText = true;
              self.video();
            });
          });
        }
      } // Loads video intro

    }, {
      key: "video",
      value: function video() {
        if ($("#video-intro").length && this.introText) {
          this.introVideo = true;
          console.log("STARTED: video");
          var self = this;
          var video = $("#ruven-video");
          RuvenCore.body.addClass("active-video");
          console.log("video is playing");
          video.get(0).play();
          video.parent().on("click", function () {
            console.log("ENDED: video on click");
            video.get(0).pause();
            RuvenCore.body.removeClass("active-video");
            self.main();
          });
          video.on("ended", function () {
            console.log("video ended");
            RuvenCore.body.removeClass("active-video");
            self.main();
          });
        }
      } // Loads the app conainer

    }, {
      key: "main",
      value: function main() {
        var self = this;

        if (this.introVideo && this.introText) {
          console.log("MAIN: initialized");
          RuvenCore.body.addClass("app-loaded");
          this.initialized = true;
          this.projects();
        }
      }
    }, {
      key: "projects",
      value: function projects() {
        if ($(".projects").length) {
          console.log("PROJECTS:");
          var projects = new RuvenIsotope();
        }
      }
    }]);

    return RuvenCore;
  }();

  _defineProperty(RuvenCore, "body", $("body"));

  var RuvenIsotope = /*#__PURE__*/function () {
    function RuvenIsotope() {
      _classCallCheck(this, RuvenIsotope);

      this.isotope();
      this.sort();
      this.openProject();
    }

    _createClass(RuvenIsotope, [{
      key: "isotope",
      value: function isotope() {
        if ($(".projects").length) {
          console.log("ISOTOPE: loaded");
          RuvenIsotope.projects = $(".projects").isotope({
            itemSelector: ".project",
            layoutMode: "fitRows",
            getSortData: {
              custom: "[data-custom]",
              default: "[data-default]"
            }
          });
        }
      }
    }, {
      key: "sort",
      value: function sort() {
        $("#sort-button").on("click", function () {
          RuvenIsotope.container.toggleClass("custom-sort");

          if (RuvenIsotope.container.hasClass("custom-sort")) {
            RuvenIsotope.projects.isotope({
              sortBy: "custom"
            });
          } else {
            RuvenIsotope.projects.isotope({
              sortBy: "default"
            });
          }
        });
      }
    }, {
      key: "openProject",
      value: function openProject() {
        RuvenIsotope.container.on("click", ".project", function () {
          RuvenCore.body.toggleClass("active-project");
          var slider = new RuvenSlider(this);
        });
      }
    }]);

    return RuvenIsotope;
  }();

  _defineProperty(RuvenIsotope, "projects", void 0);

  _defineProperty(RuvenIsotope, "container", $(".projects"));

  var RuvenSlider = /*#__PURE__*/function () {
    function RuvenSlider(slider) {
      _classCallCheck(this, RuvenSlider);

      this.init(slider);
    }

    _createClass(RuvenSlider, [{
      key: "init",
      value: function init(slider) {
        console.log(slider);
      }
    }, {
      key: "initSlider",
      value: function initSlider() {
        var swiper = new Swiper(".swiper-container", {
          // Optional parameters
          // If we need pagination
          pagination: {
            el: ".swiper-pagination"
          },
          // Navigation arrows
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      }
    }]);

    return RuvenSlider;
  }(); // Document Ready


  $(document).ready(function () {
    var ruven = new RuvenCore();
  }); // Window Load

  $(window).on("load", function () {
    //===== 17. Preloader
    $(".preloader").fadeOut("slow", function () {
      $(this).remove();
    }); //===== 18. Back to top

    $("#backToTop").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop: "0"
      }, 1200);
    });
  }); // Window Scroll

  $(window).on("scroll", function () {
    //===== 19. Sticky header
    var scroll = $(window).scrollTop();

    if (scroll < 150) {
      $(".sticky-header").removeClass("sticky-active");
    } else {
      $(".sticky-header").addClass("sticky-active");
    } //===== 20. Scroll Event on back to top


    if (scroll > 300) $("#backToTop").addClass("active");
    if (scroll < 300) $("#backToTop").removeClass("active");
  });
})(jQuery);