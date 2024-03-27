import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Button } from '@/src/shadcn';

interface Props {
  restoreBlock: () => void;
  resetBlock: () => void;
  styles?: ClassNameValue;
}

export function ItemBottomButtons({ restoreBlock, resetBlock, styles, }: Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <button onClick={restoreBlock}>되돌리기</button>
        <Button size='sm' type='submit'>저장</Button>
        <button onClick={resetBlock}>비우기</button>
      </div>
    </>
  );
}
