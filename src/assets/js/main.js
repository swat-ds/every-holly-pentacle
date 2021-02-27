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

function returnActiveFacets($el) {
    let activeFacets = [];
    $el.not('.inactive').each( (i,d) => {
        activeFacets.push(d.dataset.facet);
    })

    return activeFacets;
}

$(function(){
    const images = document.getElementById('image-list') || null;
    const $facets = $('.facet-buttons button');
    const $sort = $('.sort-buttons button');

    $(document).on('scroll', function(d){
        var currTop = $(this).scrollTop();

        if ( currTop > 100 ){
            $('.splash .navigation').addClass('show');
        } else {
            $('.splash .navigation').removeClass('show')
        }

    });

    if (images) {
        const viewer = new Viewer(images, {
            backdrop: true,
            movable: false,
            toolbar: false
        });
    }

    if ($facets.length || $sort.length) {
        let activeFacets = returnActiveFacets($facets);

        const $grid = $('.collection-grid').isotope( {
            itemSelectors: '.collection-item',
            layoutMode: 'fitRows',
            getSortData: { 
                author: (d) => $(d).data('author').split(' ')[1], 
                date:'[data-date]'
            }
        });

        $facets.on('click', (d) => {
            let currFacet = $(d.target).data('facet');

            $facets.filter(`[data-facet=${currFacet}]`)
                .toggleClass('inactive');
            activeFacets = returnActiveFacets($facets);
            if (activeFacets.length === 0) { 
                $facets.removeClass('inactive');
            }

            $grid.isotope( { 
                filter: activeFacets.map( d => '.' + d ).join(',')
            });
        });

        $sort.on('click', (d) => {
            let currSort = $(d.target).data('sort');

            $sort.removeClass('inactive');                
            $sort.not(`[data-sort=${currSort}]`).addClass('inactive');

            $grid.isotope( { sortBy: currSort });
        });
    }
});