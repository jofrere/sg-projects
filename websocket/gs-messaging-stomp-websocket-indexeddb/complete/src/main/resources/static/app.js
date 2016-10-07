var stompClient = null;
var version = 0;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

function addrow(id, code, rate, lastdate) {
	row = document.createElement ('tr');
	
	cell_id = document.createElement ('td');
	cell_code = document.createElement ('td');
	cell_rate = document.createElement ('td');
	cell_lastdate = document.createElement ('td');
	
	content = document.createTextNode (id);
	cell_id.appendChild (content);
	
	content = document.createTextNode (code);
	cell_code.appendChild (content);
	
	content = document.createTextNode (rate);
	cell_rate.appendChild (content);
	
	content = document.createTextNode (lastdate);
	cell_lastdate.appendChild (content);
	
	row.appendChild(cell_id);
	row.appendChild(cell_code);
	row.appendChild(cell_rate);
	row.appendChild(cell_lastdate);
	
	document.getElementById ('tableau').appendChild (row);
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    $( "#add" ).click(function() { add(); });
    $( "#readall" ).click(function() { readall(); });
    $( "#cleardata" ).click(function() { cleardata(); });
});

