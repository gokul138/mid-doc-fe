import React, { useState } from 'react';
import Select from 'react-select';

const MultiSelectComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: '1', label: 'Sheet_1' },
    { value: '2', label: 'Sheet_2' },
    { value: '3', label: 'Sheet_3' },
    { value: '4', label: 'Sheet_4' },
    { value: '5', label: 'Sheet_5' },
  ];

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <h2>Select Sheets</h2>
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
      />
      <div>
      </div>
    </div>
  );
};

export default MultiSelectComponent;
