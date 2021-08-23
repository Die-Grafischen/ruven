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
		introText = true;
		introVideo = true;
		initialized = false;

		introTextDuration = 3000;

		constructor() {
			this.init();
		}

		init() {
			this.checkElements();
			this.intro();
			this.video();
			//this.main();
		}

		// Check if elements exists
		checkElements() {
			this.introText = $("#site-intro").length ? true : false;
			this.introVideo = $("#video-intro").length ? true : false;
			if (!this.introText && !this.introVideo) this.main();
		}

		// Loads intro text/logo
		intro() {
			if (this.introText) {
				console.log("START: intro");
				const self = this;

				RuvenCore.body.addClass("active-intro");

				const introTimer = setTimeout(function () {
					console.log("ENDED: intro");
					$("#site-intro").fadeOut(function () {
						$("body").removeClass("active-intro");
						self.introText = false;
						self.video();
						self.main();
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
						self.introText = false;
						self.video();
						self.main();
					});
				});
			}
		}

		// Loads video intro
		video() {
			if (this.introVideo && !this.introText) {
				this.introVideo = false;
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
			console.log(this.introText, this.introVideo);
			const self = this;
			if (!this.introText && !this.introVideo) {
				console.log("MAIN: initialized");
				RuvenCore.body.addClass("app-loaded");
				this.initialized = true;
				this.projects();
			}
		}

		tester() {}

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
				console.log("project opened!");
				RuvenCore.body.toggleClass("active-project");
				const sliderContent = $(this).find(".single-project");
				const slider = new RuvenSlider(sliderContent);
			});
		}
	}

	class RuvenSlider {
		constructor(slider) {
			this.init(slider);
			this.moveProject(slider);
			this.initSlider();
		}

		init(slider) {
			console.log(slider);
		}

		moveProject(slider) {
			$("#project-detail .swiper-container").prepend(slider);
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
