function start()
{
    //$("#mainContent").
    //$( "#mainContent" ).css( "border", "3px solid red" );
    //$( "#mainContent" ).html("");
    
    setTimeout(function()
    {
        $("#spinIcon").fadeOut();
         setTimeout(function()
         {
            //$("#spinIcon").remove();
         }, 305);
    }, 500);
    $("#mainAudio")[0].onended = function() {
    changeState("end");};
    updateData("update");
    changeState("idle");
}
var nextState = "on";
var songName;
function changeState(newState,song)
{
    switch (newState) {
    case "idle":
      { 
          $("#playerImg").removeClass("iconPause");
          $("#playerImg").addClass("iconPlay");        
          nextState = "on";
      }
      break;
    case "on":
      { 
          $("#playerImg").removeClass("iconPlay");
          $("#playerImg").addClass("iconPause");
          try {
          $("#mainAudio")[0].play();         
          }
          catch (err) {
            nextState = "on";
            return;
          }
          $("#bottomPlace").html("<h2>" + songName + "</h2>");
          nextState = "off";
      }
      break;
    case "off":
      {
          $("#playerImg").removeClass("iconPause");
          $("#playerImg").addClass("iconPlay");
          $("#mainAudio")[0].pause();
          nextState = "on";
      }
      break;
    case "stop":
      {
          $("#playerImg").removeClass("iconPause");
          $("#playerImg").addClass("iconPlay");
          $("#mainAudio")[0].stop();
          nextState = "on";
      }
      break;
    case "end":
    {
        
    }
    break;
    case "song":
      {
          changeState("off");
          $("#mainAudio")[0].src = "music/" + currentDir + song;
          songName = song;
          changeState("on");
      }
      break;
    default:
      { }
      break;
    }
}

var currentScreen;
var currentDir = "";
function updateData(newState,dir)
{
    switch (newState) {
    case "update":
      { 
        $.getJSON( "test.php?directory=" + currentDir, function( data ) {
            currentScreen = data;
            updateData("apply");
        });
      }
      break;
    case "apply":
      {
        rebuildMusicList();
      }
      break;
    case "cd":
      {
        if (dir != '..')
            currentDir = dir;
        else
            currentDir = "";
        updateData("update");
      }
      break;  
    default:
      { }
      break;
    }
}

function rebuildMusicList()
{
    var newHtml = "<ul>";
    for (var i = 0; i < currentScreen.length; i++) {
        if (currentScreen[i] == "..")
        {
            newHtml += '<li class="liFolderUp"><h3><a href=\'javascript:updateData(\"cd\",\"' 
                + (encodeURI(currentScreen[i])).replace("'", "%27") + '\")\'>'
                + currentScreen[i] + '</a></h3></li>'; 
        }
        else
        {
            if (currentScreen[i][currentScreen[i].length - 1] == '/')
            {
            newHtml += '<li class="liFolder"><h3><a href=\'javascript:updateData(\"cd\",\"' 
                + (encodeURI(currentScreen[i])).replace("'", "%27") + '\")\'>'
                + currentScreen[i] + '</a></h3></li>';      
            }
            else
            {
            newHtml += '<li class="liMusic"><h3><a href=\'javascript:changeState(\"song\",\"' 
                + (encodeURI(currentScreen[i])).replace("'", "%27") + '\")\'>'
                + currentScreen[i] + '</a></h3></li>';  
            }
        }
    }
    newHtml += "</ul>";
    $( "#musicList" ).html(newHtml);     
}
