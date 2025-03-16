import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  isLoading,
  variant = 'primary',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant}`}
      disabled={isLoading}
    >
      {isLoading ? 'Saving...' : label}
    </button>
  );
};

export default Button;
