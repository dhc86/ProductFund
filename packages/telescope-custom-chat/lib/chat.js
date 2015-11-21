if (Meteor.isClient) {
    Meteor.subscribe("chat_messages");
    Meteor.subscribe("chat_rooms");
    Meteor.subscribe("chat_users");
    Session.setDefault("roomname", "General");


    Template.chat_messages.helpers({
        chat_messages: function() {
            // will later only return chatmessages for the current room
            return chatMessages.find({room: Session.get("roomname")});
        }
    });

    Template.chat_rooms.helpers({
        chat_rooms: function() {
            // will later only return chatrooms for the current channel
            return chatRooms.find();
        }
    });

    Template.chat_users.helpers({
        chat_users: function() {
            // will later only return users for the current room
            return chatUsers.find({roomname: Session.get("roomname")}, {sort: {time: 1}});
        }
    });

    // These helpers only become available when document ready
    Template.chat_messages.rendered = function() {
        var name = '';
        if (Meteor.user()) name = Meteor.user().profile.name;
        // randomized anon name
        else { name = 'Anonymous' + (Math.floor(Math.random()*90000) + 10000).toString(); }
        Session.set("name", name);

        // detects duplicate names

        var scroll_down = function() {
            // autoscroll
            var chat = $('div#chat-room');
            // do not scroll if hovering on chat
            // may potentially change to :focus
            var chatHover = chat.is(":hover");
            if (!chatHover) {
                var height = chat.prop('scrollHeight');
                chat.animate({scrollTop: height});
            }
            // clear input
        }

        Meteor.setInterval(function() {
            scroll_down();
        }, 500);

        Tracker.afterFlush(function() {
            // timeout so page doesn't have to update all messages
            setTimeout(function() {
                //initialize chat user for the user list
                if (chatUsers._collection.update({name: name}, {name: name}) === 0) {
                    var time = (new Date()).getTime();
                    Meteor.call("newChatUser", {
                        name: name,
                        public_id: name,
                        time: time,
                        roomname: Session.get("roomname")});
                }

                Template.chat_messages.helpers({
                    update_scroll: scroll_down
                });
                var room_select = Session.get("roomname");
                $('.room-select input[value=' + room_select + ']')
                .parent()
                .addClass('active');
            }, 1);
        });
    };

    Template.chat_input.events = {
        'keydown input#chat_message' : function (event) {
            if (event.which == 13) { // 13 is the enter key
                var chat_message = document.getElementById('chat_message')
                if (chat_message.value != '') {
                    var chat_message_data = {
                        name: Session.get("name"),
                        chat_message: chat_message.value,
                        room: Session.get("roomname"),
                        time: Date.now()
                    }
                    Meteor.call("newChatMessage", chat_message_data);
                    document.getElementById('chat_message').value = '';
                    // chat_message.value = '';
                }
            }
        }
    }

    Template.chat_rooms.events = {
        'click .room-select': function() {
            Session.set("roomname", this.roomname);
            Meteor.call("changeRoom", Session.get("name"), Session.get("roomname"));
        }
    }

    Meteor.setInterval(function() {
        Meteor.call('keepalive', Session.get("name"));
    }, 5000);
}

if (Meteor.isServer) {

    Meteor.startup(function () {
        chatMessages.remove({});
        chatRooms.remove({});
        chatUsers.remove({});
        var chat_room_data = {roomname: "General"}
        Meteor.call("newChatRoom", chat_room_data);
        chat_room_data = {roomname: "Random"}
        Meteor.call("newChatRoom", chat_room_data);

        Meteor.settings.public.extraEmoticons = [
            {
                "image": "/packages/telescope-custom-chat/lib/client/assets/emoticon-don.png",
                "replacements": [":don"]
            },
            {
                "image": "/packages/telescope-custom-chat/lib/client/assets/emoticon-mug.png",
                "replacements": [":mug"]
            },
            {
                "image": "/packages/telescope-custom-chat/lib/client/assets/emoticon-kappa.png",
                "replacements": [":kappa"]
            }

        ]

    });

    //Server publishes messages to users
    Meteor.publish('chat_messages', function() {
        return chatMessages.find({}, {sort: {ts: -1}});
    });

    //Server publishes rooms to users
    Meteor.publish('chat_rooms', function() {
        return chatRooms.find({});
    });

    Meteor.publish('chat_users', function() {
        return chatUsers.find({});
    });

    // clears chat of outdated users
    Meteor.setInterval(function() {
        var now = (new Date()).getTime();
        chatUsers.find({last_seen: {$lt: (now - 10000)}})
        .forEach(function (user) {
            chatUsers._collection.remove({_id: user._id});
        });
    }, 10000);
}

Meteor.methods({
    newChatMessage: function (chat_message_data) {
        chatMessages.insert(chat_message_data);
    },
    newChatRoom: function (chat_room_data) {
        chatRooms.insert(chat_room_data);
    },
    newChatUser: function (chat_user_data) {
        chatUsers.insert(chat_user_data);
    },
    keepalive: function (name) {
        chatUsers.update(
            {public_id: name},
            {$set: {last_seen: (new Date()).getTime()}}
        );
    },
    changeRoom: function (name, roomname) {
            var time = (new Date()).getTime();
        chatUsers.update(
            {name: name},
            {$set: {roomname: roomname}}
        );
        chatUsers.update(
            {name: name},
            {$set: {time: time}}
        );
    }
});
