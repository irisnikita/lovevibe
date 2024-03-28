// Libraries
import React, {type SVGProps} from 'react';

export const RadioCheck: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 4.99999L4.33333 8.33332L11 1.66666"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
