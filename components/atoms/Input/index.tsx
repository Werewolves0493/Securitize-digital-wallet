import React from "react";
import { Label } from "../Label";

type InputProps = {
  className?: string;
  label?: string;
  value: string | number;
  placeholder?: string;
  disabled: boolean;
  type?: "number" | "text";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({
  className,
  label,
  value,
  placeholder,
  disabled=true,
  onChange,
  type = "text",
}) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <Label className={className} label={label}>
      <div className={`custom-input ${className}`}>
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            onChangeInput(e);
          }}
        />
      </div>
    </Label>
  );
};
