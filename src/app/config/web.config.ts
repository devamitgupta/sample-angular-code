
const host = window.location.host;
const proto = window.location.protocol;
const wss = 'wss';
let baseUrl = '';
let socketUrl = '';

if (host && host.match('localhost')) {
    baseUrl = 'https:' + '//dev.proxylegalapp.com/';
    socketUrl = wss + ':/dev.proxylegalapp.com/notifications/';
} else {
    baseUrl = proto + '//' + host + '/';
    socketUrl = wss + '://' + host + '/notifications/';
}

export const API_BASE_URL = baseUrl;
export const API_SOCKET_URL = socketUrl;
