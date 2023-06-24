import { CATEGORIES } from "./App";

export const Fact = ({ fact }) => {
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
        <button>
          👍
          <p>{fact.votesinteresting}</p>
        </button>
        <button>
          🤯
          <p>{fact.votesmindblowing}</p>
        </button>
        <button>
          ⛔<p>{fact.votesfalse}</p>
        </button>
      </div>
    </li>
  );
};
