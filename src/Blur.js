import React from "react";

const Blur = () => (
  <defs>
    <filter id="blur">
      <feGaussianBlur stdDeviation="5" />
    </filter>
  </defs>
);

export default Blur;
