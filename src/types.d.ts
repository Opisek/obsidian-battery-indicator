interface BatteryIndicatorSettings {
	mySetting: string;
}

type BatteryStatus = {
    charging: boolean;
    level: number;
};

type IndicatorCallback = (status: BatteryStatus) => void;
type VoidCallback = () => void;