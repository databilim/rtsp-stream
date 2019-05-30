
Stream = require('node-rtsp-stream');
const onvif = require('node-onvif')

onvif.startProbe().then((device_info_list) => {
  console.log(device_info_list.length + ' devices were found.');
  // Show the device name and the URL of the end point.

  const arr = [];  
  device_info_list.forEach((info,x) => {
  
    //console.log('- ' + info.urn);
    //console.log('  - ' + info.name);
    //console.log('  - ' + info.xaddrs[0]);

    console.log(info.xaddrs)

  });

  
}).catch((error) => {
  console.error(error);
});
