import React, { useState } from "react";

const App = () => {
  const [inputValues, setInputValues] = useState({
    groupTag: "",
    username: "",
    inUrl: "",
    fileExt: "",
    fileType: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [dork, setDork] = useState("");
  const [url, setUrl] = useState("");

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
    let dorkQuery = "";

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

  const resetDork = () => {
    setInputValues({
      groupTag: "",
      username: "",
      inUrl: "",
      fileExt: "",
      fileType: "",
    });
    setSelectedOption("");
    setDork("");
    setUrl("");
  };

  const options = [
    { value: "site", label: "Site" },
    { value: "intext", label: "Intext" },
    { value: "inurl", label: "Inurl" },
    { value: "ext", label: "Ext" },
    { value: "filetype", label: "Filetype" },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-center text-3xl ">
        <span className="text-blue-600 font-extrabold pt-12">Google</span> Dork
        Generator
      </h1>
      <div className="flex flex-col items-center pt-24">
        <div className=" mb-4">
          <label className="block font-semibold mr-2 text-xl">
            Select Option:
          </label>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="border-2 w-full pt-4 border-blue-600 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 dark:text-black"
          >
            <option value="">Select</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedOption && (
            <div className="pt-6 pr-6">
              <label className="block font-semibold ml-2">
                {selectedOption === "ext" ? "File Extension" : "Input"}:{" "}
              </label>
              <input
                type="text"
                name={selectedOption}
                value={inputValues[selectedOption]}
                onChange={handleInputChange}
                placeholder="https://codare.fun"
                className="border-2 border-blue-600 w-full px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 dark:text-black ml-2"
              />
            </div>
          )}
        </div>
        <div className="flex">
          <button
            onClick={generateDork}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg mr-2"
          >
            Generate Dork
          </button>
          <button
            onClick={resetDork}
            className="bg-gray-500 text-white px-4 py-3 rounded-lg"
          >
            Reset Dork
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <h3 className="font-semibold">Dork: {dork}</h3>
        {dork && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-2 outline-none"
          >
            Search on Google
          </a>
        )}
      </div>
    </div>
  );
};

export default App;
