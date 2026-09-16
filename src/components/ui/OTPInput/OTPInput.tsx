import React, { useRef } from 'react';

import './otpInput.scss';

type Props = {
  length: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
};

const sanitizeDigits = (value: string, length: number) =>
  value.replace(/\D/g, '').slice(0, length);

export const OTPInput = ({
  length,
  value,
  onChange,
  disabled = false,
  autoFocus = false,
}: Props) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? '');

  const updateValue = (nextValue: string) => {
    onChange(sanitizeDigits(nextValue, length));
  };

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const handleChange = (index: number, nextDigit: string) => {
    const sanitized = sanitizeDigits(nextDigit, 1);
    const nextDigits = [...digits];
    nextDigits[index] = sanitized;
    const nextValue = nextDigits.join('');
    updateValue(nextValue);

    if (sanitized && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text');
    updateValue(pasted);

    const nextLength = sanitizeDigits(pasted, length).length;
    focusInput(Math.min(nextLength, length - 1));
  };

  return (
    <div className="ui-otp-input">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={element => {
            inputRefs.current[index] = element;
          }}
          className="ui-otp-input__slot"
          type="text"
          inputMode="numeric"
          autoComplete={length === 6 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          aria-label={`Digit ${index + 1}`}
          onChange={event => handleChange(index, event.target.value)}
          onKeyDown={event => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={event => event.currentTarget.select()}
        />
      ))}
    </div>
  );
};

export default OTPInput;
