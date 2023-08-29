import { useState } from "react";
import { CATEGORIES } from "./App";
import { supabase } from "./supabase";

export const Fact = ({ fact, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  async function handleVote(buttonType) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [buttonType]: fact[buttonType] + 1 })
      .eq("id", fact.id)
      .select();
    console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    setIsUpdating(false);
  }

  async function handleDelete() {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .delete()
      .eq("id", fact.id);
    if (!error) window.location.reload();
    setIsUpdating(false);
  }

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesinteresting")}
          disabled={isUpdating}
        >
          👍
          <p>{isUpdating ? ".." : fact.votesinteresting}</p>
        </button>
        <button
          onClick={() => handleVote("votesmindblowing")}
          disabled={isUpdating}
        >
          🤯
          <p>{isUpdating ? ".." : fact.votesmindblowing}</p>
        </button>
        <button onClick={() => handleVote("votesfalse")} disabled={isUpdating}>
          ⛔<p>{isUpdating ? ".." : fact.votesfalse}</p>
        </button>
        <button onClick={() => handleDelete()}>
          ❌<p>{isUpdating ? ".." : ""}</p>
        </button>
      </div>
    </li>
  );
};
