var req = new XMLHttpRequest();
var score;
var def_string = "";
var run = false;

function getKloutScore() {
	username = localStorage.klouter_username;
	if(username && username != "") {
		req.open("GET","http://api.klout.com/1/klout.json?key=edzf6n2te4dzdqy6br5d9563&users="+username, true);
		req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
         if(req.status == 200) {
          res = JSON.parse(req.response);
          if(res.users[0].kscore % 1 < 0.5)
        	  score = Math.floor(res.users[0].kscore);
        	else
        	  score = Math.ceil(res.users[0].kscore);
        	
        	run = true;
        	
      	 }
         else {
           //show err in dialog
           def_string = "err";

           //no more running
           run = false;
           
           //lets stop the interval too
           clearInterval(interval);
        }
          
        drawKloutScore();
      }
    } 
		req.send(null);
	} else {
	  run = false;
	}
}

function drawKloutScore() {
	var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

	context.fillStyle = "#f4f4f4";
	context.beginPath();
	context.moveTo(1,3);
	context.lineTo(19,3);
	context.lineTo(19,19);
	context.lineTo(12,17);
	context.lineTo(1,17);
	context.lineTo(1,3);
	context.fill();

	context.fillStyle = "#e44803";
	context.beginPath();
	context.moveTo(2,4);
	context.lineTo(18,4);
	context.lineTo(18,18);
	context.lineTo(13,16);
	context.lineTo(2,16);
	context.lineTo(2,4);
	context.fill();

	context.fillStyle = "#f4f4f4";
	context.font = "8px Silkscreen";
	
	if(score) {
		if(score == 100)
			context.fillText(String(score),2,12);
		else
			context.fillText(String(score),4,12);
	} else {
	  context.fillText(def_string,2,12);
	}

  var imageData = context.getImageData(0, 0, 19, 19);
  chrome.browserAction.setIcon({
    imageData: imageData
  });
}

function op() {
	if(run) 
	  getKloutScore();
}