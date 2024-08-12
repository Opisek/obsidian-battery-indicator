import { setIcon } from "obsidian";

import BatteryIndicatorPlugin from "main";

const LEVEL_ICONS = [
    "battery-warning",
    "battery",
    "battery-low",
    "battery-medium",
    "battery-high"
]
const CHARGING_ICON = "battery-charging"
const CHARGING_ICON_ALT = "plug-zap"

class BatteryIndicator {
    plugin: BatteryIndicatorPlugin;
    textElement: HTMLElement;
    iconElement: HTMLElement;
    chargingIconElement: HTMLElement;
    lastStatus: BatteryStatus;

    constructor(plugin: BatteryIndicatorPlugin) {
        this.plugin = plugin;
        const statusBarItem = plugin.addStatusBarItem();
        const wrapper = statusBarItem.createEl("div", { cls: "wrapper" });
        this.textElement = wrapper.createEl("span");
        this.chargingIconElement = wrapper.createEl("span", { cls: "iconSpan" });
        setIcon(this.chargingIconElement, CHARGING_ICON_ALT);
        this.iconElement = wrapper.createEl("span", { cls: "iconSpan" });
    }

    updateIndicator = (status: BatteryStatus = this.lastStatus) => {
        this.lastStatus = status;

        let icon;
        if (status.charging && !this.plugin.settings.separateChargingIcon) icon = CHARGING_ICON;
        else icon = LEVEL_ICONS[determineStep(status.level, this.plugin.settings.thresholds)];
        setIcon(this.iconElement, icon);

        if (status.charging && this.plugin.settings.separateChargingIcon) {
            this.chargingIconElement.removeClass("hidden");
        } else {
            this.chargingIconElement.addClass("hidden");
        }

        if (this.plugin.settings.showPercentage) {
            this.textElement.setText(`${Math.round(status.level * 100)}%`);
            this.textElement.removeClass("hidden");
        } else {
            this.textElement.addClass("hidden");
        }
    }
}


export function initializeIndicator(plugin: BatteryIndicatorPlugin): IndicatorCallback {
    const indicator = new BatteryIndicator(plugin);
    return indicator.updateIndicator;
}

function determineStep(level: number, thresholds: number[]): number {
    for (let i = 0; i <= thresholds.length; i++) {
        if (level < thresholds[i]) return i;
    }
    return thresholds.length;
}