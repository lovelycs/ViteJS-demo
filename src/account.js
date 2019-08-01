import { hdAccount } from '@vite/vitejs';

import { mnemonic } from '../config.json';
import server from './server.js';

let myMnemonicAccount = null;
if (mnemonic) {
    myMnemonicAccount = new hdAccount({
        client: server,
        mnemonic
    });
} else {
    throw new Error('No mnemonic');
}

export default myMnemonicAccount ? myMnemonicAccount.getAccount({ index: 0 }) : null;
