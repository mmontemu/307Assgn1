// src/MyApp.js
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';
function MyApp() {
  const [characters, setCharacters] = useState([]);
  
    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
          });
        setCharacters(updated);
      removeUser(characters[index])
        .then((res) => {
          if (res.status != 204 )
          throw new Error("No Data!");})
        .catch((error) => {
          console.log(error);
        })
    }
    function updateList(person) { 
      postUser(person)
        .then((res) => {
          if (res.status != 201 )
          throw new Error("No Data!");})
        .then(() => setCharacters([...characters, person]))
        .catch((error) => {
          console.log(error);
        })
    }

    
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function removeUser(person) {
      const promise = fetch("Http://localhost:8000/users/" + person._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .then(response => response.json())
        .catch((error) => { console.log(error); });
    }, [] );

  return (
    <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
  );
}
export default MyApp;