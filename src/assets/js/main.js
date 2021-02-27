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
    const images = document.getElementById('image-list') || null;
    
    let activeFacets = [];
    $('.facet-buttons button').each( (i,d) => {
        activeFacets.push(d.dataset.facet);
    })

    $(document).on('scroll', function(d){

        var currTop = $(this).scrollTop();

        if ( currTop > 100 ){
            $('.splash .navigation').addClass('show');
        } else {
            $('.splash .navigation').removeClass('show')
        }

    });

    if( images ) {
        const viewer = new Viewer(images, {
            backdrop: true,
            movable: false,
            toolbar: false
        });
    }

    if (activeFacets.length) {
        const $grid = $('.collection-grid').isotope({
            itemSelectors: '.collection-item',
            layoutMode: 'fitRows'
        })

        $('.splash button').on('click', (d) => {
            
            let currFacet = $(d.target).data('facet');
            let currIndex = activeFacets.indexOf(currFacet);
            console.log(activeFacets)
            if (currIndex !== -1) {
                activeFacets.splice( currIndex, 1 ) 
            } else { 
                activeFacets.push(currFacet); 
            }
            console.log('now:  ', activeFacets)

            if (activeFacets.length) {
                $(`.facet-buttons button[data-facet=${currFacet}]`).toggleClass('active');
            } else {
                $('.facet-buttons button').removeClass('active');
            }

            $grid.isotope( { filter: activeFacets.map( d => '.' + d).join(',') } );
        });
    }
});