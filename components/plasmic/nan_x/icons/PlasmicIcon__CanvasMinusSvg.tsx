/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type CanvasMinusSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function CanvasMinusSvgIcon(props: CanvasMinusSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 448 96"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M416 0H32C14.33 0 0 14.33 0 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32"
        }
      ></path>
    </svg>
  );
}

export default CanvasMinusSvgIcon;
/* prettier-ignore-end */
