import { App, PluginSettingTab, Setting } from 'obsidian';
import BatteryIndicatorPlugin from "main";

class BatteryIndicatorSettingsTab extends PluginSettingTab {
	plugin: BatteryIndicatorPlugin;
	callback: IndicatorCallback;

	constructor(app: App, plugin: BatteryIndicatorPlugin, callback: IndicatorCallback) {
		super(app, plugin);
		this.plugin = plugin;
		this.callback = callback;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Show percentage")
			.setDesc("Show the battery percentage in addition to the icon.")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showPercentage)
				.onChange(async (value) => {
					this.plugin.settings.showPercentage = value;
					this.callback();
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Separate charging icon")
			.setDesc("Show separate icons for charging indicator and current battery level.")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.separateChargingIcon)
				.onChange(async (value) => {
					this.plugin.settings.separateChargingIcon = value;
					this.callback();
					await this.plugin.saveSettings();
				}));
	}
}

export function initializeSettings(app: App, plugin: BatteryIndicatorPlugin, callback: IndicatorCallback) {
    plugin.addSettingTab(new BatteryIndicatorSettingsTab(app, plugin, callback));
}