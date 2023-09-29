$(document).ready(() => {
    $(".chat-conversation").hide();
    $(".chat-blank").show();
});

$(".person").click((event) => {
    $(".chat-blank").hide();
    $(".chat-conversation").show();
});
