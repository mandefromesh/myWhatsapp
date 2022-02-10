<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <!-- <script src="{{ asset('js/app.js') }}" defer></script> -->

    <!-- Fonts -->
    <!-- <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"> -->
    <!-- <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css" rel="stylesheet"> -->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/font-awesome.min.css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Styles -->
    <link href="{{ url('css/main.css') }}" rel="stylesheet">
    <link href="{{ url('jQuery-contextMenu/jquery.contextMenu.min.css') }}" rel="stylesheet">
    <link href="{{ url('popup-menu/popup.css') }}" rel="stylesheet">
    <!-- <link href="{{ url('emojionearea/emojionearea.min.css') }}" rel="stylesheet"> -->
    <!-- <link href="https://rawgit.com/ellekasai/twemoji-awesome/gh-pages/twemoji-awesome.css" rel="stylesheet"> -->

    <!-- <link href="{{ url('wasap_emoji/wasap_emoji.css') }}" rel="stylesheet"> -->

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  
    <script src="{{ url('jQuery-contextMenu/jquery.contextMenu.js') }}"></script>
    <script src="{{ url('jQuery-contextMenu/jquery.ui.position.min.js') }}"></script>
    <script src="{{ url('popup-menu/popup.js') }}"></script>
    <!-- <script src="{{ url('emojionearea/emojionearea.min.js') }}"></script> -->
    <script src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js" crossorigin="anonymous"></script>
    <!-- <script src="//twemoji.maxcdn.com/twemoji.min.js"></script> -->
    <!-- <script src="{{ url('emoji_picker/vanillaEmojiPicker.js') }}"></script> -->
    <!-- <script src="{{ url('wasap_emoji/wasap_emoji.js') }}"></script> -->
    
    <link href="{{ url('emoji-mart-outside-react/emoji-mart/css/emoji-mart.css') }}" rel="stylesheet">
    <script src="{{ url('emoji-mart-outside-react/dist/main.js') }}" type="text/javascript"></script>


    @yield('head_style')
    @yield('head_script')
