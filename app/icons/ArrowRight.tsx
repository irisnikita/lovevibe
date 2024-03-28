// Libraries
import React, {type SVGProps} from 'react';

export const ArrowRight: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0909 7.26601C14.4968 6.8914 15.1294 6.9167 15.504 7.32252L18.7348 10.8225C19.0884 11.2055 19.0884 11.796 18.7348 12.179L15.504 15.6791C15.1294 16.0849 14.4968 16.1102 14.091 15.7356C13.6851 15.361 13.6598 14.7284 14.0344 14.3225L15.716 12.5008L6 12.5008C5.44771 12.5008 5 12.0531 5 11.5008C5 10.9485 5.44771 10.5008 6 10.5008L15.716 10.5008L14.0344 8.67909C13.6598 8.27327 13.6851 7.64061 14.0909 7.26601Z"
        fill="currentColor"
      />
    </svg>
  );
};
