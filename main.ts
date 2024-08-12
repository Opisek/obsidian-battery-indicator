import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { initializeIndicator } from 'src/indicator';
import { startPolling } from 'src/polling';
import { initializeSettings } from 'src/settings';

const DEFAULT_SETTINGS: BatteryIndicatorSettings = {
	mySetting: 'default'
}

export default class BatteryIndicatorPlugin extends Plugin {
	settings: BatteryIndicatorSettings;
	stopPolling: VoidCallback;

	async onload() {
		await this.loadSettings();

		const indicatorCallback = initializeIndicator(this);
		this.stopPolling = startPolling(indicatorCallback);
		initializeSettings(this.app, this);
	}

	onunload() {
		this.stopPolling();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}