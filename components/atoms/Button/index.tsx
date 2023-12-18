import React from "react";
import { useMemo } from "react";

type ButtonProps = {
  title?: string;
  full?: boolean;
  onClick?: () => void;
} & React.PropsWithChildren;

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  children,
  full,
}) => {
  const classes = useMemo<string>(() => {
    const cls = ["custom-button"];
    full && cls.push("full");
    return cls.join(" ");
  }, [full]);
  return (
    <button onClick={onClick} className={classes}>
      {title}
    </button>
  );
};
