import { hdAccount } from '@vite/vitejs';

import { mnemonic } from '../config.json';
import server from './server.js';

const myMnemonicAccount = new hdAccount({
    client: server,
    mnemonic: mnemonic || null
});

export default myMnemonicAccount.getAccount({ index: 0 });
