var Communication = {
    url     : "//" + window.location.hostname,
    port    : "9999",
    socket  : null,
    lnCount : 0,
    init: function () {
        Communication.startSocket();
    },
    startSocket: function () {
        Communication.socket = io.connect(Communication.url + ":" + Communication.port);
        Communication.socket.emit('requestDB');
        Communication.socket.emit('requestTweets');
        Communication.socket.emit('requestInstagram');
        Communication.socket.on('connect', function() {
            console.log("Connected to server");
        });
        Communication.socket.on('receiveNewData', function(data) {
            var str = [];
            for(var i=0; i<data.length; i++)
                str.push("<h3>" + data[i].name + "</h3>" + "<p>" + data[i].phone + "</p>");
            $("#content").empty().html(str.join(''));
        });
        Communication.socket.on('receiveNewTweet', function(data) {
            setTimeout(function(){
                $("#tweets").prepend(data + "<br/>");
                Communication.lnCount++;
                if(Communication.lnCount > 20){
                    $("#tweets").fadeOut(function(){
                        $("#tweets").empty();
                        Communication.lnCount = 0;
                        $("#tweets").fadeIn();
                    });
                }
            }, 1000);
        });
        Communication.socket.on('receiveNewInstas', function(data) {
            var str = [];
            for(var i=0; i<data.length; i++)
                str.push("<a href=http://www.instagram.com/" + data[0].user.username + ">"+data[0].user.username+"</a><br/><img src=" + data[i].images.standard_resolution.url + "><br/>");
            $("#instas").empty().html(str.join(''));
        });
    }
};

$(document).ready(function () {
    Communication.init();
})