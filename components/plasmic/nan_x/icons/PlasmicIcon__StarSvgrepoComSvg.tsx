/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type StarSvgrepoComSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function StarSvgrepoComSvgIcon(props: StarSvgrepoComSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      xmlSpace={"preserve"}
      version={"1.0"}
      viewBox={"0 0 64 64"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M63.893 24.277a2 2 0 0 0-1.595-1.343l-19.674-3.006L33.809 1.15a2.002 2.002 0 0 0-3.622 0l-8.815 18.778-19.674 3.007a2.003 2.003 0 0 0-1.13 3.374l14.294 14.657-3.378 20.704a2 2 0 0 0 .822 1.957 1.99 1.99 0 0 0 2.119.116l17.572-9.719 17.572 9.719a1.99 1.99 0 0 0 2.119-.116c.627-.44.946-1.201.822-1.957l-3.378-20.704 14.294-14.657a2 2 0 0 0 .467-2.032"
        }
      ></path>
    </svg>
  );
}

export default StarSvgrepoComSvgIcon;
/* prettier-ignore-end */
