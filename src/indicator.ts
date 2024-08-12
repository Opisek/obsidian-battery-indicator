import BatteryIndicatorPlugin from "main";

let statusBarItem: HTMLElement;

export function initializeIndicator(plugin: BatteryIndicatorPlugin): IndicatorCallback {
    statusBarItem = plugin.addStatusBarItem();
    statusBarItem.setText("Battery Indicator");
    return updateIndicator;
}

function updateIndicator(status: BatteryStatus) {
    statusBarItem.setText(`Battery: ${status.level * 100}%, Charging: ${status.charging}`);
}