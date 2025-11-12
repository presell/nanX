/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type DotSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function DotSvgIcon(props: DotSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 167 167"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M83.333 0c46.024 0 83.334 37.31 83.334 83.333 0 46.024-37.31 83.334-83.334 83.334S0 129.357 0 83.333 37.31 0 83.333 0"
        }
      ></path>
    </svg>
  );
}

export default DotSvgIcon;
/* prettier-ignore-end */
