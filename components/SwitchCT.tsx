import React from "react";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
interface SwitchCTProps {
  checked: boolean;
  handleChangeBg: (c: boolean) => void;
}
const SwitchCT = ({ handleChangeBg, checked }: SwitchCTProps) => {
  return (
    <div>
      <Switch
        checked={checked}
        onChange={(e) => {
          handleChangeBg(e.target.checked);
        }}
        color="warning"
        size="medium"
      />
    </div>
  );
};

export default SwitchCT;
