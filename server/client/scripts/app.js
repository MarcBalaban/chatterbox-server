var rooms = ["lobby"];
var user = {"name": getUserName, "friends": []};

var getUserName = function() {
  var href = document.location.href; //refactor !
  var name = href.split('=')[1];
  return name;
};


var getMessages = function(){$.ajax({
    // always use this url
    // url: 'http://127.0.0.1:1337/classes/messages',
    url: 'http://10.8.29.248:1337/classes/messages',
    type: 'GET',
    data: JSON,
    contentType: 'application/json',
    success: function (data) {
      data = JSON.parse(data);
      updateMessages(data.results);
      updateRooms(data.results.map(function(message){
        return message.roomname;
      }));
    },
    error: function (data) {
      console.error('chatterbox: Failed to get message');
    }
  });
};

var updateRooms = function(newRooms){
  newUniqRooms = _.filter(_.uniq(_.difference(rooms.concat(newRooms), rooms)), _.identity);
  var $roomList = [];
  for(var x = 0; x < newUniqRooms.length; x++){
    var newRoom = $("<option></option>").text(newUniqRooms[x]);
    newRoom.value = newUniqRooms[x];
    $roomList.push(newRoom);
    rooms.push(newUniqRooms[x]);
  }
  $(".rooms").append($roomList);
};

var submitRoom = function() {
  var newRoomName = $('.newRoom').val(); //get roomName
  $(".newRoom").val('');
  rooms.push(newRoomName); //add to global list of rooms

  $('.rooms').append('<option selected=true>' + newRoomName + '</option>');
  getMessages();
};

var updateMessages = function(messageList){
  var currentRoom = $(".rooms").val();

  $(".messages").html('');
  var messages = [];

  for(var i = 0; i < messageList.length; i++){
    var currentMessage = messageList[i];
    var $messageDiv = $('<div></div>');

    if(!currentMessage.roomname){
      currentMessage.roomname = "lobby";
    }

    if(currentMessage.roomname === currentRoom){
      var userName = $('<p class=chatName></p>').text(currentMessage.username + ": ");
      var mssg = $('<p class=chatMessage></p>').text(currentMessage.text);
      $messageDiv.append(userName, mssg);
      messages.push($messageDiv);
    }
  }
  $(".messages").append(messages);
};

var validateInput = function(message){
  message = message || "";
  for(var i=0; i<nonConformingChars.length; i++) {
    message = message.replace(nonConformingChars[i], '');
  }

  return message;
};

var postMessage = function(userName, message, roomname) {
  $.ajax({
    // always use this url
    // url: 'http://127.0.0.1:1337/classes/messages',
    url: 'http://10.8.29.248:1337/classes/messages',
    type: 'POST',
    data: JSON.stringify({username: userName, text: message, roomname: roomname}),
    contentType: 'application/json',
    success: function (data) {
      // console.log("success");
    },
    error: function (data) {
      console.log(data);
    }
  });
};

var sendMessage = function() {
  var message = $('.userMessage').val();
  $('.userMessage').val('');
  var currentRoom = $('.rooms').val();

  postMessage(user.name, message, currentRoom);
};

$(document).ready(function() {
  user.name = getUserName();
  getMessages();
  setInterval(getMessages,1000);

  //Event Listeners
  $(".submit").on("click", sendMessage);
  $('.submitRoom').on('click', submitRoom);

  $(".newRoom").keyup(function(event) {
    if ( event.keyCode === 13 ) {
      submitRoom();
    }
  });

  $(".userMessage").keyup(function(event) {
    if ( event.keyCode === 13 ) {
      sendMessage();
    }
  });
  $(".userName").text(user.name);
  // $(".messages").on('click', '.chatName', addFriend);
});
