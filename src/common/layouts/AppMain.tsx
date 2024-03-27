import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  styles?: ClassNameValue;
  children: React.ReactNode;
}

export function AppMain({ styles, children, }: Props) {
  const style = {
    default: twJoin([
      `w-full mo-sm:w-full mo-md:w-full mo-md:max-w-[900px] mo-lg:max-w-[900px]`,
      styles,
    ]),
  };

  return (
    <>
      <main className={style.default}>{children}</main>
    </>
  );
}
