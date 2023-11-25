import React, { useState } from 'react';
import Select from 'react-select';

const customStyles = {
  control: provided => ({
    ...provided,
    // Add your custom control styles here
  }),
  menu: provided => ({
    ...provided,
    zIndex: 1000000000, // Set a high z-index value
  }),
  option: (provided, state) => ({
    ...provided,
    // Add your custom option styles here
  }),
};

const ItemMasterSelectData = ({ itemmasterdata }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = itemmasterdata.map(item => ({ value: item.id, label: item.Item_PartCode }));

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        placeholder="Select PartCode"
        styles={customStyles} // Apply custom styles here
      />
      {/* Rest of your component */}
    </div>
  );
};

export default ItemMasterSelectData;
