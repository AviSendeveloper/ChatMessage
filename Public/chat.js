const onlineSocket = io("/users-online", {
    auth: {
        userId: userId,
    },
});

onlineSocket.on("connection-update", ({ connectedUserId }) => {
    $(`#${connectedUserId}-user span`)
        .removeClass("offline")
        .addClass("online");
});

onlineSocket.on("disconnection-update", ({ disconnectedUserId }) => {
    $(`#${disconnectedUserId}-user span`)
        .removeClass("online")
        .addClass("offline");
});

$(document).ready(() => {
    $(".chat-conversation").hide();
    $(".chat-blank").show();
});

$(".person").click((event) => {
    $(".chat-blank").hide();
    $(".chat-conversation").show();
});
