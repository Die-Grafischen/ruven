<?php
/**
 * ruven Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage ruven
 * @since ruven Theme 1.0
 */

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function ruven_theme_support() {


	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// Set post thumbnail size.
	set_post_thumbnail_size( 1200, 9999 );

	// Custom logo.
	$logo_width  = 120;
	$logo_height = 90;

	// If the retina setting is active, double the recommended width and height.
	if ( get_theme_mod( 'retina_logo', false ) ) {
		$logo_width  = floor( $logo_width * 2 );
		$logo_height = floor( $logo_height * 2 );
	}

	add_theme_support(
		'custom-logo',
		array(
			'height'      => $logo_height,
			'width'       => $logo_width,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
			'style',
		)
	);

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on ruven Theme, use a find and replace
	 * to change 'ruven' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'ruven' );

	// Add support for full and wide align images.
	add_theme_support( 'align-wide' );

	// Add support for responsive embeds.
	add_theme_support( 'responsive-embeds' );


	/*
	 * Adds `async` and `defer` support for scripts registered or enqueued
	 * by the theme.
	 */
	$loader = new ruven_Script_Loader();
	add_filter( 'script_loader_tag', array( $loader, 'filter_script_loader_tag' ), 10, 2 );

}

add_action( 'after_setup_theme', 'ruven_theme_support' );

/**
 * REQUIRED FILES
 * Include required files.
 */

require get_template_directory() . '/inc/template-tags.php';

// Custom script loader class.
require get_template_directory() . '/classes/class-ruven-script-loader.php';


/**
 * Register and Enqueue Styles.
 */
function ruven_register_styles() {

	$theme_version = wp_get_theme()->get( 'Version' );
	$env = ( wp_get_environment_type() === 'local') ? 'min.' : '';

	wp_enqueue_style( 'ruven-style', get_template_directory_uri() . '/assets/css/style.'. $env .'css', array(),
	$theme_version );
	wp_style_add_data( 'ruven-style', 'rtl', 'replace' );


}

add_action( 'wp_enqueue_scripts', 'ruven_register_styles' );

/**
 * Register and Enqueue Scripts.
 */
function ruven_register_scripts() {

	$theme_version = wp_get_theme()->get( 'Version' );
	$env = ( wp_get_environment_type() === 'local') ? array('src','/custom', '') : array('assets','','min.');

	//Include WP jQuery
    wp_enqueue_script('jquery');

	wp_enqueue_script( 'ruven-isotope', get_template_directory_uri() . '/assets/js/vendor/isotope.min.js', array('jquery'), $theme_version,
	false );
	wp_script_add_data( 'ruven-isotope', 'async', true );

	wp_enqueue_script( 'ruven-swiper', get_template_directory_uri() . '/assets/js/vendor/swiper.min.js',
	array('jquery'), $theme_version,
	false );
	wp_script_add_data( 'ruven-swiper', 'async', true );

	wp_enqueue_script( 'ruven', get_template_directory_uri() . '/'. $env[0] .'/js'. $env[1] .'/main.'. $env[2] .'js', array('jquery',
	'ruven-isotope', 'ruven-swiper'), $theme_version, false );
	wp_script_add_data( 'ruven', 'async', true );



}

add_action( 'wp_enqueue_scripts', 'ruven_register_scripts' );


/**
 * Register navigation menus uses wp_nav_menu in five places.
 */
function ruven_menus() {

	$locations = array(
		'primary'  => __( 'Primary Menu', 'ruven' ),
		'secondary'   => __( 'Secondary Menu', 'ruven' ),
	);

	register_nav_menus( $locations );
}

add_action( 'init', 'ruven_menus' );

/**
 * Get the information about the logo.
 *
 * @param string $html The HTML output from get_custom_logo (core function).
 *
 * @return string $html
 */
