@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('QRCODE image') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <div class="m-1" id="qrcode-container">
                        <img src="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection


@section('foot_script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script type="text/javascript">
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
        }, 5000);
</script>
@endsection