// import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import "./InputSelector";
import { InputSelector, NoteApp } from "./InputSelector";
function App() {
  let [toggle, setToggle] = useState(true);
  return (
    <div className="App h-screen bg-slate-300">
      {/* <header className="App-header mb-4">
        <p>Pick users</p>
      </header> */}
      <button
        className="border-1 px-3 py-2 rounded-full text-sm cursor-pointer border-blue-90 bg-slate-500 hover:bg-slate-400"
        onClick={(_) => setToggle(!toggle)}
      >
        Toggle {toggle}
      </button>
      {toggle ? <InputSelector /> : <NoteApp />}
    </div>
  );
}

export default App;
