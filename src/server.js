import { WS_RPC } from '@vite/vitejs-ws';
import { client } from '@vite/vitejs';

import { wsUrl } from '../config.json';

const wsProvider = new WS_RPC(wsUrl);
const server = new client(wsProvider, function() {
    console.log("Connected");
});

export default server;
