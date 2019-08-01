<template>
    <div>
        <div>Current Height: {{ height }}</div>
        
        <div>Account Address: {{ address }}</div>

        <div>Already start to auto receive tx</div>

        <div>Balance</div>
        <ul v-if="balance && balance.tokenBalanceInfoMap">
            <li v-for="(b, i) in balance.tokenBalanceInfoMap" :key="i">
                <span>{{ b.tokenInfo.tokenSymbol }} (decimals: {{ b.tokenInfo.decimals }}): </span>
                <span>{{ b.totalAmount }}</span>
            </li>
        </ul>

        <div>Unreceived</div>
        <ul v-if="unreceived && unreceived.tokenBalanceInfoMap">
            <li v-for="(b, i) in unreceived.tokenBalanceInfoMap" :key="i">
                <span>{{ b.tokenInfo.tokenSymbol }}: </span>
                <span>{{ b.totalAmount }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import server from './server.js';
import account from './account';
import { setTimeout } from 'timers';

let balanceTimer = null;

export default {
    created() {
        server.ledger.getSnapshotChainHeight().then((height) => {
            this.height = height;
        });

        account.activate();
        this.startLoopBalance()
    },
    destroyed() {
        this.stopLoopBalance();
        account.freeze();
    },
    data() {
        return {
            height: '',
            address: account.address,
            balance: null,
            unreceived: null
        }
    },
    methods: {
        startLoopBalance() {
            this.stopLoopBalance();
            
            const timeHandler = () => {
                balanceTimer = setTimeout(() => {
                    this.balance = account.balance ? account.balance.balance : null;
                    this.unreceived = account.balance ? account.balance.onroad : null;
                    timeHandler();
                }, 2000);
            };
            timeHandler();
        },
        stopLoopBalance() {
            balanceTimer && clearTimeout(balanceTimer);
            balanceTimer = null;
        }
    }
}
</script>
