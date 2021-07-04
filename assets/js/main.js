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

      _defineProperty(this, "body", $("body"));

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
          this.body.addClass("active-intro");
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
          this.body.addClass("active-video");

          if (!$("#site-intro").length) {
            this.introTextDuration = 0;
          }

          setTimeout(function () {
            console.log("video");
            video.get(0).play();
          }, this.introTextDuration);
          video.parent().on("click", function () {
            console.log("video ended on click");
            self.body.removeClass("active-video");
            self.init();
          });
          video.on("ended", function () {
            console.log("video ended");
            self.body.removeClass("active-video");
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

        if (!this.introVideo && !this.introText) {
          console.log("init");
          this.body.addClass("app-loaded");
          this.initialized = true;
          this.projects();
        }
      }
    }, {
      key: "projects",
      value: function projects() {
        console.log("projects");
        var self = this;
        var projects;
        $(".projects").on("click", ".project", function () {
          self.body.toggleClass("active-project");
        });

        if ($(".projects").length) {
          console.log("poroooo");
          this.projects = $(".projects").isotope({
            itemSelector: ".project",
            layoutMode: "fitRows",
            getSortData: {
              custom: "[data-custom]",
              default: "[data-default]"
            }
          });
        }

        $("#sort-button").on("click", function () {
          $(".projects").toggleClass("custom-sort");

          if ($(".projects").hasClass("custom-sort")) {
            self.projects.isotope({
              sortBy: "custom"
            });
          } else {
            self.projects.isotope({
              sortBy: "default"
            });
          }
        });
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

    return RuvenCore;
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