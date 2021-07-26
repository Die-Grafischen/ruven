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
		static body = $("body");

		// Default Settings
		introText = false;
		introVideo = false;
		initialized = false;

		introTextDuration = 3000;

		constructor() {
			this.init();
		}

		init() {
			this.intro();
			this.video();
			this.main();
		}

		// Loads intro text/logo
		intro() {
			if ($("#site-intro").length) {
				console.log("START: intro");
				const self = this;

				RuvenCore.body.addClass("active-intro");

				const introTimer = setTimeout(function () {
					console.log("ENDED: intro");
					$("#site-intro").fadeOut(function () {
						$("body").removeClass("active-intro");
						self.introText = true;
						self.video();
					});
				}, this.introTextDuration);
				$("#site-intro").data("introtimer", introTimer);

				$("#site-intro").on("click", function () {
					console.log("ENDED: intro on click");

					//remove the settimeout function
					const introTimer = $("#site-intro").data("introtimer");
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
		}

		// Loads video intro
		video() {
			if ($("#video-intro").length && this.introText) {
				this.introVideo = true;
				console.log("STARTED: video");
				const self = this;
				const video = $("#ruven-video");
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
		}

		// Loads the app conainer
		main() {
			const self = this;
			if (this.introVideo && this.introText) {
				console.log("MAIN: initialized");
				RuvenCore.body.addClass("app-loaded");
				this.initialized = true;
				this.projects();
			}
		}

		projects() {
			if ($(".projects").length) {
				console.log("PROJECTS:");
				const projects = new RuvenIsotope();
			}
		}
	}

	class RuvenIsotope {
		static projects;
		static container = $(".projects");
		constructor() {
			this.isotope();
			this.sort();
			this.openProject();
		}

		isotope() {
			if ($(".projects").length) {
				console.log("ISOTOPE: loaded");
				RuvenIsotope.projects = $(".projects").isotope({
					itemSelector: ".project",
					layoutMode: "fitRows",
					getSortData: {
						custom: "[data-custom]",
						default: "[data-default]",
					},
				});
			}
		}

		sort() {
			$("#sort-button").on("click", function () {
				RuvenIsotope.container.toggleClass("custom-sort");

				if (RuvenIsotope.container.hasClass("custom-sort")) {
					RuvenIsotope.projects.isotope({
						sortBy: "custom",
					});
				} else {
					RuvenIsotope.projects.isotope({
						sortBy: "default",
					});
				}
			});
		}

		openProject() {
			RuvenIsotope.container.on("click", ".project", function () {
				RuvenCore.body.toggleClass("active-project");
				const slider = new RuvenSlider(this);
			});
		}
	}

	class RuvenSlider {
		constructor(slider) {
			this.init(slider);
		}

		init(slider) {
			console.log(slider);
		}

		moveProject(slider) {
			slider.prepend("#project-detail .swiper-container");
		}
		initSlider() {
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

	// Document Ready
	$(document).ready(function () {
		const ruven = new RuvenCore();
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
