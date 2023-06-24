import "./style.css";
import CategoryFilter from "./CategoryFilter.js";
import NewFactForm from "./NewFactForm";
import FactList from "./FactList";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Loader } from "./Loader";
export const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

export const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  // 1. Define state varible
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [factCategory, setFactCategory] = useState("all");

  // fetch data from supabase
  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      // build the query
      let query = supabase.from("facts").select("*");

      if (factCategory !== "all") {
        query = query.eq("category", factCategory);
      }

      const { data: facts, error } = await query
        .order("votesinteresting", {
          ascending: false,
        })
        .limit(1000);

      // Handle any errors during fetch
      if (!error) setFacts(facts);
      else alert(`Error : ${error.message}`);
      setIsLoading(false);
    }
    getFacts();
  }, [factCategory]);

  return (
    <div>
      {/* Header  */}
      <header className="header">
        <div className="logo">
          <img src="donut.png" alt="Chat app logo" />
          <h1>My Reddit App</h1>
        </div>
        <button
          className="btn btn-large"
          id="share-button"
          onClick={() => {
            // 3. update state variable
            setShowForm((show) => !show);
          }}
        >
          {showForm ? "Close" : "Share a fact"}
        </button>
      </header>
      {/* 2. use state variable */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setFactCategory={setFactCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} />}
      </main>
    </div>
  );
}

export default App;
