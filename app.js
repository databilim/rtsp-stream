Stream = require('node-rtsp-stream');

const onvif = require('node-onvif')

const express = require("express");
const app = express();
const path = require('path');

process.camera = [];
onvif.startProbe().then((device_info_list) => {
  console.log(device_info_list.length + ' devices were found.');
  // Show the device name and the URL of the end point.

  const arr = [];  
  device_info_list.forEach((info,x) => {
    if(x <= 5){

          //console.log('- ' + info.urn);
    //console.log('  - ' + info.name);
    //console.log('  - ' + info.xaddrs[0]);
    arr.push(info.xaddrs[0])
   
    }
  

  });
  //console.log(arr)
    process.camera = arr;
    arr.forEach((onCam,i)=>{
       
            let device = new onvif.OnvifDevice({
                xaddr: onCam,
                user : 'admin',
                pass : 'admin'
            }); 
            
            // Initialize the OnvifDevice object
            device.init().then(() => {
                // Get the UDP stream URL
                let url = device.getUdpStreamUrl();
    
                stream = new Stream({
                    name: 'name',
                    streamUrl: url,
                    wsPort: 9000 + i
                })
    
                console.log("URL :"+url);
            }).catch((error) => {
                console.error(error);
            });

        
       


    })
            

}).catch((error) => {
  console.error(error);
});
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",(req,res)=>{
    console.log( process.camera)
    res.write(`<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
          canvas {
            display: block;
            float: left;
            transform: scale(1);
           transform-origin: 0% 0% 0px;
          }
          .camera{
            display: block;
            margin-left: 10px;
            margin-top: 10px;
            padding: 0px;
            width: 400px;
          }
        </style>
        <title>RTSP STREAMING NODE JS IP CAMERA </title>
       <h1>RTSP STREAMING NODE JS IP CAMERA </h1>

       ${ process.camera.map((can,i)=>{

            return ` <div><canvas class="camera" id="videoCanvas${i}" width="640" height="360"></canvas></div>`
       }).join("") }
       
    
        <script type="text/javascript" src="jsmpeg.js"></script>
        <script type="text/javascript">
    
        ${ process.camera.map((can,i)=>{

            return ` var canvas${i} = document.getElementById('videoCanvas${i}');
                     var ws${i} = new WebSocket("ws://localhost:900${i}")
                     var player${i} = new jsmpeg(ws${i}, {canvas:canvas${i}, autoplay:true,audio:false,loop: true });
            ` 
       }).join("") } 
    
         
     
          
         
          
          
          
     
         
     
    
    
        </script>
    
    <body>
          
    </body>
    </html>`) 

    res.end();
})  

app.listen(3000) 
 
 
 /*
 
stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://192.168.2.202:554/stream1',
    wsPort: 9999
});
 
Stream = require('node-rtsp-stream');
stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://192.168.2.217:554/stream1',
    wsPort: 9998
});

Stream = require('node-rtsp-stream');
stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://192.168.2.205:554/stream1',
    wsPort: 9997
});*/