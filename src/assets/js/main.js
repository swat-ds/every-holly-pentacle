/*
 *
 * minimal jquery animations for landing page
 *
 */

// scroll view jQuery function
$.fn.scrollView = function() {
    return this.each(function(){
        $('html, body').animate({
            scrollTop: $(this).offset().top
    }, 1000);
    });
}

$(function(){
    const headHeight = $('header').height();
    const panelHeight = $('.panel').height();
    const images = document.getElementById('image-list')

    $(document).on('scroll', function(d){

        var currTop = $(this).scrollTop();

        if ( currTop > 100 ){
            $('.splash .navigation').addClass('show');
        } else {
            $('.splash .navigation').removeClass('show')
        }

    });

    if( images.childElementCount ) {
        const viewer = new Viewer(images, {
            backdrop: true,
            movable: false,
            toolbar: false
        });
    }
});