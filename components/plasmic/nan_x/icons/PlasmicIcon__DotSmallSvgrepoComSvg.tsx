/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type DotSmallSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function DotSmallSvgrepoComSvgIcon(
  props: DotSmallSvgrepoComSvgIconProps
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

      <path
        fill={"currentColor"}
        d={"M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5"}
      ></path>
    </svg>
  );
}

export default DotSmallSvgrepoComSvgIcon;
/* prettier-ignore-end */
