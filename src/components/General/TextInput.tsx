import React from 'react';

interface TextInputProps {
  id: string;
  loading: boolean;
  [key: string]: unknown;
}

export default function TextInput ({ id, loading, ...rest }: TextInputProps) {
  return (
    <input
      id={id}
      autoComplete="off"
      disabled={loading}
      {...rest}
      type="text"
    />
  );
}
