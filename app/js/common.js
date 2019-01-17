$(function() {

    $('.side-mnu>ul>li:has(ul)').on("click", function(e){
        e.preventDefault();
        $(this).find('ul').slideToggle();
    });

    $(window).on('load', function (){
        $('.intro-slider').owlCarousel({
            loop:true,
            margin:0,
            nav:true,
            items: 1
        });

        $('.preloader').fadeOut(600);
    });



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

    //E-mail Ajax Send
    $("form").submit(function() { //Change
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