function ruven_get_custom_logo( $html ) {

	$logo_id = get_theme_mod( 'custom_logo' );

	if ( ! $logo_id ) {
		return $html;
	}

	$logo = wp_get_attachment_image_src( $logo_id, 'full' );

	if ( $logo ) {
		// For clarity.
		$logo_width  = esc_attr( $logo[1] );
		$logo_height = esc_attr( $logo[2] );

		// If the retina logo setting is active, reduce the width/height by half.
		if ( get_theme_mod( 'retina_logo', false ) ) {
			$logo_width  = floor( $logo_width / 2 );
			$logo_height = floor( $logo_height / 2 );

			$search = array(
				'/width=\"\d+\"/iU',
				'/height=\"\d+\"/iU',
			);

			$replace = array(
				"width=\"{$logo_width}\"",
				"height=\"{$logo_height}\"",
			);

			// Add a style attribute with the height, or append the height to the style attribute if the style attribute already exists.
			if ( strpos( $html, ' style=' ) === false ) {
				$search[]  = '/(src=)/';
				$replace[] = "style=\"height: {$logo_height}px;\" src=";
			} else {
				$search[]  = '/(style="[^"]*)/';
				$replace[] = "$1 height: {$logo_height}px;";
			}

			$html = preg_replace( $search, $replace, $html );

		}
	}

	return $html;

}

add_filter( 'get_custom_logo', 'ruven_get_custom_logo' );

/**
 * Enqueue supplemental block editor styles.
 */
function ruven_block_editor_styles() {

	// Enqueue the editor styles.
	wp_enqueue_style( 'ruven-block-editor-styles', get_theme_file_uri( '/assets/css/editor-style-block.css' ), array(), wp_get_theme()->get( 'Version' ), 'all' );
	wp_style_add_data( 'ruven-block-editor-styles', 'rtl', 'replace' );

	// Enqueue the editor script.
	wp_enqueue_script( 'ruven-block-editor-script', get_theme_file_uri( '/assets/js/editor-script-block.js' ), array( 'wp-blocks', 'wp-dom' ), wp_get_theme()->get( 'Version' ), true );
}

add_action( 'enqueue_block_editor_assets', 'ruven_block_editor_styles', 1, 1 );


// Allow the Editor Role to change Theme Settings and use Customizer
$role_object = get_role( 'editor' );
$role_object->add_cap( 'edit_theme_options' );


// Advanced Custom Fields
if (class_exists('ACF')) {
	require get_template_directory() . '/inc/acf.php';
}

function revcon_change_post_label() {
	global $menu;
	global $submenu;
	$menu[5][0] = 'Portfolio';
	$submenu['edit.php'][5][0] = 'Portfolio';
	$submenu['edit.php'][10][0] = 'Add Portfolio Item';
	$submenu['edit.php'][16][0] = 'Portfolio Tags';
}
function revcon_change_post_object() {
	global $wp_post_types;
	$labels = &$wp_post_types['post']->labels;
	$labels->name = 'Portfolio';
	$labels->singular_name = 'Portfolio';
	$labels->add_new = 'Add Portfolio';
	$labels->add_new_item = 'Add Portfolio';
	$labels->edit_item = 'Edit Portfolio';
	$labels->new_item = 'Portfolio';
	$labels->view_item = 'View Portfolio';
	$labels->search_items = 'Search Portfolio';
	$labels->not_found = 'No Portfolio found';
	$labels->not_found_in_trash = 'No Portfolio found in Trash';
	$labels->all_items = 'All Portfolio';
	$labels->menu_name = 'Portfolio';
	$labels->name_admin_bar = 'Portfolio';
}

add_action( 'admin_menu', 'revcon_change_post_label' );
add_action( 'init', 'revcon_change_post_object' );


//Add Thumbnail to post list in admin colums
add_filter('manage_posts_columns', 'add_img_column');
add_filter('manage_posts_custom_column', 'manage_img_column', 10, 2);

function add_img_column($columns) {
	$columns['img'] = 'Featured Image';
	return $columns;
}

function manage_img_column($column_name, $post_id) {
	if( $column_name == 'img' ) {
		echo get_the_post_thumbnail($post_id, 'thumbnail');
	}
	return $column_name;
}