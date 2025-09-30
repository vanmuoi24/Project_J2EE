import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, style, className }) => {
  return (
    <div
      className={className}
      style={{
        width: 1200,
        margin: "0 auto",
        paddingInline: 24,
        maxWidth: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
