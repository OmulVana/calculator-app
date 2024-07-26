import { useState } from "react";
import Header from "./components/Header";
import Results from "./components/Results";
import UserInput from "./components/UserInput";

function App() {
  const [results, setResults] = useState([]);

  const handleResultsUpdate = (newResults) => {
    setResults(newResults);
  };
  return (
    <>
      <Header />
      <UserInput onResultsUpdate={handleResultsUpdate} />
      <Results results={results} />
    </>
  )
}
export default App
