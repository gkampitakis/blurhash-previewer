import React, { ChangeEvent, useState, useRef } from 'react';
import { TextInput } from '../General';
import { Timeout } from '../../utils/';
import { BiInfoCircle } from 'react-icons/bi';
import { ComponentsTooltip } from '../General/Tooltips';

interface ComponentsInputProps {
  componentX: number;
  componentY: number;
  loading: boolean;
  changeComponent: (value: number, type: "X" | "Y") => void;
}

export default function ComponentsInput ({ componentX, componentY, loading, changeComponent }: ComponentsInputProps) {
  const debouncerY = useRef<Timeout | undefined>(undefined);
  const debouncerX = useRef<Timeout | undefined>(undefined);


  const [x, setX] = useState('4');
  const [y, setY] = useState('4');
  const [bouncingX, setBouncingX] = useState(false);
  const [bouncingY, setBouncingY] = useState(false);
  const [validX, setValidX] = useState(true);
  const [validY, setValidY] = useState(true);
  const components = {
    X: {
      debouncer: debouncerX,
      setLoading: setBouncingX,
      setValid: setValidX,
      isValid: validX,
      setValue: setX,
      value: x
    },
    Y: {
      debouncer: debouncerY,
      setLoading: setBouncingY,
      setValid: setValidY,
      isValid: validY,
      setValue: setY,
      value: y
    }
  };

  function handleComponentChange (e: ChangeEvent<HTMLInputElement>, type: 'X' | 'Y') {
    const input = e.target.value;
    const component = components[type];
    component.setValue(input);

    if (input === '') return;
    let valid = true;

    let value = Number(e.target.value);
    component.setLoading(true);

    if (value > 9 || value < 1 || Number.isNaN(value)) {
      valid = false;
      component.setValid(valid);
    } else {
      component.setValid(valid);
    }

    if (component.debouncer.current) {
      clearTimeout(component.debouncer.current);
    }

    component.debouncer.current = setTimeout(() => {
      component.setLoading(false);
      if (valid)
        changeComponent(value, type);
    }, 1000);
  }

  return (
    <div className="components">
      <ComponentsTooltip />
      <label>Components <BiInfoCircle data-tip data-for="components" /></label>
      <div className="loading-input">
        <TextInput
          id="componentX"
          loading={loading}
          value={x}
          className={validX ? '' : 'invalid'}
          onChange={(e) => handleComponentChange(e, 'X')}
        />
        <div className={`loader ${bouncingX && 'visible'}`}>
          <div className="bar"></div>
        </div>
      </div>
      <p>x</p>
      <div className="loading-input">
        <TextInput
          id="componentY"
          value={y}
          loading={loading}
          className={validY ? '' : 'invalid'}
          onChange={(e) => handleComponentChange(e, 'Y')}
        />
        <div className={`loader ${bouncingY && 'visible'}`}>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
}
