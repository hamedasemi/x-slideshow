//$(document).ready(function () {
//    $( document ).ajaxStart(function() {
//  $( "#loading" ).prependTo("body");
//});
////$( document ).ajaxStop(function() {
////  $( "#loading" ).remove();
////});
//    $.ajax({
//        type: "GET",
//        url: "xml/XMLFile.xml",
//        dataType: "xml",
//        success: function (xml) {
//            $(xml).find("slideshow>slide").each(function () {
//                $("<a/>").append($(this).find(">id").text()).appendTo("section#slideshow");
//                $("<h3/>").append($(this).find(">title").text()).appendTo("section#slideshow");
//                $("<h4/>").append($(this).find(">subtitle").text()).appendTo("section#slideshow");
//                //$("<img/>").attr("src", "images/"+$(this).find(">image").text()).appendTo("section#slideshow");
//                //$("<img/>").attr("src", "img/loader.gif").appendTo("section#slideshow");
//                $("<div/>").append("<img src="+"images/"+$(this).find(">image").text()+" class='loading'>").appendTo("section#slideshow");
//                $("<p/>").append($(this).find(">short").text()).appendTo("section#slideshow");
//                $("<p/>").append($(this).find(">long").text()).appendTo("section#slideshow");
//            });
//        } // End of "XML Success"
//    }).always(function(){
//        $( "#loading" ).remove();
//    })// End of "Ajax"
//    .done(function () {
//                
//        $(".loading").bind("load", function(){
//            $(this).parent("div").css("background-image","none");
//            $(this).addClass("loaded").removeClass("loading");
//        });

//    }).fail(function() { alert("error"); });  // End of "XML Done"

//    
//});








$(document).ready(function () {
    $(document).ajaxStart(function () {
        // Slideshow
        $("section#slideshow.preload").removeClass("preload").addClass("loading");
    });
    $.ajax({
        type: "GET",
        url: "xml/slideshow.html",
        dataType: "html",
        success: function (html) {
            $(html).appendTo("section#slideshow");
        }
    })
    .fail(function () {
        // Slideshow
        $("section#slideshow").removeClass("loading").addClass("error");
    })
    .done(function () {
        // Slideshow
        $("section#slideshow").removeClass("loading").addClass("loaded");
        // Content
        $("section#slideshow article.loading img").bind("load", function () {
            // Article
            $(this).parent("div").parent("article").removeClass("loading").addClass("loaded");
            // Anchor
            $("section#slideshow menu a").eq($(this).parent("div").parent("article").index()).removeClass("loading").addClass("loaded");
        });
        // Click event
        $("section#slideshow menu a").click(function () {
            if ($("section#slideshow div#autoplay a").hasClass("active")) {
                // Slideshow timer start
                timer(5);
            }
            // Anchor
            $(this).addClass("active").siblings(".active").removeClass("active");
            // Article
            $(this).parent("menu").siblings("article").eq($(this).index()).addClass("active").siblings(".active").removeClass("active");
        });
        // Buttons
        $("section#slideshow>a").click(function () {
            $('section#slideshow menu a.active')[$(this).text()]().trigger('click');
        });
        // Autoplay
        $("section#slideshow div#autoplay a").click(function () {
            $(this).toggleClass("active");
            if ($("section#slideshow div#autoplay a").hasClass("active")) {
                // Slideshow timer start
                timer(5);
            }
            else {
                clearInterval(counter);
            }
        });
        // Auto
        $("section#slideshow input[type=checkbox]").click(function () {
            

        });
        // Start slideshow
        $('section#slideshow menu a').eq(0).trigger('click');

    });
});


//?????????? Slideshow timer should care about the content is loaded or not, if the cpntent is loaded then the counter must start




var counter;

// click on slideshow menu when we are in a page that contains slideshow

// Disable slideshow timer on leaving the page that contains slideshow
//clearInterval(counter);


// Timer function
function timer(sec) {
    if (counter) {
        clearInterval(counter);
    }
    counter = setInterval(function () {
        sec--;
        if (sec == 0) {
            clearInterval(counter);
            $('section#slideshow menu').children('.active').nextOrFirst().trigger('click');
        }
    }, 1000);
}
// Next or first
jQuery.fn.nextOrFirst = function (selector) {
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
}
// Prev or last
jQuery.fn.prevOrLast = function (selector) {
    var prev = this.prev(selector);
    return (prev.length) ? prev : this.nextAll(selector).last();
}