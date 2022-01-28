@extends('layouts.main')


@section('users_list')
<div aria-label="Chat list"  class="users-group-list-container users-group-list-container-mrg" role="grid"
    aria-rowcount="{{count($allChats)}}" style="height: 216px;">
    <input type="hidden" id="chat-data-hash" value="{{$chats_md5}}" />
    <div class="users-group-list-item"
                style="z-index: 0; transition: none 0s ease 0s; height: 72px; transform: translateY(0px);">

    @if(count($allChats) > 0)
        @foreach($allChats as $chat)
            <!-- user/groups item 1-->
            <div tabindex="0" aria-selected="true" role="row">
                <div data-testid="cell-frame-container"
                    data-userid="{{$chat['id']['user']}}"
                    data-isgroup="{{($chat['isGroup'])?'yes':'no'}}" 
                    data-userserialized="{{$chat['id']['_serialized']}}" 
                    class="users-group-cell-frame cell-frame">
                    <div class="users-group-img-wrapper">
                        <div class="users-group-img-container">
                            <div class="avater-img-container"
                                style="height: 49px; width: 49px;">
                                <div class="default-avater-img-container">
                                    <span data-testid="default-group"
                                        data-icon="default-group" class="">
                                        <svg width="212" height="212"
                                            viewBox="0 0 212 212" fill="none" class="">
                                            <path class="background"
                                                d="M105.946.25C164.318.25 211.64 47.596 211.64 106s-47.322 105.75-105.695 105.75C47.571 211.75.25 164.404.25 106S47.571.25 105.946.25z"
                                                fill="#DFE5E7">
                                            </path>
                                            <path class="primary" fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M102.282 77.286c0 10.671-8.425 19.285-18.94 19.285s-19.003-8.614-19.003-19.285C64.339 66.614 72.827 58 83.342 58s18.94 8.614 18.94 19.286zm48.068 2.857c0 9.802-7.738 17.714-17.396 17.714-9.658 0-17.454-7.912-17.454-17.714s7.796-17.715 17.454-17.715c9.658 0 17.396 7.913 17.396 17.715zm-67.01 29.285c-14.759 0-44.34 7.522-44.34 22.5v11.786c0 3.536 2.85 4.286 6.334 4.286h76.012c3.484 0 6.334-.75 6.334-4.286v-11.786c0-14.978-29.58-22.5-44.34-22.5zm43.464 1.425c.903.018 1.681.033 2.196.033 14.759 0 45 6.064 45 21.043v9.642c0 3.536-2.85 6.429-6.334 6.429h-32.812c.697-1.993 1.141-4.179 1.141-6.429l-.245-10.5c0-9.561-5.614-13.213-11.588-17.1-1.39-.904-2.799-1.821-4.162-2.828a.843.843 0 0 1-.059-.073.594.594 0 0 0-.194-.184c1.596-.139 4.738-.078 7.057-.033z">
                                            </path>
                                        </svg>
                                    </span>
                                </div>
                                @if($chat['contact']['profilePicThumbObj']['eurl'] != '')
                                <img
                                    src="{{$chat['contact']['profilePicThumbObj']['eurl']}}"
                                    alt="" draggable="false" class="user-real-img user-real-img-opcty-1 vsblty-vsbl"
                                    style="visibility: visible;">
                                @endif
                            </div>
                        </div>
                    </div>
                    <!-- user/groups name status -->
                    <div class="users-group-name-wrapper">
                        <div role="gridcell" aria-colindex="2"
                            class="users-group-name-time-grid">
                            <div class="users-group-name-content">
                                <span dir="auto" title="{{$chat['contact']['formattedName']}}"
                                    class="user-name-txt">{{$chat['contact']['formattedName']}}
                                </span>
                            </div>
                            <div class="users-group-counter-content"><!--yesterday--></div>
                        </div>

                        <div class="users-group-second-grid">
                            <div class="users-group-new-msg-txt">
                                <!-- <span class="Hy9nV" title="‪Ffff‬">
                                    <span dir="auto" class="dsply-inlyn-blok vsblty-vsbl">אמיר</span>
                                    <span>:&nbsp;</span>
                                    <span dir="ltr"
                                        class="user-name-txt">
                                        Ffff
                                    </span>
                                </span> -->
                            </div>
                            <div role="gridcell" aria-colindex="1"
                                class="users-group-counter-content">
                                <span>
                                    @if($chat['unreadCount'] > 0)
                                    <div class="users-group-unread-msg-counter"
                                        style="transform: scaleX(1) scaleY(1); opacity: 1;">
                                        <span class="unread-msg-counter"
                                            aria-label="{{$chat['unreadCount']}} unread message">{{$chat['unreadCount']}}</span>
                                    </div>
                                    @endif
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        @endforeach
    @endif
    </div>
