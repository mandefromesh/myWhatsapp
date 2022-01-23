# https://github.com/wppconnect-team/wppconnect-laravel-client
#Function: Check Connection Session
   # /api/:session/check-connection-session
   	
   if(Session::get('token') and Session::get('session') and Session::get('init')):
       Wppconnect::make($this->url);
       $response = Wppconnect::to('/api/'. Session::get('session').'/check-connection-session')->withHeaders([
   	'Authorization' => 'Bearer '.Session::get('token')
       ])->asJson()->get();
       $response = json_decode($response->getBody()->getContents(),true);
       dd($response);
   endif;




   #Function: Close Session
   # /api/:session/close-session

   if(Session::get('token') and Session::get('session') and Session::get('init')):
       Wppconnect::make($this->url);
       $response = Wppconnect::to('/api/'. Session::get('session').'/close-session')->withHeaders([
   	'Authorization' => 'Bearer '.Session::get('token')
       ])->asJson()->post();
       $response = json_decode($response->getBody()->getContents(),true);
       dd($response);
   endif;



   #Function: Send Message
   # /api/:session/send-message
   	
   if(Session::get('token') and Session::get('session') and Session::get('init')):
       Wppconnect::make($this->url);
       $response = Wppconnect::to('/api/'. Session::get('session').'/send-message')->withBody([
   	'phone' => '5500000000000',
   	'message' => 'Opa, funciona mesmo!'
       ])->withHeaders([
   	'Authorization' => 'Bearer '.Session::get('token')
       ])->asJson()->post();
       $response = json_decode($response->getBody()->getContents(),true);
       dd($response);
   endif;


   #Function: Send File Base64
   # /api/:session/send-file-base64
   	
   if(Session::get('token') and Session::get('session') and Session::get('init')):
       Wppconnect::make($this->url);
       $response = Wppconnect::to('/api/'. Session::get('session').'/send-file-base64')->withBody([
   	'phone' => '5500000000000',
   	'base64' => 'data:image/jpg;base64,' . base64_encode(file_get_contents(resource_path('/img/xpto.jpg')))
       ])->withHeaders([
   	'Authorization' => 'Bearer '.Session::get('token')
       ])->asJson()->post();
       $response = json_decode($response->getBody()->getContents(),true);
       dd($response);
   endif;






