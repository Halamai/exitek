import React from 'react';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Name"
      required
    />
  );
};

export default TitleInput;
