import * as React from "react";

// Small inline icons so the library needs no icon package. Not exported from the index.
type IconProps = React.SVGProps<SVGSVGElement>;

function makeIcon(paths: React.ReactNode) {
  return function Icon(props: IconProps) {
    return (
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {paths}
      </svg>
    );
  };
}

export const ChevronDownIcon = makeIcon(<path d="m6 9 6 6 6-6" />);
export const ChevronUpIcon = makeIcon(<path d="m18 15-6-6-6 6" />);
export const ChevronRightIcon = makeIcon(<path d="m9 6 6 6-6 6" />);
export const ChevronLeftIcon = makeIcon(<path d="m15 6-6 6 6 6" />);
export const CheckIcon = makeIcon(<path d="M20 6 9 17l-5-5" />);
export const XIcon = makeIcon(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>,
);
export const MinusIcon = makeIcon(<path d="M5 12h14" />);
export const CircleIcon = makeIcon(<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />);
export const SearchIcon = makeIcon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </>,
);
export const LoaderIcon = makeIcon(<path d="M21 12a9 9 0 1 1-6.22-8.56" />);
