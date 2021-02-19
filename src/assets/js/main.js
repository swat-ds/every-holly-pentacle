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
    var headHeight = $('header').height();
    var panelHeight = $('.panel').height();
    var image = $('#image-list');

    $(document).on('scroll', function(d){

        var currTop = $(this).scrollTop();

        if ( currTop > 100 ){
            $('.splash .navigation').addClass('show');
        } else {
            $('.splash .navigation').removeClass('show')
        }

    });

    if( image.length ) {
        console.log('fire')
        image.viewer({
            backdrop: true,
            movable: false,
            toolbar: false
        });
    }
});