/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BagSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function BagSvgIcon(props: BagSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 582 660"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        stroke={"currentColor"}
        strokeLinejoin={"round"}
        strokeWidth={"60"}
        d={
          "M190.667 230h-71.762c-16.295 0-30.201 11.78-32.88 27.853L30.47 591.187C27.083 611.503 42.75 630 63.35 630h454.634c20.6 0 36.267-18.497 32.88-38.813l-55.553-333.334C492.631 241.78 478.724 230 462.431 230h-71.764m-200 0h200m-200 0c-11.111-44.444-33.333-200 100-200 133.334 0 111.11 155.556 100 200"
        }
      ></path>
    </svg>
  );
}

export default BagSvgIcon;
/* prettier-ignore-end */
