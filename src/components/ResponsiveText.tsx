import React from "react";

const ResponsiveText = ({ children }: { children: string }) => {
  const digitLength = children.length;
  const fontSize = `${Math.max(12, 40 - digitLength * 4)}px`; // Adjust the multiplier and base size as needed

  return (
    <div
      style={{
        fontSize, // Dynamic font size
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveText;
