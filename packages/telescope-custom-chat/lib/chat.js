if (Meteor.isClient) {
    Meteor.subscribe("chat_messages");
    Meteor.subscribe("chat_rooms");

    Template.chat_messages.helpers({
        chat_messages: function() {
            // will later only return chatmessages for the current room
            return chatMessages.find();
        }
    });

    // These helpers only become available when document ready
    Template.chat_messages.rendered = function() {
        var scroll_down = function() {
            // autoscroll
            var chat = $('div.chat-room');
            // do not scroll if hovering on chat
            var chatHover = chat.is(":hover");
            if (!chatHover) {
                var height = 0;
                chat.children().each(function(i, value){
                    height += parseInt($(this).height());
                });
                height += '';
                chat.animate({scrollTop: height});
            }
            // clear input
            document.getElementById('chat_message').value = '';
        }
        Tracker.afterFlush(function() {
            scroll_down();
            // timeout so page doesn't have to update all messages
            setTimeout(function() {
                Template.chat_messages.helpers({
                    update_scroll: scroll_down
                });
            }, 200);
        });
    };

    Template.chat_input.events = {
        'keydown input#chat_message' : function (event) {
            if (event.which == 13) { // 13 is the enter key
                if (Meteor.user())
                    var name = Meteor.user().profile.name;
                else
                    var name = 'Anonymous';
                var chat_message = document.getElementById('chat_message')
                if (chat_message.value != '') {
                    var chat_message_data = {
                        name: name,
                        chat_message: chat_message.value,
                        time: Date.now(),
                    }
                    Meteor.call("newChatMessage", chat_message_data);
                    // chat_message.value = '';
                }
            }
        }
    }
}

if (Meteor.isServer) {

    Meteor.startup(function () {
        chatMessages.remove({});
        chatRooms.remove({});
        var chat_room_data = {roomname: "general"}
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
}

Meteor.methods({
    newChatMessage: function (chat_message_data) {
        chatMessages.insert(chat_message_data);
    },
    newChatRoom: function (chat_room_data) {
        chatRooms.insert(chat_room_data);
    }
});
