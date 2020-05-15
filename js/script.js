$(document).ready(function(){

// Init
    let listOfSlides = [];
    let pageCount = 0;
    let buttonNext = $('button#next');
    let buttonPrev = $('button#prev');

    $('#data .slide').each(function() {
        let slide = [ $(this).find('.title').html(),
                      $(this).find('.left').html(),
                      $(this).find('.right').html() ];
        listOfSlides.push(slide);
    });

    let listLength = listOfSlides.length;
    listOfSlides.reverse();
    loadSlide();

// Navigation
    buttonNext.click(function() {
        nextSlide();
    });

    buttonPrev.click(function() {
        prevSlide();
    });

    $('body').keydown(function(e) {
        // Left arrow key pressed
        if(e.which == 37) {
            buttonPrev.addClass('click');
            prevSlide();
        }
        // Right arrow key pressed
        if(e.which == 39) {
            buttonNext.addClass('click');
            nextSlide();
        }
    }).keyup(function() {
        buttonNext.removeClass('click');
        buttonPrev.removeClass('click');
    });

// Slides
    function nextSlide() {
        if(pageCount < listLength-1) {
            cleanUp();
            pageCount++;
            loadSlide();
            buttonPrev.removeClass('not-clickable');
        }
    }

    function prevSlide() {
        if(pageCount > 0) {
            cleanUp();
            pageCount--;
            loadSlide();
            buttonNext.removeClass('not-clickable');
        }
    }

    function cleanUp() {
        $('.frontpage').remove();
        $('#slide').removeClass('full-width');
    }

    function loadSlide() {
        $('header h1').html(listOfSlides[pageCount][0]);
        $('#left').html(listOfSlides[pageCount][1]);
        $('#right').html(listOfSlides[pageCount][2]);
        $('#page-nr').html(pageCount+1 + "<small> / " + listLength + "</small>");
        // Insert example markup if needed
        if($('#right > div').hasClass('example')) {
            $('.code').html($('#example').html());
            initCmds();
        }
        // Insert frontpage if needed
        else if($('#right > div').hasClass('frontpage')) {
            $('body').prepend('<div class="frontpage"></div>');
            $('.frontpage').html($('#left').html());
            $('#left *, #right *').remove();
        }
        // Insert unsplitted page if needed
        else if($('#right > div').hasClass('no-split')) {
            $('#slide').addClass('full-width');
        }
        // Adjust margins
        $('li span.cmd').parent().css('margin-bottom', '1%');
        // Check if buttons shouldn't be clickable
        if(pageCount == listLength-1) {
            buttonNext.addClass('not-clickable');
        }
        else if(pageCount == 0) {
            buttonPrev.addClass('not-clickable');
        }
    }

    function initCmds() {
        $('.cmd').parent().addClass('faded').first().removeClass('faded');
        $('#right .code .marked').removeClass('marked');
        // Command action, highlight markup
        $('.cmd').click(function() {
            $('#left .cmd').removeClass('active');
            $(this).addClass('active');
            $('.faded').first().removeClass('faded');
            $('#right .code .marked').removeClass('marked');
            // Replace text command
            if($(this).attr('cmd').startsWith('replace')) {
                let split = $(this).attr('cmd').split('|');
                let destination = split[1];
                let marked = split[2];
                let newText = split[3];
                $('#right .code ' + destination).html(newText);
                $('.marked').removeClass('marked');
                $(marked).addClass('marked');
            }
            // Normal command
            else {
                $('#right .code ' + $(this).attr('cmd')).addClass('marked');
            }
        });
        // Unfade content on click
        $('.faded').click(function() {
            $(this).removeClass('faded').prevAll().removeClass('faded');
        });
    }

});
