"use strict";

/**
 * Custom JavaScript
 * main.js
 *
 * @since 1.0.0
 */

jQuery(document).ready(function ($) {
	// $(".projects").on("click", ".project", function () {
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
	class RuvenCore {
		body = $("body");

		// Default Settings
		introText = true;
		introVideo = true;
		initialized = false;
		introTextDuration = this.introText ? 3000 : 0;

		constructor() {
			this.intro();
			this.video();
			this.init();
		}

		// Loads intro text
		intro() {
			if ($("#site-intro").length && this.introText && !this.initialized) {
				console.log("intro");
				const self = this;

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
		}

		// Loads video
		video() {
			console.log(this.introVideo);
			console.log(this.introText);
			if ($("#video-intro").length && !this.introText && !this.initialized) {
				this.introVideo = false;
				const self = this;
				const video = $("#ruven-video");
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
		}

		// Loads the app conainer
		init() {
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

		projects() {
			console.log("projects");
			const self = this;
			let projects;
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
						default: "[data-default]",
					},
				});
			}
			$("#sort-button").on("click", function () {
				$(".projects").toggleClass("custom-sort");

				if ($(".projects").hasClass("custom-sort")) {
					self.projects.isotope({
						sortBy: "custom",
					});
				} else {
					self.projects.isotope({
						sortBy: "default",
					});
				}
			});
			const swiper = new Swiper(".swiper-container", {
				// Optional parameters
				// If we need pagination
				pagination: {
					el: ".swiper-pagination",
				},
				// Navigation arrows
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
		}
	}

	class RuvenSlider {
		constructor() {
			console.log("RuvenSlider init");
		}
	}

	// Document Ready
	$(document).ready(function () {
		const ruven = new RuvenCore();
		const ruvenSlider = new RuvenSlider();
	});

	// Window Load
	$(window).on("load", function () {
		//===== 17. Preloader
		$(".preloader").fadeOut("slow", function () {
			$(this).remove();
		});

		//===== 18. Back to top
		$("#backToTop").on("click", function (e) {
			e.preventDefault();
			$("html, body").animate(
				{
					scrollTop: "0",
				},
				1200
			);
		});
	});

	// Window Scroll
	$(window).on("scroll", function () {
		//===== 19. Sticky header
		var scroll = $(window).scrollTop();
		if (scroll < 150) {
			$(".sticky-header").removeClass("sticky-active");
		} else {
			$(".sticky-header").addClass("sticky-active");
		}

		//===== 20. Scroll Event on back to top
		if (scroll > 300) $("#backToTop").addClass("active");
		if (scroll < 300) $("#backToTop").removeClass("active");
	});
})(jQuery);
