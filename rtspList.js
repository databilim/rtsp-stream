Stream = require('node-rtsp-stream');
const onvif = require('node-onvif')

let device = new onvif.OnvifDevice({
    xaddr: 'http://192.168.2.217:80/onvif/device_service',
    user : 'admin',
    pass : 'admin'
  }); 
  
  // Initialize the OnvifDevice object
  device.init().then(() => {
    // Get the UDP stream URL
    let url = device.getUdpStreamUrl();
    console.log(url);
  }).catch((error) => {
    console.error(error);
  });