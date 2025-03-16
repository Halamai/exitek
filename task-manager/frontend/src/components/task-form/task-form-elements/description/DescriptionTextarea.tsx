import React from 'react';

interface DescriptionTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionTextarea: React.FC<DescriptionTextareaProps> = ({
  value,
  onChange,
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Description"
      required
    ></textarea>
  );
};

export default DescriptionTextarea;
