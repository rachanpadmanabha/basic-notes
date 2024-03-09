import React, { useEffect, useState, useRef } from "react";
import { ImCross } from "react-icons/im";

export const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="flex bg-slate-300">
      <div>
        <h1>Simple Note-taking App</h1>

        <div className="flex flex-col">
          <textarea
            className="p-2 outline-0 border-1 border-black rounded-lg"
            rows="4"
            cols="50"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your note..."
          />
          <br />
          <button
            className="px-3 py-2 border-black bg-green-500 hover:bg-green-400 rounded-full"
            onClick={addNote}
          >
            Add Note
          </button>
        </div>

        <ul>
          {notes.map((note, index) => (
            <li className=" border-1" key={index}>
              {note}
              <button
                className="px-3 py-2 border-black bg-green-500 hover:bg-green-400 rounded-full"
                onClick={() => deleteNote(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const InputSelector = () => {
  let [users, setUsers] = useState([]);
  let [userFilter, setUserFilter] = useState("");
  let [selectedUsers, setSelectedUsers] = useState([]);
  let divRef1 = useRef(null);
  let divRef = useRef(null);
  let inputRef = useRef(null);
  let [clickedOutside, setClickedOutside] = useState(true);
  let handleClickOutside = (event) => {
    if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      divRef1.current &&
      !divRef1.current.contains(event.target)
    ) {
      setClickedOutside(true);
    } else {
      setClickedOutside(false);
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users.sort((el1, el2) => el1.id - el2.id));
      });
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  let handleUserClick = (event, elem) => {
    setSelectedUsers([...selectedUsers, event]);
    let filteredUserList = [...users].filter((el) => el.id !== event.id);
    setUsers(filteredUserList);
    setUserFilter("");
    handleClickOutside(event);
  };

  let handleCrossClick = (event, elem) => {
    setSelectedUsers([...selectedUsers].filter((el) => el.id !== event.id));
    setUsers([...users, event].sort((el1, el2) => el1.id - el2.id));
    handleClickOutside(event);
  };

  let handleOnChange = (event) => {
    let value = event.target.value;
    setUserFilter(value);
  };

  return (
    <>
      <div
        ref={divRef}
        className="flex w-fit m-10 mb-0 border-b-2 border-blue-900 cursor-pointer bg-slate-300"
      >
        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((elem) => (
            <div
              key={elem.id}
              className="flex cursor-default m-2 h-fit w-max h- border-2 rounded-full border-black p-1 bg-slate-500 content-center hover:bg-slate-400"
            >
              <img
                src={elem.image}
                alt="not found"
                className="w-8 h-8 rounded-full border-2 border-black"
              />
              <div className="flex mx-1 mt-1">
                {elem.firstName + " " + elem.lastName}
              </div>
              <div
                className="flex mt-2 mx-2 cursor-pointer"
                onClick={(_) => handleCrossClick(elem)}
              >
                <ImCross />
              </div>
            </div>
          ))}
          <input
            ref={inputRef}
            placeholder="Enter user name here"
            className="flex p-2 outline-0 bg-slate-300"
            name="userSelector"
            onChange={handleOnChange}
            value={userFilter}
          />
        </div>
      </div>
      {!clickedOutside ? (
        <div
          ref={divRef1}
          className="w-1/2 max-h-[500px]  ml-10 overflow-y-scroll shadow-2xl"
        >
          {users
            .filter((el) => {
              let name = el.firstName + el.lastName;
              return name.includes(userFilter) || el.email.includes(userFilter);
            })
            .map((elem) => {
              return (
                <div
                  key={elem.id}
                  className="flex border-2 border-black p-2 bg-slate-500 content-center cursor-pointer hover:bg-slate-400"
                  onClick={(_) => handleUserClick(elem)}
                >
                  <img
                    src={elem.image}
                    alt="not found"
                    className="w-10 h-10 rounded-full border-2 border-black"
                  />
                  <div className="flex ml-2 mt-2">
                    {elem.firstName + " " + elem.lastName}
                  </div>
                  <div className="flex ml-2 mt-3 text-sm">{elem.email}</div>
                </div>
              );
            })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
