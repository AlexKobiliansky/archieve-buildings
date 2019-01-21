$(function() {


    $(window).on('load', function (){
        $('.intro-slider').owlCarousel({
            loop:true,
            margin:0,
            nav:true,
            items: 1
        });

        $('.project-slider').owlCarousel({
            loop:true,
            margin:0,
            nav:true,
            items: 1
        });

        $('.preloader').fadeOut(600);
    });

    $('.side-mnu>ul>li:has(ul)').on("click", function(e){
        e.preventDefault();
        $(this).find('ul').slideToggle();
    });

    function heightses() {
        if ($(window).width()>480) {
            $('.news-item-title').height('auto').equalHeights();
        }
    }

    $(window).resize(function() {
        heightses();
    });
    heightses();

    /**
     * mobile-mnu customization
     */
    var $toggleMenu = $(".toggle-mnu");

    $toggleMenu.click(function() {
        $(this).toggleClass("on");
        // return false;
    });
    var menuLogo = $('#mobile-mnu').data("logo");
    var $mmenu = $("#mobile-mnu").mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 4
        }],
        "slidingSubmenus": false,
        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-light",
            "pagedim-black",
            "fx-panels-zoom",
            "fx-listitems-drop",
            "position-front"
            ],
        },
    );

    var API = $mmenu.data("mmenu");
    API.bind( "close:start", function() {
        setTimeout(function () {
            $toggleMenu.removeClass("on");
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */


    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });


    $(".user-phone").mask("+7 (999) 999-99-99",{autoclear: false});
    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    $( "#project-tabs" ).tabs();


    /**
     * FILTER FORM start
     */

    var rangeSquare = document.getElementById('square');
    var rangeStages = document.getElementById('stages');

    noUiSlider.create(rangeSquare, {
        start: [15, 200],
        connect: true,
        tooltips: true,
        range: {
            'min': 15,
            'max': 200
        },
        format: wNumb({
            decimals: 0,
        })
    });

    var squareMin = document.getElementById('square-min'),
        squareMax = document.getElementById('square-max');

    rangeSquare.noUiSlider.on('update', function (values, handle) {
        if (handle) {
            squareMax.innerHTML = values[handle];
        } else {
            squareMin.innerHTML = values[handle];
        }
    });


    noUiSlider.create(rangeStages, {
        start: [1, 3],
        connect: true,
        tooltips: true,
        step: 1,
        range: {
            'min': 1,
            'max': 3
        },
        format: wNumb({
            decimals: 0,
        })
    });

    var stagesMin = document.getElementById('stages-min'),
        stagesMax = document.getElementById('stages-max');

    rangeStages.noUiSlider.on('update', function (values, handle) {
        if (handle) {
            stagesMax.innerHTML = values[handle];
        } else {
            stagesMin.innerHTML = values[handle];
        }
    });

    $('select').selectize({});

    $('.filter-range .result').on('click', function(){
        var parent = $(this).parents('.filter-range');
        parent.toggleClass('on');
        parent.siblings('.filter-range').removeClass('on');
    });


        $(document).mouseup(function(e)
        {
            if (!$('.filter-range').is(e.target) && $('.filter-range').has(e.target).length === 0)
            {
                $('.filter-range').removeClass('on');
            }
        });



    /**
     * FILTER FORM end
     */




    //E-mail Ajax Send
    $(".contact-form").submit(function() { //Change
        var th = $(this);
        t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });



});
