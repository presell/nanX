/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type XCircleCloseDeleteSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function XCircleCloseDeleteSvgIcon(
  props: XCircleCloseDeleteSvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
      >
        <path d={"m16 8-4 4m0 0-4 4m4-4L8 8m4 4 4 4"}></path>

        <circle cx={"12"} cy={"12"} r={"10"}></circle>
      </g>
    </svg>
  );
}

export default XCircleCloseDeleteSvgIcon;
/* prettier-ignore-end */
