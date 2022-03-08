@extends('layouts.main')

@section('my_profile_img')
    @if($myProfileImg != "")
        <img src="{{ $myProfileImg }}"
            id = "my_profile_image"
            alt="" draggable="false" class="user-real-img user-real-img-opcty-1 vsblty-vsbl" style="visibility: visible;">
    @endif
@endsection

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
                    id = "user_{{$chat['id']['user']}}"
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
                                    id = "user_img_{{$chat['id']['user']}}" 
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
                                <span dir="auto" id="user_name_{{$chat['id']['user']}}" title="{{$chat['contact']['formattedName']}}"
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
                                            id = "unread_msg_{{$chat['id']['user']}}">{{$chat['unreadCount']}}</span>
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


@section('head_style')
<style>
    .loadin-spinng{
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        background: rgba(255,255,255,0.8) url("/images/loader.gif") center no-repeat;
    }
    body.loading{
        overflow: hidden;   
    }
    /* Make spinner image visible when body element has the loading class */
    body.loading .loadin-spinng{
        display: block;
    }
</style>
@endsection

@section('foot_script')

<script type="text/javascript">
    var types_arry = ["chat", "image","video", "audio", "ptt"];
    var currnt_chat_id = "";
    var is_current_group = "no";
    var currnet_chat_hash = "";
    var all_chat_hash = "{!! $chats_md5 !!}";
    var intervalusersId;
    var chat_replat_msg_serializedid = "";
    sessionStorage.setItem("is_all_user_check", "true");
    var msg_ary = [];
    var intervalId;
    var last_elem_id = "";
    var users_contants;
    sessionStorage.setItem("users_contants_html", "");
    // twemoji.size = "svg";
    // twemoji.ext = ".svg";
    // new EmojiPicker({
    //         trigger: [
    //             {
    //                 selector: '.emojis-btn',
    //                 insertInto: ['.main-textbox-input'] // '.selector' can be used without array
    //             }
    //         ],
    //         closeButton: true,
    //         //specialButtons: green
    //     });

    // new WasapEmojiPicker({
    //     trigger: [
    //         {
    //             selector: ".smiley-btn",
    //             insertInto: ".main-msg-textbox"
    //         }
    //     ],
    //     position: ".wasap-emoji-area"
    // });

    $(document).ready(function () {

        var sent_msg_clock_stt = '<span data-testid="msg-time" aria-label=" Pending " data-icon="msg-time" class=""><svg viewBox="0 0 16 15" width="16" height="15" class=""><path fill="currentColor" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"></path></svg></span>';
        var read_stt_check_elm = '<span data-testid="msg-check" aria-label=" Sent " data-icon="msg-check" class=""><svg viewBox="0 0 16 15" width="16" height="15" class=""><path fill="currentColor" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span>';
        var read_stt_dblcheck_elm = '<span data-testid="msg-dblcheck" aria-label=" Delivered " data-icon="msg-dblcheck" class=""><svg viewBox="0 0 16 15" width="16" height="15" class=""><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span>';
        /* 
            //remove/add read status color
            var dataId = "true_120363020803854156@g.us_3EB0A819A9C7FD098D2D";
            $(".message-out[data-id='" + dataId +"'] .msg-text-read-status span").removeClass("msg-text-read-color");
        */
        
        setAllChatTimer();

        $(".users-group-cell-frame").on("click",function(){
            var userId = $(this).attr("data-userid");
            var userSrializeId = $(this).attr("data-userserialized");
            var isGroup = $(this).attr("data-isgroup");
            var userName = $(this).find(".user-name-txt").text();
            var userImg = $(this).find(".user-real-img").attr("src");
            is_current_group = isGroup;
            //console.log("users-group-cell-frame: ", userSrializeId, isGroup)
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
            $(".main-text-typing-area").show();
            $("#main_msg_textbox").html("");
        });



        //$(".msg-text-write-area .textbox-input").on("input", function(e){
        $("#main_msg_textbox").on("input", function(e){
            //console.log($(this).val())
            if($(this).html() != ""){
                //$(".msg-text-write-area .textbox-placeholder").hide();
                $("#textbox_placeholde").hide();
                //$(this).val(twemoji.parse($(this).val())) ;

            }else{
                $("#textbox_placeholde").show();
            }

        })
        $("#main_msg_textbox").keydown(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            //var dummy = "\xAD";

            if (keycode == 13 && event.altKey) {
                // var el = document.getElementById("main_msg_textbox")
                // var range = document.createRange()
                // var sel = window.getSelection()

                // var val = $(this).text();
                // $(this).text(val + "\r\n" + dummy);
                // var pos = $(this).text().lastIndexOf(dummy);
                
                // range.setStart(el.childNodes[0], pos)
                // range.collapse(true)
                
                // sel.removeAllRanges()
                // sel.addRange(range)
                sendTextMsg();

                console.log("enter + alt - send msg")
                return true;
                //console.log("only enter")
                //return false;
            }
            
        })

        $(".send-msg-btn").on("click", function(){
            sendTextMsg();
        })

        //
        $(".chat-container").on("scroll", function(){
            //console.log("heigth: ", $(this).scrollTop() , this.scrollHeight - $(this).height())
            var crrPos =  $(this).scrollTop();
            var botPos = this.scrollHeight - $(this).height();
            if(crrPos != botPos){
                //$(".page_down").css("top", (botPos) + "px" );
                $(".page_down").show();
            }else{
                $(".page_down").hide();
            }
        })


        $("#page_down_btn").on("click", function(){
            scrollToElem(last_elem_id);
        });

        $(".close_replay_msg_btn_btn").on("click", function(){
            $(".replay_msg_preview_area").hide();
            $(".replay_msg_preview_content").html("");
            chat_replat_msg_serializedid = "";
        });


        $.contextMenu({
            selector: '.chat-item', 
            callback: function(key, options) {
                let chatItem = $(options.$trigger[0])
                var m = "clicked: " + key;
                //data-serializedid
                //data-id
                let chat_msg_id = chatItem.data("id");
                let chat_msg_serializedid = chatItem.data("serializedid");

                console.log(m,chat_msg_id , chat_msg_serializedid );
                if(key == "replay"){
                    //console.log(chatItem );
                    chat_replat_msg_serializedid = chat_msg_serializedid;
                    let replay_msg_content = getReplayMsgContent(chatItem);
                    $(".replay_msg_preview_content").html(replay_msg_content)
                    //let chat_msg_content = $("#" + chat_msg_id).html();

                    $(".replay_msg_preview_area").show();
                }else if(key == "forword"){
                    console.log("forword msg");
                    usersContant("forword-msg");
                }
            },
            items: {
            //     "edit": {name: "Edit", icon: "edit"},
            //     "cut": {name: "Cut", icon: "cut"},
            //    copy: {name: "Copy", icon: "copy"},
            //     "paste": {name: "Paste", icon: "paste"},
            //     "delete": {name: "Delete", icon: "delete"},
            //     "sep1": "---------",
            //     "quit": {name: "Quit", icon: function(){
            //         return 'context-menu-icon context-menu-icon-quit';
            //     }}
                "replay": {name: "Replay", icon: "fa-reply-all"},
                "forword": {name: "Forword", icon: "fa-share"},
                "sep1": "---------",
                "delete": {name: "Delete", icon: "delete"}
            }
        });

        // $('.context-menu-one').on('click', function(e){
        //     console.log('clicked', this, e);
        // })  
        var side_main_menu = `<div>
                <a href="#" id="file"><i id="file" class="far fa-file"></i></a>
                <a href="#" id="user-card"><i class="far fa-id-card"></i></a>
                <a href="{{ route('logout') }}" 
                    onclick="event.preventDefault();document.getElementById('logout-form').submit();" 
                    id="logout"><i class="fas fa-sign-out-alt"></i>
                </a>
            </div>`;

        $(".menu-btn-btn").popup({
            content: side_main_menu,
            position: "bottom",  
            theme: "",
            style: "",  
            animation: "grow",  
            event: "click", 
            hideOnClick: true,  
            zIndex: 1000,  
            popItemClick: function(e){
                let menu_type = $(this).attr("id");
                console.log("menu", menu_type);
            }
        });


        
        //attachment-btn
        var attachment_Menu =  '<div>\
            <a href="#" id="file"><i id="file" class="far fa-file"></i></a>\
            <a href="#" id="user-card"><i class="far fa-id-card"></i></a>\
            <a href="#" id="media"><i class="fas fa-photo-video"></i></a>\
            </div>';

        $("#attachment-btn").popup({
            content: attachment_Menu,
              // Where the popup will show by default- top. 
                // Other options: right, bottom, or left
            position: "top",  
                // Menu Element theme. Defaults to popupTheme, but custom class can be set instead
            theme: "",

            // Default no style, will revert to default colours. 
            // Other options: blue, red, green, custom
            style: "",  

            // Standard animation by default. 
            // Other options: flip, grow, bounce , standard
            animation: "grow",  

            // Default set to "click".
            // Can also be set to hover
            event: "click", 

            // When true, clicking off the menu closes it. When false, only clicking on the menu closes it.
            hideOnClick: true,  

            // z-index can be set for each menu for layering if necessary
            zIndex: 1000,  
            popItemClick: function(e){
                let menu_type = $(this).attr("id");
                console.log("menu", menu_type)
                if(menu_type == "media"){
                    const file = Swal.fire({
                        title: 'Select image',
                        showCancelButton: true,
                        input: 'file',
                        inputAttributes: {
                            'accept': 'image/*',
                            'aria-label': 'Upload your profile picture'
                        },
                        html: '<div class="upload-img-preview" ></div>',
                        inputValidator: (result) => {
                            console.log(result)
                        }
                    })
                    $(".swal2-file").on("change", function(result){
                        console.log("file result: " , result.target.files[0])
                        if (result.target.files[0]) {
                            const reader = new FileReader()
                            reader.onload = (e) => {
                                // Swal.fire({
                                // title: 'Your uploaded picture',
                                // imageUrl: e.target.result,
                                // imageAlt: 'The uploaded picture'
                                // })
                                let htmlImg = "<img src='" + e.target.result + "' height='200' >";
                                $(".upload-img-preview").html(htmlImg);
                            }
                            reader.readAsDataURL(result.target.files[0])
                        }         
                    })

                }
            }
        });


        // $(".image-preview-area-btn").on("click", function(){
        //     var serialize_id = $(this).attr("data-serializedid");
        //     console.log("serialize_id:" , serialize_id);
        // });

        // $("#smiley-btn-id").on("click", function(){
        //     console.log("smiley-btn-id")
        // });


        // $(".msg-text-write-area .textbox-input");

        $("#new-chat-btn").on("click", function(){
            console.log("new chat");
            usersContant("new-chat");

        });

    })

    function usersContant(type){
        $("body").addClass("loading"); 
        if(type === undefined){
            console.log("usersContant type undefined");
            $("body").removeClass("loading"); 
            return false;
        }
        var title , isCheckbox = false;
        if(type == "new-chat"){
            title = "צ'אט חדש";
        }else if(type == "forword-msg"){
            title = "העברת הודעה אל"
            isCheckbox = true; 
        }else{
            console.log("usersContant type unknown");
            $("body").removeClass("loading"); 
            return false;
        }
        //var;
        //console.time("usersContant");
        if(users_contants === undefined){
            getUsersContants("usersContant('" + type + "')");
            return false;
        }
     
        //console.log("users_contants", users_contants)
        var conent_html = getConentHtml(users_contants, title, true ,isCheckbox);
        
        

        Swal.fire({
            title: title,
            html: conent_html,
            heightAuto: false,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
                popup: 'contact-list-swel'
            },
            // willOpen: () => {
            //     Swal.showLoading()
            // },
            didRender: () => {
                $("body").removeClass("loading"); 
                //console.timeEnd("usersContant");

                $(".contact-item-wrapper-btn").on("click", function(){
                    console.log("contact-item-wrapper-btn", $(this));
                });
            }

        });
    }
    function createContentHtml(users_contants, showCheckBox){
        if(users_contants === undefined){
            return "";
        }
        if(showCheckBox === undefined){
            showCheckBox = false;
        }
        var html = `
            <div class="contact-list-wrapper" tabindex="0">
            <div style="pointer-events: auto;">
            <div class="contact-list-container">
        `;
        var len = users_contants.length;
        var i = 0;
        while (len--) {
            var contact = users_contants[i];
            var user_img_url = ((contact.profilePic != "")?contact.profilePic:sessionStorage.getItem("userpic_" + contact.user_id))
            html += `
                <div class="contact-item-wrapper">
                    <button class="contact-item-wrapper-btn" type="button" 
                        data-isShowCheckbox="${showCheckBox}"
                        data-userid="${contact.user_id}"
                        data-userserialized="${contact.user_serialized}"
                        data-isuser="${contact.isUser}"
                    >`;
                if(showCheckBox){
                    html += `<div class="contact-item-checkbox-wrapper">
                            <input class="contact-item-checkbox" type="checkbox" tabindex="-1">
                            <div class="contact-item-visual-checkbox" tabindex="-1" aria-hidden="true"
                                data-testid="visual-checkbox">
                                <!-- unchecked -->
                                <div class="contact-item-visual-checkbox-0 contact-item-visual-checkbox-0-unchecked ">
                                    <div class="contact-item-visual-checkbox-v contact-item-visual-checkbox-v-unchecked">
                                    </div>
                                </div> 
                                
                                <!-- checked -->
                                <!-- 
                                <div class="contact-item-visual-checkbox-0 contact-item-visual-checkbox-0-checked">
                                    <div
                                        class="contact-item-visual-checkbox-v contact-item-visual-checkbox-v-checked">
                                    </div>
                                </div>
                                -->
                            </div>
                        </div>`;
                }
                        html += `<div tabindex="-1" aria-selected="true" role="row">
                            <div data-testid="cell-frame-container" class="contact-tem-container">

                                <div class="contact-avatar-area">
                                    <div class="contact-avatar-wrapper" style="height: 49px; width: 49px;">
                                        <div class="contact-default-user-avatar">
                                            <span data-testid="default-user" data-icon="default-user">
                                                <svg viewBox="0 0 212 212" width="212" height="212">
                                                    <path fill="#DFE5E7" class="background"
                                                        d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                                                    </path>
                                                    <g fill="#FFF">
                                                        <path class="primary"
                                                            d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                                                        </path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </div>`;
                        if(user_img_url !== "" && user_img_url !== null && user_img_url !== undefined){
                                        html +=  `<img src="${user_img_url}"
                                            alt="" draggable="false" class="contact-user-img">
                                        `;
                        }
                        html += `</div>
                                </div>

                                <div class="contact-user-name-area">
                                    <div role="gridcell" aria-colindex="2" class="contact-user-name-wrap">
                                        <div class="contact-user-name-container">
                                            <span dir="auto" title="Yes-watsapp"
                                                class="contact-user-name-txt">${contact.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            `; 

            i++;
        }
            
        html += `
                        </div>
                    </div>
                </div>`;
        return html;
    }

    function getConentHtml(users_contants, title, toUpdate,isCheckbox ){
        var conent_html;
        var old_conent_html = sessionStorage.getItem("users_contants_html");
        if(!toUpdate && old_conent_html != ""){
            return old_conent_html;
        }
        conent_html = `
            <div class="chat-modal-wrapper  copyable-area" data-testid="chat-modal">
                <header class="chat-modal-header">
                    <!--
                    <div class="chat-modal-close">
                        <button class="chat-modal-close-btn" aria-label="סגירה">
                            <span data-testid="x" data-icon="x">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="currentColor"
                                        d="m19.1 17.2-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z">
                                    </path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    -->
                    <div class="chat-modal-header-title">
                        <h1 style="font-size: inherit;">${title}</h1>
                    </div>
                </header>
                <!-- search area -->
                <div class="chat-modal-search" tabindex="-1">
                    <button class="chat-modal-search-btn" aria-label="חיפוש צ'אט או התחלת צ'אט חדש">
                        <div class="chat-modal-search-btn-icons chat-modal-search-btn-icon-back">
                            <span data-testid="back" data-icon="back">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="currentColor" d="m12 4 1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z">
                                    </path>
                                </svg>
                            </span>
                        </div>
                        <div class="chat-modal-search-btn-icons chat-modal-search-btn-icon-search">
                            <span data-testid="search" data-icon="search">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="currentColor"
                                        d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z">
                                    </path>
                                </svg>
                            </span>
                        </div>
                    </button>
                    <span></span>
                    <div class="search-input-placeholder">חיפוש...</div>
                    <label class="search-input-label">
                        <div tabindex="-1" class="search-input-wrapper search-input-space">
                            <div title="תיבת טקסט להזנת החיפוש" role="textbox"
                                class="search-textbox-input copyable-text selectable-text" contenteditable="true"
                                data-tab="3" dir="rtl">
                            </div>
                        </div>
                    </label>
                </div>`;
        conent_html += createContentHtml(users_contants, isCheckbox);
        conent_html += `
            <!-- footer -->
                <!--
                <span class="send-to-footer">
                    <div class="send-to-wrapper" style="transform: translateY(0%);">
                        <span class="send-to-names-list">
                            <span dir="auto" class="send-to-name-txt">Yes-watsapp</span>
                        </span>
                        <div data-animate-btn="true" class="send-to-btn-con" style="opacity: 1; transform: scale(1);">
                            <div role="button" tabindex="0" class="send-to-btn">
                                <span data-testid="send" data-icon="send" class="send-to-btn-icon">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor"
                                            d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </span>
                -->
            </div>
        `;
        sessionStorage.setItem("users_contants_html", conent_html);
        return conent_html;
    }

    function getUsersContants(ret_func){
        //console.log("getUsersContants")

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'GET',
            url:'/wpp/contact',
            success:function(data) {
                //console.log("getUsersContants: ", data)
                if(data.all_contacts && data.all_contacts.status == "success"){
                    var all_contacts = data.all_contacts.response
                    //console.log("getUsersContants: ", all_contacts);
                    if(all_contacts.length > 0){
                        var tmp_ary = [];
                        $.each(all_contacts, function(idx,contact){
                            if(contact.isMe == false){
                                var contantObj = {
                                    name : contact.formattedName,
                                    user_id : contact.id.user,
                                    user_serialized : contact.id._serialized,
                                    isUser : contact.isUser,
                                    profilePic: (contact.profilePicThumbObj.eurl)?contact.profilePicThumbObj.eurl:""
                                }
                                getUserProfilePic(contact.id.user);
                                tmp_ary.push(contantObj)
                            }
                        });
                        users_contants = tmp_ary;
                        eval(ret_func)
                        //console.log("getUsersContants: ", tmp_ary);
                    }
                }
            }
        });
    }

    function getUserProfilePic(user_id){
        //return "";
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'GET',
            url:'/wpp/contactpic/' + user_id,
            success:function(data) {
                if(data.response && data.response.status == "success"){
                    //console.log("getUserProfilePic: ", data.response.response.eurl)
                    if(data.response.response.eurl){
                        sessionStorage.setItem("userpic_" + user_id , data.response.response.eurl);
                        //return data.response.response.eurl
                    }
                }
            }
        });
        return "";
    }

    function getReplayMsgContent(chatItem){
        let sender_name = chatItem.find(".chat-msg-content .msg-sender-name").html();
        let msg_body = chatItem.find(".msg-text-content .copyable-text span").html();
        let image_preview = chatItem.find(".image-preview-wrapper");
        let image_preview_data = ""; 
        if(image_preview.length > 0){
            //console.log("image_preview:", image_preview)
            image_preview_data = $(image_preview[0]).find("img").attr("src");
        }
        html = `<div class="relay-container-width">
                    <div class="relay-container-btn-role" > 
                        <span class="relay-bg-color-1 relay-bg-flex"></span> 
                        <div class="relay-msg-wrapper">
                            <div class="relay-chat-msg-content">
                                <div class="msg-sender-details msg-sender-color" role="button"> 
                                    <span dir="auto" class="msg-sender-name text-visibility"> 
                                        ${sender_name} 
                                    </span> 
                                </div> 
                                <div class="relay-msg-text-content" dir="rtl" role="button"> 
                                    <span dir="auto" class="quoted-mention text-visibility">
                                        ${msg_body}
                                    </span> 
                                </div>
                            </div> 
                        </div>`;
                if(image_preview_data != ""){
                    html += `<div class="replay-img-wrapper">
                                <div class="replay-img-content">
                                    <div class="replay-img-row">
                                        <div class="replay-img-container">
                                            <div class="img-content"
                                                style="background-image: url(&quot;${image_preview_data}&quot;);">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                }
            html += '</div>' +
                '</div>';

        return html;
    }

    function onImageClick(obj, serialize_id, mimetype, type){
        let sessionImg = "";
        if(type != "video" && type != "audio" && type != "ptt"){
            sessionImg = getMsgImageBlob(serialize_id);
        }
        let img_elem_id =  serialize_id.split("@")[1].split("_")[1];
        let prev_img = (type != "video" && type != "audio" && type != "ptt")?$("#prev_img_" + img_elem_id).attr("src"):"" ;
        //console.log("prev_img:" , prev_img , type);
        if(sessionImg != "" && prev_img == ""){
            //$(obj).find("image-preview-loaded-img img").attr("src", sessionImg);
            $("#prev_img_" + img_elem_id).attr("src",sessionImg);
            return true;
        }
        if(prev_img != ""){
            //larg the image - TODO
            //console.log("large the image - TODO");

            $.magnificPopup.open({
                items: {
                    src: prev_img
                },
                type: 'image'
            });

            return true;
        }
        getImgAjax(obj, serialize_id, mimetype, type);
        //console.log("sessionImg:", sessionImg);

    }

    function getImgAjax(obj, serialize_id, mimetype, type){

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'GET',
            url:'/wpp/msg/' + serialize_id,
            // data: {
            //     user_id : userId,
            //     is_group: isGroup
            // },
            success:function(data) {
                //$("#msg").html(data.msg);
                //console.log("getImgAjax:",serialize_id, data);
                if(data.status && data.status == "success"){
                    let imageDataURL = "data:"+mimetype+";base64,"+data.base64.replace(/"/g,"");
                    //$("#prev_img_" + serialize_id.split("@")[1].split("_")[1]).attr("src", imageDataURL);
                    // console.log( blob);
                    if(type != "video" && type != "audio" & type != "ptt"){
                        $("#prev_img_" + serialize_id.split("@")[1].split("_")[1]).attr("src", imageDataURL);
                            sessionStorage.setItem(serialize_id, imageDataURL)
                    }else{
                        fetch(imageDataURL)
                        .then(function(res){
                            return res.blob(); 
                        })
                        .then(function(imgBlob){
                            var objectURL = URL.createObjectURL(imgBlob);
                            let vdeo_dom_id = serialize_id.split("@")[1].split("_")[1];
                            $("#prev_media_" + vdeo_dom_id + " source").attr("src", objectURL);
                            //sessionStorage.setItem(serialize_id, objectURL)
                            $("#prev_media_" + vdeo_dom_id )[0].load();
                        })
                    }
                }
                
            }
        });
    }

    function setTimer(userSrializeId, isGroup){
        if(currnt_chat_id != userSrializeId){
            if(intervalId !== undefined){
                clearInterval(intervalId);
            }
        }
        getMessages(userSrializeId, isGroup);
        setSeenMsgs(userSrializeId);
        intervalId = setInterval(function(user_id, is_group){
            //console.log(user_id, is_group)
            //getMessages(user_id, is_group);
        },1000, userSrializeId, isGroup);

        //$(".msg-text-content").emojioneArea()
    }

    function setSeenMsgs(userSrializeId){
        let userId = userSrializeId.replace(/[@c.us,@c.us]/g, "");
        console.log("set seen msg 0 - TODO" , userId);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'POST',
            url:'/wpp/setseen',
            data: {
                user_id : userId
            },
            success:function(data) {
                //$("#msg").html(data.msg);
                //console.log("setSeenMsgs: ", data);
                if(data.response.status == "success"){
                    console.log("set zero unread count - TODO" , userId);
                    $("#unread_msg_" + userId).html(0)
                }
                
            }
        });
    }


    function setAllChatTimer(){
        
        if(intervalusersId !== undefined){
            clearInterval(intervalusersId);
        }
        getAllChats();
        intervalusersId = setInterval(function(){
            getAllChats();

            let is_check_users = sessionStorage.getItem("is_all_user_check");
            //console.log("is_check_users:", is_check_users)
            if(is_check_users == "false"){
                clearInterval(intervalusersId);
            }
        },3000);
    }
    function getMessages(userId, isGroup) {
        //console.log(userId)
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
                console.log(data);
                getMoreMsgs(userId,isGroup);
                if(data.status == "success"){
                    var new_hash = data.chats_md5; 
                    if(currnt_chat_id != userId || currnet_chat_hash != new_hash){
                        setMsgs(data.response.response, isGroup, userId, new_hash);
                    }
                }
                
            }
        });
    }


    function getMoreMsgs(userId,isGroup){
        //setLoadingMessages(true);
        // let userId = currnt_chat_id;
        // let isGroup = is_current_group;
        console.log("getMoreMsgs: userId", userId , ",isGroup:" , isGroup);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'POST',
            url:'/wpp/earlierchatmsg',
            data: {
                user_id : userId,
                is_group: isGroup
            },
            success:function(data) {
                //$("#msg").html(data.msg);
                console.log("getMoreMsgs: ", data);
                // if(data.status == "success"){
                //     var new_hash = data.chats_md5; 
                //     if(currnt_chat_id != userId || currnet_chat_hash != new_hash){
                //         setMsgs(data.response.response, isGroup, userId, new_hash);
                //     }
                // }
                
            }
        });

    }

    //user list and new msg count
    function getAllChats() {
        //console.log("old hash", all_chat_hash)
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'POST',
            url:'/wpp/chatajax',
            // data: {
            //     user_id : userId,
            //     is_group: isGroup
            // },
            success:function(data) {
                //console.log("all chats:" , data);
                if(data.conn_status && data.conn_status.message == "Connected"){

                    //console.log("new hash", data.chats_md5)
                    if(data.response.status == "success" && data.chats_md5 != all_chat_hash){
                        all_chat_hash = data.chats_md5; 
                        setUsers(data.response.response);
                    }
                }
                
            },
            error: function(response){
                console.log(response);
            }
        });
    }

    function setUsers(chatUsersAry){
        console.log("chatUsersAry" , chatUsersAry)
        if(chatUsersAry.length && chatUsersAry.length > 0){ 
            chatUsersAry.forEach(function(usr){
                let user_Id = usr.id.user;
                //console.log("user dom: " , $("#user_" + user_Id))
                if($("#user_" + user_Id).length > 0){
                    //check user name
                    let userName = $("#user_name_" + user_Id).html();
                    if(userName != usr.contact.formattedName){
                        $("#user_name_" + user_Id).html(usr.contact.formattedName);
                        $("#user_name_" + user_Id).attr("title", usr.contact.formattedName)
                    }
                    //check user image
                    if($("#user_img_" + user_Id).length > 0){
                        let userImg = $("#user_img_" + user_Id).attr("src");
                        if(userImg != usr.contact.profilePicThumbObj.eurl){
                            $("#user_img_" + user_Id).attr("src", usr.contact.profilePicThumbObj.eurl)
                        }
                    }else{
                        //add imgae - TODO
                    }
                    //check user unread
                    let unread_count = $("#unread_msg_" + user_Id).html();
                    if(unread_count != usr.unreadCount){
                        //Add sound new msg - TODO
                        $("#unread_msg_" + user_Id).html(usr.unreadCount)
                    }

                }else{
                    addNewUser(usr);
                }
            })
        }
    }

    function addNewUser(user){
        console.log("add(append) new user - TODO" , user)
    }


    function setMsgs(msgs, isGroup, userId, new_hash){
        var writMsgArr;
        var isAppend = false;
        //console.log("currnt_chat_id:" , currnt_chat_id , "clicked_userId: " , userId)
        if(currnt_chat_id != userId){
            currnt_chat_id = userId;
            writMsgArr = msgs;
            $(".chat-container-region").html("");
        }
        //console.log("currnt_chat_id:" , currnt_chat_id , "clicked_userId: " , userId)
        //console.log("currnet_chat_hash:" , currnet_chat_hash , "new_hash: " , new_hash)

        if(currnet_chat_hash != new_hash){
            currnet_chat_hash = new_hash;
            //console.log("msg_ary:" , msg_ary , "currnet_chat_hash: " , currnet_chat_hash)
            if(msg_ary.length > 0){
                //var diff = $(msgs).not(msg_ary).get();

                var diff = msgs.filter(function(objOne) {
                    return !msg_ary.some(function(objTwo) {
                        return objOne.id == objTwo.id;
                    });
                });

                //console.log("diff", diff)

                if(diff != msg_ary){
                    writMsgArr = diff;
                    isAppend = true;
                }
            }else{
                writMsgArr = msgs;
            }
        }
        msg_ary = msgs;
        //console.log("writMsgArr: ",writMsgArr);
        var i = 0, len = writMsgArr.length;
        var msg_body_html = "";
        while (i < len) {
            var msg = writMsgArr[i];
            if(types_arry.indexOf(msg.type) > -1){
                //show only chat
                var msg_html = createMsgHtml(msg, isGroup);
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
        //console.log("last_elem_id:" , last_elem_id)
        scrollToElem(last_elem_id);

        // $(".msg-text-content").each(function(){
        //     $(this).html(twemoji.parse($(this).html()))
        // });
        // $(".chat-container-region .emoji").width("7%")
    }

    function createMsgHtml(msg, isGroup){
        var in_or_out = 'message-in';
        var tail_data = "tail-out";
        var html = "";
        var elem_id = msg.id;
        var img_elem_id = elem_id.split("@")[1].split("_")[1];
        //var tail_class = "chat-item-tail"
        if(msg.fromMe){
            in_or_out = 'message-out';
            tail_data = 'tail-in';
        }
        html = '<div tabindex="-1" class="chat-item focusable-list-item ' + in_or_out +  '"' + 
            'data-id="' + elem_id + '" id="' + elem_id + '" data-serializedid="'+elem_id+'">' + 
            '<span></span>' + //?
            '<div class="chat-item-content chat-item-wide chat-item-shape">'; 
            if(!msg.quotedMsg){
                html += '<span data-testid="'+tail_data+'" data-icon="'+tail_data+'" class="chat-item-tail"></span>'; 
            }
            html += '<div class="chat-msg-container chat-msg-container-shadow">' + 
                        '<div class="chat-msg-content">' + 
                            '<div class="msg-sender-details msg-sender-color " role="">' +
                                '<span dir="auto" class="msg-sender-name msg-sender-cursor text-visibility">' + 
                                    ((msg.sender)?msg.sender.formattedName:msg.from) + 
                                '</span>' + 
                            '</div>' + 
                            '<div class="msg-text-container copyable-text" data-pre-plain-text="">';
            
            if(msg.quotedMsg && types_arry.indexOf(msg.quotedMsg.type) > -1){
                //msg.quotedParticipant
                //msg.quotedMsgId
                //msg.quotedMsg.type
                //msg.quotedMsg.body
                html += '<div class="relay-container">' +
                        '<div class="relay-container-width">' + 
                            '<div class="relay-container-btn-role" role="button" onclick="scrollToElem(\''+ msg.quotedMsgId +'\')">' + 
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
                                                ((msg.quotedMsg.type == "image" || msg.quotedMsg.type == "video")?msg.quotedMsg.caption:msg.quotedMsg.body) + 
                                            '</span>' + 
                                        '</div>' +
                                    '</div>' + 
                                '</div>';
                        if(msg.quotedMsg.type == "image" || msg.quotedMsg.type == "video"){
                            html += '<div class="replay-img-wrapper">' +
                                        '<div class="replay-img-content">' +
                                            '<div class="replay-img-row">' +
                                                '<div class="replay-img-container">' +
                                                    '<div class="img-content"' +
                                                        'style="background-image: url(&quot;data:' + msg.quotedMsg.mimetype + ';base64,' + msg.quotedMsg.body + '&quot;);">' + 
                                                    '</div>' +
                                                '</div>' +
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                        }
                    html += '</div>' +
                        '</div>' +
                    '</div>';
            }
            if(msg.type == "image" ||  msg.type == "video" || msg.type == "audio"|| msg.type == "ptt"){
                html += '<div role="button" class="image-preview-area-btn"' + 
                        'onclick="onImageClick(this, \'' + elem_id + '\' , \'' + msg.mimetype+ '\' , \'' +msg.type+ '\')" ' + 
                        'style="width: 330px; height: 330px;">' +
                        '<div class="image-preview-area-container">' + 
                            '<div class="image-preview-wrapper">' + 
                                '<img src="data:' + msg.mimetype + ';base64,' + msg.body + '" class="image-preview-noloaded-img" >' + 
                            '</div>'+
                            '<div class="image-preview-wrapper image-preview-loaded-img">';
                            if(msg.type == "image"){
                                html += '<img id="prev_img_' + img_elem_id +'" src="' + getMsgImageBlob(elem_id) + '" >';
                            }

                            if(msg.type == "video"){
                                let vdo_src = getMsgImageBlob(elem_id);
                                html += '<video id="prev_media_' + img_elem_id +'" controls>' + 
                                        '<source  src="' + vdo_src + '" >' + 
                                    '</video>';
                            }

                            if(msg.type == "audio" || msg.type == "ptt"){
                                let vdo_src = getMsgImageBlob(elem_id);
                                html += '<audio id="prev_media_' + img_elem_id +'" controls>' + 
                                        '<source  src="' + vdo_src + '" >' + 
                                    '</audio>';
                            }

                        html += '</div></div></div>';
            }
            html += '<div class="msg-text-content">\n' + 
                        '<span dir="auto" class="text-visibility selectable-text copyable-text">\n' + 
                            '<span>' + ((msg.type == "image" ||  msg.type == "video")?msg.caption:((msg.type =="audio" || msg.type =="ptt")?"":msg.body)) + '</span>\n' + 
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
        //msg.fromMe
        //elem_id
        //elem_id
        return [html,elem_id];
    }





    // function createSendMsgHtml(msg, isGroup){
    //     var in_or_out = 'message-in';
    //     var tail_data = "tail-out";
    //     var html = "";
    //     var elem_id = elem_id;
    //     //var tail_class = "chat-item-tail"
    //     if(msg.fromMe){
    //         in_or_out = 'message-out';
    //         tail_data = 'tail-in';
    //     }
    //     html = '<div tabindex="-1" class="chat-item focusable-list-item ' + in_or_out +  '"' + 
    //         'data-id="' + elem_id + '" id="' + elem_id + '" data-serializedid="'+elem_id+'">' + 
    //         '<span></span>' + //?
    //         '<div class="chat-item-content chat-item-wide chat-item-shape">'; 
    //         if(msg.quotedMsg != ""){
    //             html += '<span data-testid="'+tail_data+'" data-icon="'+tail_data+'" class="chat-item-tail"></span>'; 
    //         }
    //         html += '<div class="chat-msg-container chat-msg-container-shadow">' + 
    //                     '<div class="chat-msg-content">' + 
    //                         '<div class="msg-sender-details msg-sender-color " role="">' +
    //                             '<span dir="auto" class="msg-sender-name msg-sender-cursor text-visibility">' + 
    //                                 msg.from + 
    //                             '</span>' + 
    //                         '</div>' + 
    //                         '<div class="msg-text-container copyable-text" data-pre-plain-text="">';
            
    //         if(msg.quotedMsg != ""){
    //             html += msg.quotedMsg ;
    //         }
    //         if(msg.type == "image" ||  msg.type == "video"){
    //             html += '<div role="button" class="image-preview-area-btn"' + 
    //                     'onclick="onImageClick(this, \'' + elem_id + '\' , \'' + msg.mimetype+ '\')" ' + 
    //                     'style="width: 330px; height: 330px;">' +
    //                     '<div class="image-preview-area-container">' + 
    //                         '<div class="image-preview-wrapper">' + 
    //                             '<img src="data:' + msg.mimetype + ';base64,' + msg.body + '" class="image-preview-noloaded-img" >' + 
    //                         '</div>'+
    //                         '<div class="image-preview-wrapper image-preview-loaded-img">';
    //                         if(msg.type == "image"){
    //                             html += '<img id="prev_img_' + img_elem_id +'" src="' + getMsgImageBlob(elem_id) + '" >';
    //                         }
    //                         if(msg.type == "video"){
    //                             html += '<video id="prev_media_' + img_elem_id +'" controls>' + 
    //                                         '<source  src="' + getMsgImageBlob(elem_id) + '" >' + 
    //                                     '</video>';
    //                         }
    //                     html += '</div></div></div>';
    //         }
    //         html += '<div class="msg-text-content">\n' + 
    //                     '<span dir="rtl" class="text-visibility selectable-text copyable-text">\n' + 
    //                         '<span>' + ((msg.type == "image" ||  msg.type == "video")?msg.caption:msg.body) + '</span>\n' + 
    //                     '</span>\n' + 
    //                     '<span class="msg-text-foot-spacer"></span>\n' + 
    //                 '</div>\n' +
    //             '</div>' + 
    //             '<div class="msg-text-foot">' + 
    //                 '<div class="msg-time-container" data-testid="msg-meta">' + 
    //                     '<span class="msg-time-text" dir="auto">' + 
    //                         msg.t + 
    //                     '</span>' + 
    //                 '</div>' + 
    //             '</div>' +
    //         '</div>' + 
    //         //'<span><!-- on hover item create arrow down button --></span>' + 
    //         '</div>' + 
    //     '</div>' +
    //     '</div>';

    //     //msg.body
    //     //msg.from
    //     //msg.t //> timestamp
    //     //msg.fromMe
    //     //elem_id
    //     //elem_id
    //     return [html,elem_id];
    // }













    function getMsgImageBlob(msg_serialized_id){
        let imagBase64 = sessionStorage.getItem(msg_serialized_id);
        //console.log("msg_serialized_id:",msg_serialized_id,"imagBase64: " , imagBase64)
        if(imagBase64 !== null){
            return imagBase64;
            // $.get(imagBase64).done(function () {
            //     //console.log('isImgExists: ', true);
            //     return imagBase64;
            // }).fail(function () {
            //     //console.log('isImgExists: ', false);
            //     sessionStorage.removeItem(msg_serialized_id);
            //     return "";
            // });
        }
        return "";
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

    function scrollToElem(elem_id, option){
        let defaultOptions = {
            behavior: "smooth",
            block: "end"
        }

        if(option !== null && option !== undefined){
            defaultOptions = option;
        }

        if(elem_id != "" && elem_id !== null && elem_id !== undefined){
            var element = document.getElementById(elem_id);
            if(element  !== null )
                element.scrollIntoView(defaultOptions); //, block: "end", inline: "nearest"
            else
                console.log(`elemnet with id ${elem_id}: no found`)
        }

    }

    function sendTextMsg(){
        //main_msg_textbox
        //let txtMsg = $("#main_msg_textbox").text();
        let txtMsg = $("#main_msg_textbox").html();
        if(txtMsg == ""){
            return false;
        }
        //var sendTo = currnt_chat_id;

        //console.log(txtMsg)

        //txtMsg = escapeHtml(txtMsg);
        console.log("send to:", currnt_chat_id, is_current_group);


        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type:'POST',
            url:'/wpp/sendmsg',
            data: {
                send_to : currnt_chat_id.replace(/[@c.us,@g.us]/g, ""),
                is_group: is_current_group,
                repaly_msg_id: chat_replat_msg_serializedid,
                msg_body: txtMsg
            },
            success:function(data) {
                //console.log("send status msg :", data);
                $("#main_msg_textbox").html("");
                if(chat_replat_msg_serializedid != ""){
                    // $(".replay_msg_preview_area").hide();
                    // $(".replay_msg_preview_content").html("");
                    // chat_replat_msg_serializedid = "";
                    $(".close_replay_msg_btn_btn").click();
                }
                if(data != "" && data !== null && data !== undefined){
                    if(data.response && data.response.status && data.response.status == "success"){
                        // let msg = data.response.response[0];
                        // let isGroup = (is_current_group == "yes")?true:false;
                        // let html_data = createMsgHtml(msg, isGroup);
                        // $(".chat-container-region").append(html_data[0])
                        // setMsgsTail();
                        // scrollToElem(html_data[1]);
                    }
                }
                //createSendMsgHtml(msg, isGroup)
            },
            error: function(reponse){
                $("#main_msg_textbox").html("");
                if(chat_replat_msg_serializedid != ""){
                    $(".close_replay_msg_btn_btn").click();
                }
            }
        });
    }
    function escapeHtml(unsafe){
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function un_escapeHtml(safe){
        if(safe===null) return "";
        return safe;
        return safe
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }
    //twemoji.parse(document.body);
</script>
@endsection