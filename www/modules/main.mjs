import { config } from './config.mjs';
import { utils } from './utils.mjs';




var app = {
    // Application Constructor
    init: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.body.append(utils.init())
        document.title = config.title;
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

app.init();
