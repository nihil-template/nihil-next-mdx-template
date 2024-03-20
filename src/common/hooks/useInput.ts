'use client';

import { ChangeEvent, useRef, useState } from 'react';

type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface InputProps {
  id: string;
  initValue?: string;
}

export function useInput<T extends FormElements>({ id, initValue, }: InputProps) {
  const [ state, setState, ] = useState<string>(initValue);
  const ref = useRef<T>(null);

  const onChange = (event: ChangeEvent<T>) => {
    setState(event.target.value);
  };

  return {
    data: {
      value: state,
      onChange,
      id,
      ref,
    },
    setState,
  };
}
