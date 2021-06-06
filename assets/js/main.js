"use strict";
/**
 * Custom JavaScript
 * main.js
 *
 * @since 1.0.0
 */

jQuery(document).ready(function ($) {
  if ($(".projects").length) {
    var $projects = $(".projects").isotope({
      itemSelector: ".project",
      layoutMode: "fitRows",
      getSortData: {
        custom: "[data-custom]",
        default: "[data-default]"
      }
    });
    $("#sort-button").on("click", function () {
      $(".projects").toggleClass("custom-sort");

      if ($(".projects").hasClass("custom-sort")) {
        $projects.isotope({
          sortBy: "custom"
        });
      } else {
        $projects.isotope({
          sortBy: "default"
        });
      }
    });
  }
});