/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type UserIconSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function UserIconSvgIcon(props: UserIconSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 448 512"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <mask
        id={"LI-nPfcEuZJra"}
        style={{
          maskType: 'luminance"'
        }}
        maskUnits={"userSpaceOnUse"}
        x={"0"}
        y={"0"}
        width={"448"}
        height={"512"}
      >
        <path d={"M448 0H0v512h448V0z"} fill={"#fff"}></path>
      </mask>

      <g mask={"url(#LI-nPfcEuZJra)"}>
        <mask
          id={"LI-nPfcEuZJrb"}
          style={{
            maskType: 'luminance"'
          }}
          maskUnits={"userSpaceOnUse"}
          x={"0"}
          y={"0"}
          width={"448"}
          height={"512"}
        >
          <path d={"M0 0h448v512H0V0z"} fill={"#fff"}></path>
        </mask>

        <g mask={"url(#LI-nPfcEuZJrb)"}>
          <mask
            id={"LI-nPfcEuZJrc"}
            style={{
              maskType: 'luminance"'
            }}
            maskUnits={"userSpaceOnUse"}
            x={"0"}
            y={"80"}
            width={"448"}
            height={"512"}
          >
            <path d={"M448 80H0v512h448V80z"} fill={"#fff"}></path>
          </mask>

          <g mask={"url(#LI-nPfcEuZJrc)"}>
            <path
              d={
                "M224 336c70.7 0 128-57.3 128-128S294.7 80 224 80 96 137.3 96 208s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16-26 0-50.6-5.8-72.9-16h-16.7C60.2 368 0 428.2 0 502.4V544c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
              }
              fill={"#535353"}
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default UserIconSvgIcon;
/* prettier-ignore-end */
