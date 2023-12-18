import React, { Children } from "react";

type LabelProps = {
  className?: string;
  label?: string;
} & React.PropsWithChildren;

export const Label: React.FC<LabelProps> = ({ className = "label", children, label }) => {
  return (
    <div className={`label ${className}`}>
      {label && <div className="label">{label}</div>}
      {children}
    </div>
  );
};