</head>
<body>
<div id="app">
        <div tabindex="-1" class="app-wrapper app-wrapper-web font-fix os-win">
            <div tabindex="-1" class="main-container two">
                <!-- <div class="_3DJrq"></div> -->
                <div class="column-container side-bar side-bar-min-width">
                    <div id="side" class="side-container">
                        <header class="side-head-wrapper">
                            <!-- user(my) avatar area -->
                            <div class="side-head-avater-area">
                                <div class="avater-img-container" style="height: 40px; width: 40px; cursor: pointer;">
                                    <div class="default-avater-img-container">
                                        <span data-testid="default-user" data-icon="default-user" class="">
                                            <svg viewBox="0 0 212 212" width="212" height="212" class="">
                                                <path fill="#DFE5E7" class="background"
                                                    d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                                                </path>
                                                <path fill="#FFF" class="primary"
                                                    d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                                                </path>
                                            </svg>
                                        </span>
                                    </div>
                                    <!-- <img src="https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F158668199_505194764150172_6062118462735220070_n.jpg%3Fccb%3D11-4%26oh%3D185b38bda79bad5767e043cd43af17ca%26oe%3D61DDC2FB&amp;t=s&amp;u=972509399533%40c.us&amp;i=1641600704&amp;n=r9mSIfu5BCeBBZplXN4s2hWcdiQqor2xVHXFCGjEepI%3D"
                                        alt="" draggable="false" class="user-real-img user-real-img-opcty-1 vsblty-vsbl" style="visibility: visible;"> -->
                                </div>
                            </div>
                            <!-- side head menu area -->
                            <div class="side-head-menu-area">
                                <div class="menu-area-container menu-area-color">
                                    <span>
                                        <!-- status button -->
                                        <!-- <div class="menu-btn-container">
                                            <div aria-disabled="false" role="button" tabindex="0" class="btns-content" title="Status" aria-label="Status">
                                                <span data-testid="status-v3" data-icon="status-v3" class=""><svg
                                                        id="ee51d023-7db6-4950-baf7-c34874b80976" viewBox="0 0 24 24" width="24" height="24"
                                                        class="">
                                                        <path fill="currentColor"
                                                            d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z">
                                                        </path>
                                                    </svg></span></div><span></span>
                                        </div> -->
                                        <!-- chat button -->
                                        <div class="menu-btn-container">
                                            <div aria-disabled="false" role="button" tabindex="0" class="btns-content"
                                                title="New chat" aria-label="New chat">
                                                <span data-testid="chat" data-icon="chat" class="">
                                                    <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                        <path fill="currentColor"
                                                            d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <!-- menu button -->
                                        <div class="menu-btn-container">
                                            <div aria-disabled="false" role="button" tabindex="0" class="btns-content"
                                                title="Menu" aria-label="Menu">
                                                <span data-testid="menu" data-icon="menu" class="">
                                                    <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                        <path fill="currentColor"
                                                            d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </header>

                        <!-- <span class="_3z9_h"></span> -->
                        <!-- search -->
                        <div tabindex="-1" class="side-search-wraper">
                            <div class="side-search-container">
                                <button class="side-search-btn-container" aria-label="Search or start new chat">
                                    <!-- back button -->
                                    <!-- <div class="side-search-btn _2nifA">
                                        <span data-testid="back" data-icon="back" class="">
                                            <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
                                            </svg>
                                        </span>
                                    </div> -->

                                    <!-- search icon -->
                                    <div class="side-search-btn side-search-icon">
                                        <span data-testid="search" data-icon="search" class="">
                                            <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                <path fill="currentColor"
                                                    d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z">
                                                </path>
                                            </svg>
                                        </span>
                                    </div>

                                </button>
                                <!-- <span></span> -->
                                <!-- search text paceholder -->
                                <div class="side-search-placeholder">Search or start new chat</div>
                                <!-- search text field -->
                                <label class="side-search-label">
                                    <div tabindex="-1" class="textbox-container">
                                        <div class="textbox-placeholder" style="visibility: visible;"></div>
                                        <div role="textbox" class="textbox-input copyable-text selectable-text"
                                            contenteditable="true" data-tab="3" dir="ltr">
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- users/groups list -->
                        <div class="users-group-list-wrapper-pos users-group-list-wrapper" id="pane-side">
                            <div tabindex="-1" data-tab="4">
                                <div class="">
                                    @yield('users_list')
                                </div>
                            </div>

                            <div hidden="" style="display: none;"></div>
                            <!-- <div class="_1lRek"></div> -->
                        </div>
                    </div>
                </div>
                <!-- main -->
                <div class="column-container main-content-wrapper">
                    <div id="main" class="main-content-area" style="transform: scaleX(1);">
                        <!-- main background -->
                        <div class="main-content-area-bg" data-asset-chat-background-light="true"
                            style="opacity: 0.06;"></div>
                        <!-- main head -->
                        <header class="main-head-area">
                            <!-- user img -->
                            <div class="main-head-img-wrapper" role="button">
                                <div class="avater-img-container" style="height: 40px; width: 40px;">
                                    <div class="default-avater-img-container">
                                        <span data-testid="default-group"
                                            data-icon="default-group" class="">
                                            <svg width="212" height="212"
                                                viewBox="0 0 212 212" fill="none" class="">
                                                <path class="background"
                                                    d="M105.946.25C164.318.25 211.64 47.596 211.64 106s-47.322 105.75-105.695 105.75C47.571 211.75.25 164.404.25 106S47.571.25 105.946.25z"
                                                    fill="#DFE5E7">
                                                </path>
                                                <path class="primary" fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M102.282 77.286c0 10.671-8.425 19.285-18.94 19.285s-19.003-8.614-19.003-19.285C64.339 66.614 72.827 58 83.342 58s18.94 8.614 18.94 19.286zm48.068 2.857c0 9.802-7.738 17.714-17.396 17.714-9.658 0-17.454-7.912-17.454-17.714s7.796-17.715 17.454-17.715c9.658 0 17.396 7.913 17.396 17.715zm-67.01 29.285c-14.759 0-44.34 7.522-44.34 22.5v11.786c0 3.536 2.85 4.286 6.334 4.286h76.012c3.484 0 6.334-.75 6.334-4.286v-11.786c0-14.978-29.58-22.5-44.34-22.5zm43.464 1.425c.903.018 1.681.033 2.196.033 14.759 0 45 6.064 45 21.043v9.642c0 3.536-2.85 6.429-6.334 6.429h-32.812c.697-1.993 1.141-4.179 1.141-6.429l-.245-10.5c0-9.561-5.614-13.213-11.588-17.1-1.39-.904-2.799-1.821-4.162-2.828a.843.843 0 0 1-.059-.073.594.594 0 0 0-.194-.184c1.596-.139 4.738-.078 7.057-.033z">
                                                </path>
                                            </svg>
                                        </span>
                                    </div>
                                    <!-- <img
                                        src="https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F157350221_347781573489889_7142572979777296550_n.jpg%3Fccb%3D11-4%26oh%3Dd47d5b0b09ccef210eb3a7ce065d3dd5%26oe%3D61DE4355&amp;t=s&amp;u=120363020803854156%40g.us&amp;i=1641567924&amp;n=h5DPqsWXvl1i5HmGoEHfPyJbVQzhXPsUH7%2F%2BM%2FTMi%2FE%3D"
                                        alt="" draggable="false" class="user-real-img user-real-img-opcty-1 vsblty-vsbl" style="visibility: visible;"> -->
                                </div>

                            </div>
                            <!-- user name -->
                            <div class="main-head-user-name-area" role="button">
                                <div class="main-head-user-name-cont">
                                    <div class="main-head-user-name">
                                        <!-- <span dir="auto" title="קבוצה אמיר בדיקה" class="user-name-txt">קבוצה
                                            אמיר בדיקה</span> -->
                                    </div>
                                </div>
                            </div>
                            <!-- settings -->
                            <div class="main-head-menu-area">
                                <div class="menu-area-container menu-area-color">
                                    <div class="menu-btn-container">
                                        <div aria-disabled="false" role="button" tabindex="0" class="btns-content"
                                            data-tab="6" title="Search…" aria-label="Search…">
                                            <span data-testid="search-alt" data-icon="search-alt" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                    <path fill="currentColor"
                                                        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="menu-btn-container">
                                            <div aria-disabled="false" role="button" tabindex="0" class="btns-content"
                                                data-tab="6" title="Menu" aria-label="Menu">
                                                <span data-testid="menu" data-icon="menu" class="">
                                                    <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                        <path fill="currentColor"
                                                            d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <!-- <span class="_2K2u4"></span>
                        <div class="_2K2u4"></div> -->

                        <!-- main msg area -->
                        <div class="main-text-msg-area">
                            <div class="vsblty-vsbl copyable-area">
                                <!-- page down button -->
                                <div class="page_down">
                                    <span>
                                        <div role="button" tabindex="0" id = "page_down_btn"
                                            class="page_down_btn_gray page_down_btn_geen" data-tab="7"
                                            style="transform: scaleX(1) scaleY(1); opacity: 1;">
                                            <!-- <span class="_38VQ8"></span> -->
                                            <span data-testid="down" data-icon="down">
                                                <svg viewBox="0 0 19 20" width="19" height="20" class="">
                                                    <path fill="currentColor"
                                                        d="M3.8 6.7l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                    </span>
                                </div>
                                <div class="chat-container" tabindex="0">
                                    <div class="chat-container-spacer"></div>

                                    @yield('chat_items')

                                    <div hidden="" style="display: none;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="VjtCX" style="height: 0px;"></div> -->
                        <!-- main foot area - text writer area -->
                        <footer class="main-text-typing-area">
                            <!-- @yield('text_typing_area') -->
                            <div class="vsblty-vsbl copyable-area">
                                <div>
                                    <span>
                                        <div class="main-text-typing-container">
                                            <div class="main-text-typing-smily-area main-text-typing-smily-area-view">
                                                <div data-state="closed" role="button" class="smiley-btn btn-width">

                                                    <button tabindex="-1" class="smiley-close-btn"
                                                        aria-label="סגירת חלונית" data-tab="10">
                                                        <div>
                                                            <span data-testid="x" data-icon="x" class="">
                                                                <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                                    <path fill="currentColor"
                                                                        d="m19.1 17.2-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </button>

                                                    <button tabindex="-1" class="btn-width emojis-btn" id="smiley-btn-id"
                                                        aria-label="Open emojis panel" data-tab="9"
                                                        style="transform: translateX(0px);">
                                                        <div>
                                                            <span data-testid="smiley" data-icon="smiley" class="">
                                                                <svg viewBox="0 0 24 24" width="24" height="24">
                                                                    <path fill="currentColor"
                                                                        d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                                <div class="file-attach-btn">
                                                    <div class="menu-btn-container">
                                                        <div id="attachment-btn" aria-disabled="false" role="button" tabindex="0"
                                                            class="btns-content" data-tab="9" title="Attach"
                                                            aria-label="Attach">
                                                            <span data-testid="clip" data-icon="clip" class="">
                                                                <svg viewBox="0 0 24 24" width="24" height="24"
                                                                    class="">
                                                                    <path fill="currentColor"
                                                                        d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- msg text write area -->
                                            <div class="msg-text-write-area-wrapper">
                                                <div tabindex="-1" class="msg-text-write-area">
                                                    <div tabindex="-1" class="textbox-container textbox">
                                                        <div class="textbox-placeholder" id="textbox_placeholde" style="visibility: visible">
                                                            Type a message </div>
                                                        <div id="main_msg_textbox" title="Type a message" role="textbox"
                                                            class="textbox-input main-textbox-input copyable-text selectable-text"
                                                            contenteditable="true" data-tab="9" dir="ltr"
                                                            spellcheck="true">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Voice message button -->
                                            <div class="voice-msg-btn-wrapper">
                                                <button class="voice-msg-btn" aria-label="Voice message" data-tab="11">
                                                    <span data-testid="ptt" data-icon="ptt" class="">
                                                        <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                            <path fill="currentColor"
                                                                d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>


                            <!-- text msg action area -->
                            <div class="text_msg_action_area">
                                <div class="text_msg_action_wrapper">

                                    <!-- emoji area -->
                                    <div class="wasap-emoji-area">
                                        <div class="wasap_emoji">
                                            <emoji-picker></emoji-picker>
                                        </div>
                                    </div>

                                     <!-- replay msg preview area -->
                                    <div class="replay_msg_preview_area">
                                        <div style="transform: translateY(0px);" class="">
                                            <div class="replay_msg_preview_wrapper">
                                                <div class="replay_msg_preview_content">

                                                    <!-- get inner html of .relay-container-->
                                                     <!--                                                     
                                                    <div class="relay-container-width">
                                                    ...  
                                                    </div>
                                                    -->
                                                </div>

                                                <div class="close_replay_msg_btn">
                                                    <div role="button" class="close_replay_msg_btn_btn">
                                                        <span data-testid="x" data-icon="x" class="">
                                                            <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                                                <path fill="currentColor"
                                                                    d="m19.1 17.2-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="display: none;" hidden=""></div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </footer>
                        <div hidden="" style="display: none;"></div>
                    </div>
                    <div hidden="" style="display: none;"></div>
                </div>
            </div>
            <div hidden="" style="display: none;"></div>
        </div>
        <div hidden="" style="display: none;"></div>
    @yield('foot_script')
</body>
</html>