import React, { ChangeEvent } from 'react';

interface TextInputProps {
  id: string;
  loading: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

export default function TextInput ({ id, loading, ...rest }: TextInputProps) {
  return (
    <input
      id={id}
      autoComplete="off"
      type="text"
      disabled={loading}
      {...rest}
    />
  );
}
