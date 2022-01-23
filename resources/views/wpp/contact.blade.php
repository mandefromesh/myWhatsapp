@extends('layouts.main')

@section('users_list')
<div aria-label="Chat list"  class="users-group-list-container users-group-list-container-mrg" role="grid"
    aria-rowcount="3" style="height: 216px;">
    <!-- user/groups item 1-->

    <!-- user/groups item 1-->
    <div class="users-group-list-item"
        style="z-index: 0; transition: none 0s ease 0s; height: 72px; transform: translateY(0px);">
        <div tabindex="0" aria-selected="true" role="row">
            <div data-testid="cell-frame-container"
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
                            <!-- <img
                                src="https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F157350221_347781573489889_7142572979777296550_n.jpg%3Fccb%3D11-4%26oh%3Dd47d5b0b09ccef210eb3a7ce065d3dd5%26oe%3D61DE4355&amp;t=s&amp;u=120363020803854156%40g.us&amp;i=1641567924&amp;n=h5DPqsWXvl1i5HmGoEHfPyJbVQzhXPsUH7%2F%2BM%2FTMi%2FE%3D"
                                alt="" draggable="false" class="user-real-img user-real-img-opcty-1 vsblty-vsbl"
                                style="visibility: visible;"> -->
                        </div>
                    </div>
                </div>
                <!-- user/groups name status -->
                <div class="users-group-name-wrapper">
                    <div role="gridcell" aria-colindex="2"
                        class="users-group-name-time-grid">
                        <div class="users-group-name-content">
                            <span dir="auto" title="קבוצה אמיר בדיקה"
                                class="user-name-txt">קבוצה
                                אמיר בדיקה
                            </span>
                        </div>
                        <div class="users-group-counter-content">yesterday</div>
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
                                <div class="users-group-unread-msg-counter"
                                    style="transform: scaleX(1) scaleY(1); opacity: 1;">
                                    <span class="unread-msg-counter"
                                        aria-label="1 unread message">1</span>
                                </div>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- user/groups item 2-->
    
</div>
@endsection


@section('foot_script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script type="text/javascript">
        // function getQrCode() {
        //     $.ajaxSetup({
        //         headers: {
        //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        //         }
        //     });

        //     $.ajax({
        //         type:'POST',
        //         url:'/wpp/getqrcode',
        //         // data:'_token = <?php echo csrf_token() ?>',
        //         success:function(data) {
        //             //$("#msg").html(data.msg);
        //             //console.log(data);
        //             if(data != "" && data !== null){
        //                 try{
        //                     var jsonData = data.response;//JSON.parse(data)
        //                     var data_status = jsonData.status;
        //                     var qrcode = jsonData.qrcode;
        //                     //console.log("conn_status: ", data.conn_status);
        //                     if(data.conn_status && data.conn_status.status == true){
        //                         window.location.href = "/home";
        //                     }else{
        //                         if(data_status == "QRCODE"){
        //                             $("#qrcode-container img").attr("src", qrcode)
        //                         }
        //                     }
        //                 }catch(e){
        //                     console.log("error parsing data: ", JSON.stringify(e));
        //                 }
        //             }
        //         }
        //     });
        // }
        // getQrCode();
        // setInterval(function () {
        //     getQrCode();
        // }, 5000);
</script>
@endsection