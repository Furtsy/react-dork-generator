import React, { useState } from 'react';

const App = () => {
  const [inputValues, setInputValues] = useState({
    groupTag: '',
    username: '',
    inUrl: '',
    fileExt: '',
    fileType: '',
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [dork, setDork] = useState('');
  const [url, setUrl] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const generateDork = () => {
    let dorkQuery = '';

    for (const key in inputValues) {
      if (inputValues[key]) {
        const selectedOption = options.find((option) => option.value === key);
        const { value } = selectedOption;
        const query = `${value}:${inputValues[key].trim()} `;
        dorkQuery += query;
      }
    }

    setDork(dorkQuery);
    setUrl(`https://www.google.com/search?q=${encodeURIComponent(dorkQuery)}`);
  };

  const options = [
    { value: 'site', label: 'Site' },
    { value: 'intext', label: 'Intext' },
    { value: 'inurl', label: 'Inurl' },
    { value: 'ext', label: 'Ext' },
    { value: 'filetype', label: 'Filetype' },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Google Dork Generator</h1>
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-4">
          <label className="block font-semibold mr-2">Select Option:</label>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 dark:text-black"
          >
            <option value="">Select</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedOption && (
            <label className="block font-semibold ml-2">
              {selectedOption === 'ext' ? 'File Extension' : 'Input'}:
              <input
                type="text"
                name={selectedOption}
                value={inputValues[selectedOption]}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 dark:text-black ml-2"
              />
            </label>
          )}
        </div>
        <button
          onClick={generateDork}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
        >
          Generate Dork
        </button>
      </div>
      <div className="flex flex-col items-center mt-4">
        <h3 className="font-semibold">Dork: {dork}</h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mt-2"
        >
          Search on Google
        </a>
      </div>
    </div>
  );
};

export default App;
