





 (function($){




 /*
 ===============================================
 ========================= APPLICATION FUNCTIONS
*/






 var checkLoginState = function(){
 $.ajax({
 url: 'xhr/check_login.php',
 type: 'get',
 dataType: 'json',
 success: function(response){
 // if user, loadApp()
 // if error, loadLanding()
 }
 });
 };



 // 	============================================
 //	SETUP FOR INIT

 var init = function(){

 checkLoginState();
 };


 init();


 /*
 ===============================================
 ======================================== EVENTS
 */


/*
 ==================================== END EVENTS
 ===============================================
 */


     $('.modalClick').on('click', function(event){
         event.preventDefault();
         $('#overlay')
             .fadeIn()
             .find('#modal')
             .fadeIn();
     });


     $('.close').on('click', function(event){
         event.preventDefault();
         $('#overlay')
             .fadeOut()
             .find('#modal')
             .fadeOut();
     });






     /*========================= fade option*/

     $('.mystatus').mouseover(function(){
         $(this).fadeTo(100, 3);
     });


     $('.mystatus').mouseout(function(){
         $(this).fadeTo(100, 1);
     });






 $("ul.tabs").each(function(){

 var $active, $content, $links = $(this).find('a');

 $active = $ ($links.filter('[href="'+location.hash+'"]') [0] ||
 $links[0]);
 $active.addClass('active');

 $content = $ ($active[0].hash);

 $links.not($active).each(function (){
    $ (this.hash).hide();
 });

 $(this).on('click', "a", function(e){
 $active.removeClass('active');
 $content.hide();

 $active = $(this);
 $content = (this.hash);

 $active.addClass("active");
 $content.show();

 e.preventDefault();
 });

 });




 })(jQuery); // end private scope



