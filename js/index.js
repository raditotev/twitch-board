function getStreamers(){      
  var users = ['freecodecamp', "riotgames2", "starladder1", "beyondthesummit", "tsm_theoddone", "Tsm_dyrus", "garenatw", "smitegame", "esl_csgo", "nl_kripp", "Nightblue3"];
  
  users.forEach(function(user){      
   var url = 'https://api.twitch.tv/kraken/streams/'+ user +'?callback=?';
   $.getJSON(url, function(data) { 
    var channel = data["_links"].channel
    var net_status;
    if(data.stream !== null){ 
      net_status = "online";      
     } else {
      net_status = "offline";       
     }      
     generateHtml(channel, net_status, user)  
     
   });      
 });    
}

function generateHtml(url, net_status, user){  
  
    $.getJSON(url+'?callback=?', function(data) {
      var name = data.display_name;      
      var logo = data.logo;
      var status = data.status;
      if(net_status == "online"){        
        $('#channels').prepend('<div class="row '+ net_status +'">\
                                  <div class="col-xs-1">\
                                    <img src="'+ logo +'" alt="'+ name +' logo" class="img-responsive img-circle" />\
                                  </div>\
                                  <div class="col-xs-3"><a href="http://www.twitch.tv/'+ user +'" target="_blank">'+ name +'</a></div>\
                                  <div class="col-xs-8 text-center">'+ status +'</div>\
                                </div>');
      } else {
         $('#channels').append('<div class="row '+ net_status +'">\
                                  <div class="col-xs-1">\
                                    <img src="'+ logo +'" alt="'+ name +' logo" class="img-responsive img-circle" />\
                                  </div>\
                                  <div class="col-xs-3"><a href="http://www.twitch.tv/'+ user +'" target="_blank">'+ name +'</a></div>\
                                  <div class="col-xs-8 text-center">Offline</div>\
                                </div>');   
      }
      
      if(data.status == 404){
         $('#channels').append('<div class="row offline">\
                                  <div class="col-xs-1">\
                                    <img src="'+ logo +'" alt="'+ name +' logo" class="img-responsive img-circle" />\
                                  </div>\
                                  <div class="col-xs-3">'+ name +'</div>\
                                  <div class="col-xs-8 text-center">Account Closed</div>\
                                </div>');   
      }        
    }); 
  $('#all').hide();
} 


$(document).ready(function() {
  
  $('#all').click(function() {
    $('#on').show();
    $('#all').hide();
    $('#off').show();
    $('.online').show();
    $('.offline').show();
  });
  
  $('#on').click(function() {
    $('#on').hide();
    $('#all').show();
    $('#off').show();
    $('.online').show();
    $('.offline').hide();
  });
  
  $('#off').click(function() {
    $('#on').show();
    $('#all').show();
    $('#off').hide();
    $('.online').hide();
    $('.offline').show();
  });
 
 getStreamers();

});