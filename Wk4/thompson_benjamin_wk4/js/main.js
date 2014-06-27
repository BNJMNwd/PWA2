





 (function($){




 /*
 ===============================================
 ========================= APPLICATION FUNCTIONS
*/




/*==============================================
=========================Display Username
 */


/*projects*/

     $.getJSON("xhr/check_login.php", function(data){
         console.log(data);
         $.each(data, function(key, val){
             console.log(val.first_name);
             $(".userid").html("Bonjour " + val.first_name + "!");
         })
     });


/*dashboard*/

     $.getJSON("xhr/check_login.php", function(data){
         console.log(data);
         $.each(data, function(key, val){
             console.log(val.first_name);
             $(".useridtest").html("Bonjour " + val.first_name + ", Welcome Back!");
         })
     });



/*
============================================================
============================================Tooltip
 */


     $(".tooltip").hover(function(e){

         if( $(this).attr('data-tip-type') == 'text' ){
             $('#tooltip_container').html( $(this).attr('data-tip-source') );
         }

         if( $(this).attr('data-tip-type') == 'html' ){
             var elementToGet = "#" + $(this).attr('data-tip-source');
             var newHTML = $(elementToGet).html();
             $('#tooltip_container').html(newHTML);
         }

         $('#tooltip_container').css({'display': 'block', 'opacity':0}).animate({opacity:1},250);


     }).mousemove(function(e){

             var toolTipWidth = $('#tooltip_container').outerWidth();
             var toolTipHeight = $('#tooltip_container').outerHeight();

             var pageWidth = $('body').width();
             if(e.pageX > pageWidth/2 ){
                 $('#tooltip_container').css('left',(e.pageX-toolTipWidth+20)+'px');
             }else{
                 $('#tooltip_container').css('left', (e.pageX-20)+'px');
             }


             if(e.pageY > 100 ){
                 $('#tooltip_container').css('top',(e.pageY-(toolTipHeight+20))+'px');
             }else{
                 $('#tooltip_container').css('top', (e.pageY+20)+'px');
             }




         }).mouseout(function(e){

             $('#tooltip_container').animate({opacity:0},250,function(){

                 $('#tooltip_container').css('display','none').html('');

             });
         });


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
================================================
====================================== Register
 */


$('#register').on('click', function(){
    var firstname = $('#first').val(),
    lastname = $('#last').val(),
    username = $('#userName').val(),
    email  = $('#email').val(),
    password = $('#password').val()
    console.log(firstname + " " + lastname + " " + username + " " + password);

    $.ajax({
        url: "xhr/register.php",
        type: "post",
        dataType: 'json',
        data: {
            firstname : firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password

        },

        success: function(response){
            if(response.error){
                alert(response.error);
            }else{
                window.location.assign('dashboard.html')
            }
        }
    });
});









 /*
 ===============================================
 ===================================== Log in
 */


     $("#signinButton").click(function(){
         var user = $('#user').val();
         var pass = $('#pass').val();
         console.log("this notifies you if the password is working");
         $.ajax({
             url:"xhr/login.php",
             type: "post",
             dataType: "json",
             data: {
               username: user,
               password: pass
             },
             success:function(response){
                 console.log('Test User');
                 if(response.error){
                     alert(response.error);
                 }else{
                     window.location.assign("dashboard.html")
                 };
             }
         });
     });





/*
===============================================
================================= New Projects
*/

     $('#addButton').on('click', function(e) {
         e.preventDefault();
         var projName = $('#projectName').val(),
         projDesc = $('#projectDescription').val(),
         projDue = $('#projectDueDate').val(),
         status = $('input[name = "status"]:checked').prop('id');

         $.ajax({
             url: "xhr/new_project.php",
             type: "post",
             dataType: "json",
             data: {
                 projectName: projName,
                 projectDescription: projDesc,
                 dueDate: projDue,
                 status: status
             },
             success: function(response) {
                 console.log("testing for success");
                 if(response.error) {
                    alert(response.error)
             }else{
                 window.location.assign("projects.html");
                 };
            }
         });
     });



/*
===============================================
================================= Get Projects
 */



     var projects = function(){

         $.ajax({
            url: "xhr/get_projects.php",
            type: "get",
            dataType: 'json',
            success: function(response){
                if(response.error){
                    console.log(respone.error);
                }else{

                    for(var i= 0, j=response.projects.length; i < j; i++){
                        var result = response.projects[i];

                        $(".projects").append(
                            '<div id="sortable" class="ui-state-default">' +
                            "<input class = 'projectid' type='hidden' value='" + result.id + "'>" +
                            "Project Name: " + result.projectName + "<br>" +
                            "Project Description: " + result.projectDescription + "<br>" +

                            "Project Status: " + result.status + "<br>"
                            + '<button class="deletebtn">Delete</button>'
                            + '<button class="editbtn">Edit</button>'
                            + '</div> <br> '
                        );
                    };

                    $('.deletebtn').on('click', function(e){
                        var pid = $(this).parent().find(".projectid").val();
                        console.log('test delete');
                        $.ajax({
                            url: 'xhr/delete_project.php',
                            data: {
                                projectID: pid
                            },
                            type: 'POST',
                            dataType: 'json',
                            success: function(response){
                                console.log('testing for success');

                                if(response.error) {
                                    alert(response.error);
                                } else {
                                    //console.log( results.id);
                                    window.location.assign('projects.html');
                                };
                            }
                        });
                    });




                }
            }
         })

     }
     /*projects*/
projects();






/*=============================================
=============================== my date picker
 */



     $( ".datepicker" ).datepicker({ minDate: -0, maxDate: "+1M" });



/*============================================
======================================= Drag
 */



     $( "#sortable" ).sortable();
     $( "#sortable" ).disableSelection();



/*============================================
=============================== Auto Complete
 */
     var availableTags = [
         "Crystal ",
         "Silvestro",
         "Eric",
         "Barrera",
         "Kathryn",
         "Brunette",
         "Dakota",
         "Butcher",
         "Michael",
         "Capanelli",
         "Sammi",
         "Contreras",
         "Haskell",
         "Venus",
         "Cross",
         "Angelica",
         "Dinh",
         "Michael",
         "Essien",
         "Ruby",
         "Haskell",
         "Amy",
         "Littlefield-Bousamra",
         "Alejandro",
         "Mokhtarezadeh",
         "Joanna",
         "William",
         "Ruby",
         "Sodek",
         "Benjamin",
         "Java",
         "JavaScript",
         "Lisp",
         "Perl",
         "PHP",
         "Steven",
         "Stark",
         "Swayngim",
         "Todd"
     ];
     $( ".tags" ).autocomplete({
         source: availableTags
     });

     var userNameTags = [

     "Crystal Silvestro is the most amazing professor ever!",
     "Professor Silvestro Rocks!",
     "Professor Silvestro is a coding beast!"

     ];
     $( ".tags_2" ).autocomplete({
         source: userNameTags
     });

     /*
      ==================================== END EVENTS
      ===============================================
      */


     /*==========================================
     ====================================== Modal
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

 $active = $ ($links.filter('[href="'+location.hash+'"]')[0] ||
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
 $content = $(this.hash);

 $active.addClass("active");
 $content.show();

 e.preventDefault();
 });

 });






/*
=====================================
=========================== Log Out
 */


     $('#logOut').click(function(e){
        e.preventDefault;
         $.get('xhr/logout.php', function(){
             window.location.assign('index.html');
         })
     });





 })(jQuery); // end private scope



