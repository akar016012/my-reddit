import { useState } from "react";
import { initialFacts, CATEGORIES } from "./App";
import { Fact } from "./Fact";

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <div>
        <p className="message"> No facts available for this category!</p>
        <p className="message">
          Click on "SHARE A FACT" to add the first one 😉
        </p>
      </div>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own! </p>
    </section>
  );
}

export default FactList;
