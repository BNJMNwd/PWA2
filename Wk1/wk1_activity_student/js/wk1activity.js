// JavaScript Document

(function($){  //10. Explain why this is used instead of a document ready function. Comment your answer out on line 4.
// We use this because it allows the users to potentially cache the content or use content that may already be cached from another site. This would equal a faster load time and overall a performance speed increase.  It also gives you a cleaner code that makes it easier for the coder to read and modify.


//4. Add the jQuery function-select the h2 of this simple web page.

    $("h2");

//5. Selectors using IDS

    $("#hlisting");

//6. Selectors using Classes

    $(".america");

//7. Manipulator

    var message = "<span>1-555-Tibbles </span>";


//8. Manipulator-Before

    $(".buy").before(message);


//9. CSS Method - Complete this line
 $(".trip").on("mouseenter", function() {
    $(this).css("background", "#252b30");
  });
  
})(jQuery) //Closes main tag