</div>
@endsection


@section('chat_items')
<div tabindex="-1" class="chat-container-region" data-tab="8" role="region">
    <!-- chat-items -->
    
</div>
@endsection


@section('foot_script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script type="text/javascript">
    var currnt_chat_id = "";
    var currnet_chat_hash = "";
    var msg_ary = [];
    var intervalId;
    $(document).ready(function () {

        var sent_msg_clock_stt = '<span data-testid="msg-time" aria-label=" Pending " data-icon="msg-time" class=""><svg viewBox="0 0 16 15" width="16" height="15" class=""><path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"></path></svg></span>';
        var read_stt_check_elm = '<span data-testid="msg-check" aria-label=" Sent " data-icon="msg-check" class=""><svg viewBox="0 0 16 15" width="16" height="15" class=""><path fill="currentColor" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span>';
        var read_stt_dblcheck_elm = '<span data-testid="msg-dblcheck" aria-label=" Delivered " data-icon="msg-dblcheck" class=""><svg viewBox="0 0 16 15" width="16" height="15" class=""><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span>';
        /* 
            //remove/add read status color
            var dataId = "true_120363020803854156@g.us_3EB0A819A9C7FD098D2D";
            $(".message-out[data-id='" + dataId +"'] .msg-text-read-status span").removeClass("msg-text-read-color");
        */
        $(".users-group-cell-frame").on("click",function(){
            var userId = $(this).attr("data-userid");
            var userSrializeId = $(this).attr("data-userserialized");
            var isGroup = $(this).attr("data-isgroup");
            var userName = $(this).find(".user-name-txt").text();
            var userImg = $(this).find(".user-real-img").attr("src");
            console.log(userSrializeId, isGroup)
            //avater-img-container
            if(userImg == "" || userImg === undefined || userImg == null){
                if($(".main-head-img-wrapper .avater-img-container img").length > 0){
                    $(".main-head-img-wrapper .avater-img-container img").remove();
                }
            }else{
                if($(".main-head-img-wrapper .avater-img-container img").length > 0){
                    $(".main-head-img-wrapper .avater-img-container img").attr("src", userImg);
                }else{
                    $("<img>",{
                        src : userImg,
                        draggable: false,
                        class: "user-real-img user-real-img-opcty-1 vsblty-vsbl"
                    }).appendTo(".main-head-img-wrapper .avater-img-container");
                }
            }
            //main-head-user-name
            $(".main-head-user-name").html("<span class='user-name-txt'>" + userName + "</span>");

            //get messages
            //getMessages(userSrializeId, isGroup);
            setTimer(userSrializeId, isGroup);
        })
    });

    function setTimer(userSrializeId, isGroup){
        if(currnt_chat_id != userSrializeId){
            if(intervalId !== undefined){
                clearInterval(intervalId);
            }
        }
        getMessages(userSrializeId, isGroup);
        intervalId = setInterval(function(user_id, is_group){
            //console.log(user_id, is_group)
            getMessages(user_id, is_group);
        },1000, userSrializeId, isGroup);

    }

    function getMessages(userId, isGroup) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'POST',
            url:'/wpp/chatmsg',
            data: {
                user_id : userId,
                is_group: isGroup
            },
            success:function(data) {
                //$("#msg").html(data.msg);
                //console.log(data);
                if(data.status == "success"){
                    var new_hash = data.chats_md5; 
                    if(currnt_chat_id != userId || currnet_chat_hash != new_hash){
                        setMsgs(data.response.msgs, isGroup, userId, new_hash);
                    }
                }
                
            }
        });
    }

    function setMsgs(msgs, isGroup, userId, new_hash){
        var writMsgArr;
        var isAppend = false;
        if(currnt_chat_id != userId){
            currnt_chat_id = userId;
            writMsgArr = msgs;
            $(".chat-container-region").html("");
        }
        if(currnet_chat_hash != new_hash){
            currnet_chat_hash = new_hash;
            if(msg_ary.length > 0){
                //var diff = $(msgs).not(msg_ary).get();

                var diff = msgs.filter(function(objOne) {
                    return !msg_ary.some(function(objTwo) {
                        return objOne.id.id == objTwo.id.id;
                    });
                });

                console.log("diff", diff)


                writMsgArr = diff;
                isAppend = true;
            }else{
                writMsgArr = msgs;
            }
        }
        msg_ary = msgs;
        //console.log(writMsgArr);
        var i = 0, len = writMsgArr.length;
        var msg_body_html = "";
        var last_elem_id = "";
        while (i < len) {
            var msg = writMsgArr[i];
            if(msg.type == "chat"){
                //show only chat
                var msg_html = createMsgHtml(msg);
                //console.log(msg_html);
                last_elem_id = msg_html[1];
                if(isAppend){
                    $(".chat-container-region").append(msg_html[0])
                }else{
                    msg_body_html += msg_html[0];
                }
            }
            i++
        }
        if(!isAppend){
            $(".chat-container-region").html(msg_body_html)
        }
        setMsgsTail();
        scrollDown(last_elem_id);
    }
    function createMsgHtml(msg){
        var in_or_out = 'message-in';
        var tail_data = "tail-out";
        var html = "";
        var elem_id = msg.id.id;
        //var tail_class = "chat-item-tail"
        if(msg.id.fromMe){
            in_or_out = 'message-out';
            tail_data = 'tail-in';
        }
        html = '<div tabindex="-1" class="chat-item focusable-list-item ' + in_or_out +  '"' + 
            'data-id="' + msg.id.id + '" id="' + msg.id.id + '" >' + 
            '<span></span>' + //?
            '<div class="chat-item-content chat-item-wide chat-item-shape">'; 
            if(!msg.quotedMsg){
                html += '<span data-testid="'+tail_data+'" data-icon="'+tail_data+'" class="chat-item-tail"></span>'; 
            }
            html += '<div class="chat-msg-container chat-msg-container-shadow">' + 
                        '<div class="chat-msg-content">' + 
                            '<div class="msg-sender-details msg-sender-color " role="">' +
                                '<span dir="auto" class="msg-sender-name msg-sender-cursor text-visibility">' + 
                                    msg.from + 
                                '</span>' + 
                            '</div>' + 
                            '<div class="msg-text-container copyable-text" data-pre-plain-text="">';
            
            if(msg.quotedMsg && msg.quotedMsg.type == "chat"){
                //msg.quotedParticipant
                //msg.quotedStanzaID
                //msg.quotedMsg.type
                //msg.quotedMsg.body
                html += '<div class="relay-container">' +
                        '<div class="relay-container-width">' + 
                            '<div class="relay-container-btn-role" role="button">' + 
                                '<span class="relay-bg-color-1 relay-bg-flex"></span>' + 
                                '<div class="relay-msg-wrapper">' + 
                                    '<div class="relay-chat-msg-content">' + 
                                        '<div class="msg-sender-details msg-sender-color" role="button">' + 
                                            '<span dir="auto" class="msg-sender-name text-visibility">' + 
                                                msg.quotedParticipant + 
                                            '</span>' + 
                                        '</div>' + 
                                        '<div class="relay-msg-text-content" dir="rtl" role="button">' + 
                                            '<span dir="auto" class="quoted-mention text-visibility">' + 
                                                msg.quotedMsg.body + 
                                            '</span>' + 
                                        '</div>' +
                                    '</div>' + 
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            }
 
            html += '<div class="msg-text-content">\n' + 
                        '<span dir="rtl" class="text-visibility selectable-text copyable-text">\n' + 
                            '<span>' + msg.body + '</span>\n' + 
                        '</span>\n' + 
                        '<span class="msg-text-foot-spacer"></span>\n' + 
                    '</div>\n' +
                '</div>' + 
                '<div class="msg-text-foot">' + 
                    '<div class="msg-time-container" data-testid="msg-meta">' + 
                        '<span class="msg-time-text" dir="auto">' + 
                            msg.t + 
                        '</span>' + 
                    '</div>' + 
                '</div>' +
            '</div>' + 
            //'<span><!-- on hover item create arrow down button --></span>' + 
            '</div>' + 
        '</div>' +
        '</div>';

        //msg.body
        //msg.from
        //msg.t //> timestamp
        //msg.id.fromMe
        //msg.id.id
        //msg.id._serialized
        return [html,elem_id];
    }
    function setMsgsTail(){
        var svg_tail_out_ltr = '<svg viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg>';
        var svg_tail_out_rtl = '<svg viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z" ></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg>';
        //var svg_tail_in_ltr =   '<svg viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg>';
        //var svg_tail_in_rtl =   '<svg viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg >';

        var doc_dir = $("html").attr("dir");
        if (doc_dir == "rtl" || doc_dir == "RTL") {
            $(".message-out .chat-item-content .chat-item-tail").html(svg_tail_out_rtl);
            $(".message-in .chat-item-content .chat-item-tail").html(svg_tail_out_ltr);
        } else {
            $(".message-out .chat-item-content .chat-item-tail").html(svg_tail_out_ltr);
            $(".message-in .chat-item-content .chat-item-tail").html(svg_tail_out_rtl);
        }
    }

    function scrollDown(last_elem_id){
        if(last_elem_id != ""){
            var element = document.getElementById(last_elem_id);
            element.scrollIntoView({behavior: "smooth"}); //, block: "end", inline: "nearest"
        }

    }


</script>
@endsection