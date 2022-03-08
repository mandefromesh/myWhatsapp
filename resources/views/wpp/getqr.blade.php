@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('QRCODE image') }}</div>

                <div class="card-body">
                    <div class="m-1" id="qrcode-container">
                        <img src="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="overlay"></div>
</div>
@endsection

@section('head_style')
<style>
    .overlay{
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
    body.loading .overlay{
        display: block;
    }
</style>
@endsection

@section('foot_script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script type="text/javascript">
        $(document).on({
            ajaxStart: function(){
                $("body").addClass("loading"); 
            },
            ajaxStop: function(){ 
                $("body").removeClass("loading"); 
            }    
        });
        function getQrCode() {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                type:'POST',
                url:'/wpp/getqrcode',
                // data:'_token = <?php echo csrf_token() ?>',
                success:function(data) {
                    //$("#msg").html(data.msg);
                    //console.log(data);
                    if(data != "" && data !== null){
                        try{
                            var jsonData = data.response;//JSON.parse(data)
                            var data_status = jsonData.status;
                            var qrcode = jsonData.qrcode;
                            //console.log("conn_status: ", data.conn_status);
                            if(data.conn_status && data.conn_status.status == true){
                                window.location.href = "/home";
                            }else{
                                if(data_status == "QRCODE"){
                                    $("#qrcode-container img").attr("src", qrcode)
                                }
                            }
                        }catch(e){
                            console.log("error parsing data: ", JSON.stringify(e));
                        }
                    }
                }
            });
        }
        getQrCode();
        setInterval(function () {
            getQrCode();
        }, 3000);
</script>
@endsection