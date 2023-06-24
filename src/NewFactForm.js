import { useState } from "react";
import { CATEGORIES } from "./App";
import validator from "validator";
import { supabase } from "./supabase";

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  const handleSubmit = async (e) => {
    // prevent page to load on submit
    e.preventDefault();

    // Validate the data
    if (text && validator.isURL(source) && category && textLength <= 200) {
      // upload fact to the database
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // add the new fact
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

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
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source... (https://example.com)"
        value={source}
        onChange={(e) => {
          setSource(e.target.value);
        }}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        disabled={isUploading}
      >
        <option value="choose">Choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Post"}
      </button>
    </form>
  );
}

export default NewFactForm;
