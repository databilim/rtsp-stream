Stream = require('node-rtsp-stream');
stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://192.168.2.217:554/stream1',
    wsPort: 9999
});
