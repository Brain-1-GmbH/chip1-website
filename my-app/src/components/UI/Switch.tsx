import SwitchFromLib from "react-switch";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  switchConfigs?: {
    uncheckedIcon?: boolean;
    checkedIcon?: boolean;
    width?: number;
    height?: number;
    handleDiameter?: number;
    borderRadius?: number;
    offColor?: string;
    offHandleColor?: string;
    onColor?: string;
    onHandleColor?: string;
  };
  testId?: string;
}

export const Switch = ({
  checked,
  onChange,
  switchConfigs,
  testId,
}: SwitchProps) => {
  const switchConfig = {
    uncheckedIcon: false,
    checkedIcon: false,
    width: 40,
    height: 20,
    handleDiameter: 16,
    borderRadius: 16,
    offColor: "#C1C1C4",
    offHandleColor: "#FFFFFF",
    onColor: "#3F4451",
    onHandleColor: "#FFFFFF",
  };

  if (switchConfigs) {
    Object.assign(switchConfig, switchConfigs);
  }

  return (
    <SwitchFromLib
      checked={checked}
      onChange={onChange}
      {...switchConfig}
      data-testid={testId}
    />
  );
};
