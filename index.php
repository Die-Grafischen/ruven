<?php get_header(); ?>
<div class="projects">
    <?php
    $args = array(
         'numberposts' => -1,
        // 'orderby' => 'menu_order',
         'post_type' =>  'post'
    );
    $query = new WP_Query($args);
    $count = 0;
    
    if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
        
        if(has_post_thumbnail()){
            $fields = get_fields();
            $content = $fields['content'];
            $bild = isset($content['bild']) ? $content['bild'] : false;
            $text = isset($content['text']) ? $content['text']: false;
            $gallery_post = isset($content[1]) ? true : false;

            $thispost = get_post($id);
            $menu_order = $thispost->menu_order;
            
            echo '<div class="project" data-custom="'. esc_attr($menu_order) .'" data-default="'. esc_attr($count) .'">';
                the_post_thumbnail();
               
            echo '</div>';
            $count++;
        }
        
    endwhile; endif;
    ?>

</div>
<div id="sort-button" data-sort-value="sort"></div>
<div id="project-detail">
    <!-- Slider main container -->
    <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            ...
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>
    </div>
</div>
<?php get_footer(); ?>