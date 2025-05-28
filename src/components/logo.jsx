import React from "react";
import Image from "next/image";

const Logo = ({ src = "/logo.png", alt = "logo", width = 48, height = 48, className = "" }) => {
  return (
    <div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`p-4 rounded-xl ${className}`}
      />
    </div>
  );
};

export default Logo;