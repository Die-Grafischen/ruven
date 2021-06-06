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
            $bild = $content['bild'] ? $content['bild'] : false;
            $text = $content['text'] ? $content['text']: false;
            $gallery_post = $content[1] ? true : false;

            $thispost = get_post($id);
            $menu_order = $thispost->menu_order;

            do_action('qm/debug', $gallery_post);
            
            echo '<div class="project" data-custom="'. esc_attr($menu_order) .'" data-default="'. esc_attr($count) .'">';
                the_post_thumbnail();
               
            echo '</div>';
            $count++;
        }
        
    endwhile; endif;
    ?>

</div>
<div id="sort-button" data-sort-value="sort"></div>
<?php get_footer(); ?>