
$(document).ready(function(){

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


});

