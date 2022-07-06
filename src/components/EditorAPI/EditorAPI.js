import React, { useState } from "react";
require("dotenv").config();
import axios from "axios";

const dictionaryKey = process.env.REACT_APP_DICTIONARY_API_KEY;
const thesaurusKey = process.env.REACT_APP_THESAURUS_API_KEY;

const EditorAPI = () => {
  const [apiItems, setApiItems] = useState("");
  const [dictionaryRequest, setDictionaryRequest] = useState("");
  const [thesaurusRequest, setThesaurusRequest] = useState("");
  const [queryType, setQueryType] = useState("");

  const handleDictionaryChange = (event) => {
    setDictionaryRequest(event.target.value);
  };

  const handleThesaurusChange = (event) => {
    setThesaurusRequest(event.target.value);
  };

  const handleDictionarySubmit = (event) => {
    setQueryType("dictionary");
    setApiItems("");
    event.preventDefault();
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${dictionaryRequest}?key=${dictionaryKey}`
      )
      .then((response) => {
        setApiItems(response.data[0].shortdef);
      })
      .catch((error) => {
        console.log("dictionary error: ", error);
      });
  };

  const handleThesaurusSubmit = (event) => {
    setQueryType("thesaurus");
    setApiItems("");
    event.preventDefault();
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${thesaurusRequest}?key=${thesaurusKey}`
      )
      .then((response) => {
        // setApiItems(response.data[0].shortdef);
        console.log("Thesaurus response: ", response.data[0].meta.syns);
        setApiItems(response.data[0].meta.syns);
        setQueryType("thesaurus");
      })
      .catch((error) => {
        console.log("thesaurus error: ", error);
      });
  };

  return (
    <div className="api-container">
      <div className="dictionary-container">
        <form onSubmit={handleDictionarySubmit}>
          <span>
            <input
              type="text"
              value={dictionaryRequest}
              placeholder=" Search Dictionary..."
              onChange={handleDictionaryChange}
            />
          </span>
          <button className="api-submit-btn" type="submit">
            Submit
          </button>
        </form>
        <form onSubmit={handleThesaurusSubmit}>
          <input
            type="text"
            value={thesaurusRequest}
            placeholder=" Search Thesaurus..."
            onChange={handleThesaurusChange}
          />
          <button className="api-submit-btn" type="submit">
            Submit
          </button>
        </form>
        {apiItems && queryType === "dictionary" && (
          <div className="results-container">
            {apiItems.map((apiItem, index) => {
              return <p key={index}>{apiItem}</p>;
            })}
          </div>
        )}
        {apiItems && queryType === "thesaurus" && (
          <div className="results-container">
            {apiItems.map((apiItem) => {
              return apiItem.map((subItem, index) => {
                return <span key={index}>{subItem} </span>;
              });
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorAPI;
