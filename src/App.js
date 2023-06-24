import "./style.css";
import CategoryFilter from "./CategoryFilter.js";
import NewFactForm from "./NewFactForm";
import FactList from "./FactList";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Loader } from "./Loader";

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
