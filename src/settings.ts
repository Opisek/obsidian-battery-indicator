import { App, PluginSettingTab, Setting } from 'obsidian';
import BatteryIndicatorPlugin from "main";

class BatteryIndicatorSettingsTab extends PluginSettingTab {
	plugin: BatteryIndicatorPlugin;

	constructor(app: App, plugin: BatteryIndicatorPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}

export function initializeSettings(app: App, plugin: BatteryIndicatorPlugin) {
    plugin.addSettingTab(new BatteryIndicatorSettingsTab(app, plugin));
}