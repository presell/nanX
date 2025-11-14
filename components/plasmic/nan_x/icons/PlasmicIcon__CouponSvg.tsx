/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type CouponSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function CouponSvgIcon(props: CouponSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 30 30"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M13.963 29.025c1.3 1.3 3.415 1.3 4.715 0l10.347-10.353c1.3-1.3 1.3-3.418 0-4.718L16.045.967A3.4 3.4 0 0 0 13.68 0H3.333A3.343 3.343 0 0 0 0 3.334v10.353c0 .884.35 1.734.983 2.35zM7.08 5a2.082 2.082 0 0 1 1.474 3.56A2.082 2.082 0 1 1 5.61 5.612c.39-.391.92-.61 1.472-.61"
        }
      ></path>
    </svg>
  );
}

export default CouponSvgIcon;
/* prettier-ignore-end */
