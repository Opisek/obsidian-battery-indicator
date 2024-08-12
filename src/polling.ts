//const MINIMUM_WAITTIME = 1000;
//const MAXIMUM_WAITTIME = 60000;

class BatteryIndicatorPolling {
    batteryStatus: BatteryStatus;
    waittime: number;
    timeout: number;
    callback: IndicatorCallback;

    constructor(callback: IndicatorCallback) {
        this.callback = callback;
        //this.waittime = MINIMUM_WAITTIME;
        this.waittime = 5000;

        (async () => {
            this.batteryStatus = await getCurrentBatteryStatus();
            callback(this.batteryStatus);
            this.schedulePoll();
        })();
    }

    stopPolling() {
        clearTimeout(this.timeout);
    }

    schedulePoll() {
        this.timeout = window.setTimeout(this.poll, this.waittime);
    }

    poll = async () => {
        const previousBatteryStatus = this.batteryStatus;
        this.batteryStatus = await getCurrentBatteryStatus();
        this.callback(this.batteryStatus);

        //const difference = Math.abs(this.batteryStatus.level - previousBatteryStatus.level);

        //if (difference == 0) this.waittime *= 2;
        //else this.waittime /= difference;

        //this.waittime = Math.min(MAXIMUM_WAITTIME, this.waittime);
        //this.waittime = Math.max(MINIMUM_WAITTIME, this.waittime);

        this.schedulePoll();
    }
}

export function startPolling(callback: IndicatorCallback): VoidCallback {
    console.log(callback);
    const poller = new BatteryIndicatorPolling(callback);
    return poller.stopPolling;
}

async function getCurrentBatteryStatus(): Promise<BatteryStatus> {
    // @ts-ignore
    return await window.navigator.getBattery();
}
