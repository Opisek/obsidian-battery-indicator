interface BatteryIndicatorSettings {
	thresholds: number[];
    showPercentage: boolean;
    separateChargingIcon: boolean;
}

type BatteryStatus = {
    charging: boolean;
    level: number;
};

type IndicatorCallback = (status?: BatteryStatus) => void;
type VoidCallback = () => void;