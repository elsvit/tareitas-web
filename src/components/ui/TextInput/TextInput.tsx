import React from 'react';

import './textInput.scss';

type Props = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password';
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  maxLength?: number;
  disabled?: boolean;
};

export const TextInput = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  inputMode,
  maxLength,
  disabled = false,
}: Props) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="ui-text-input" htmlFor={inputId}>
      <span className="ui-text-input__label">{label}</span>
      <input
        id={inputId}
        className="ui-text-input__field"
        type={type}
        value={value}
        onChange={event => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        disabled={disabled}
      />
    </label>
  );
};

export default TextInput;
