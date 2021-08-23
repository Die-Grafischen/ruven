<?php
/**
 * Header file for the WP Blank theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage WPBlank
 * @since WPBlank 1.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<!DOCTYPE html>

<html <?php language_attributes(); ?>>

<head>

    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/assets/images/favicon.ico" />
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

    <?php   
        $site_intro = false;
        $video = false; 
    ?>

    <?php if($site_intro) { ?>
    <div id="site-intro">
        <h1><?php echo bloginfo('name'); ?></h1>
    </div>
    <?php } ?>

    <?php if($video) { ?>
    <div id="video-intro">
        <video width="100%" height="100%" id="ruven-video" muted>
            <source src="<?php echo get_template_directory_uri(); ?>/assets/img/video.mp4" type="video/mp4">
            <!-- <source src="video.ogg" type="video/ogg"> -->
            Your browser does not support the video tag.
        </video>
    </div>
    <?php } ?>
    <main id="ruven-app">
        <header id="site-header" role="banner">

            <div class="header-inner section-inner">

                <?php wpblank_site_logo(); ?>

                <?php if ( has_nav_menu( 'primary' ) ) { ?>
                <div id="nav-toggle" class="" aria-expanded="false">
                    <span></span>
                </div>

                <nav class="primary-menu-wrapper" aria-label="<?php esc_attr_e( 'Horizontal', 'wpblank' ); ?>"
                    role="navigation">
                    <?php wp_nav_menu( array( 'container' => false, 'theme_location' => 'primary',  ) ); ?>
                </nav>
                <?php } ?>

            </div><!-- .header-inner -->

        </header><!-- #site-header -->

        <div class="wrapper">