import { useState } from "react";
import { CATEGORIES } from "./App";
import validator from "validator";

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  const handleSubmit = (e) => {
    // prevent page to load on submit
    e.preventDefault();
    // Validate the data
    if (text && validator.isURL(source) && category && textLength <= 200) {
      //create fact
      const newFact = {
        id: Math.round(Math.random() * 100),
        text: text,
        source: source,
        category: category,
        votesInteresting: 8,
        votesMindblowing: 3,
        votesFalse: 1,
        createdIn: new Date().getUTCFullYear,
      };
      // add the new fact
      setFacts((facts) => [newFact, ...facts]);
      // reset the field after the post button is clicked
      setText("");
      setSource("");
      setCategory("");
      // close the form
      setShowForm(false);
    }
  };

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source... (https://example.com)"
        value={source}
        onChange={(e) => {
          setSource(e.target.value);
        }}
      />
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="choose">Choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

export default NewFactForm;
