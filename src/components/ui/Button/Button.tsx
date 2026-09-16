import React from 'react';

import './button.scss';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}: Props) => (
  <button
    type={type}
    className={`ui-button ui-button--${variant} ${className}`.trim()}
    disabled={disabled || loading}
    onClick={onClick}
  >
    {loading ? 'Please wait…' : children}
  </button>
);

export default Button;
