/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";

const Button = ({ children, ...props }) => {
  const { disabled, foo } = props;
  return (
    <button
      sx={{
        display: "inline-block",
        textAlign: "center",
        lineHeight: "inherit",
        textDecoration: "none",
        fontSize: "inherit",
        width: ["100%", "100%", "inherit"],
        px: 3,
        py: 2,
        color: "white",
        bg: "secondary",
        border: 0,
        borderRadius: 4,
        ":disabled": {
          bg: "secondary",
          opacity: "0.4",
          cursor: "not-allowed",
        },
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
