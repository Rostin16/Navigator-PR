import { useEffect, useState } from "react";

function Form2() {
  let [student, setStudent] = useState({ name: "", email: "", hobby: [] });
  let [list, setList] = useState([]);
  let [index, setIndex] = useState(-1);
  let [error, setError] = useState({});
  let [hobby, setHobby] = useState([]);
  let [search, setSearch] = useState('');
  let [symbol, setSymbol] = useState('');
  


  
  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem('studentList')) || [];
    setList(oldList);
  }, []);

  let handleClick = (e) => {
    e.target.style.fontSize = "38px";
    e.target.style.color = "red";
  }

  let handleInput = (e) => {
    let { name, value } = e.target;
    let newHobby = [...hobby];
    if (name === 'hobby') {
      if (e.target.checked) {
        newHobby.push(value);
      } else {
        let pos = newHobby.findIndex((v) => v === value);
        newHobby.splice(pos, 1);
      }
      value = newHobby;
    }
    setHobby(newHobby);
    setStudent({ ...student, [name]: value });
  }

  let dataValidation = () => {
    let tempError = {};
    if (!student.name) tempError.name = "Name is required.";
    if (!student.email) tempError.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(student.email)) tempError.email = "Invalid Email.";
    
    setError(tempError);
    return Object.keys(tempError).length === 0;
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!dataValidation()) return; // Only proceed if validation passes

    let newList;
    
    if (index !== -1) {
      list[index] = student;
      newList = [...list];
      setIndex(-1);
    } else {
      newList = [...list, student];
    }
    
    setList(newList);
    localStorage.setItem('studentList', JSON.stringify(newList));
    setStudent({ name: "", email: "", hobby: [] });
    setHobby([]);
  }

  let deleteData = (pos) => {
    list.splice(pos, 1);
    let newList = [...list];
    setList(newList);
    localStorage.setItem('studentList', JSON.stringify(newList));
  }

  let editData = (pos) => {
    let editStud = list[pos];
    setStudent(editStud);
    setIndex(pos);
    setHobby(editStud.hobby);
  }

  let handleSearch = (e) => {
    setSearch(e.target.value);
  }

  let sortBy = (type) => {
    let newlist = [];
    if (type === 'name') {
      if (symbol === '' || symbol === '^') {
        newlist = list.sort((a, b) => b.name.localeCompare(a.name));
        setSymbol('v');
      } else {
        newlist = list.sort((a, b) => a.name.localeCompare(b.name));
        setSymbol('^');
      }
    } else if (type === 'email') {
      if (symbol === '' || symbol === '^') {
        newlist = list.sort((a, b) => b.email.localeCompare(a.email));
        setSymbol('v');
      } else {
        newlist = list.sort((a, b) => a.email.localeCompare(b.email));
        setSymbol('^');
      }
    }
    setList(newlist);
  }

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px", cursor: "pointer", color: "darkblue" }} onClick={(e) => handleClick(e)}>
        Student Registration
      </h2>
      <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={(e) => handleSubmit(e)}>
        <table style={{ border: "1px solid #ddd", padding: "10px", width: "400px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>Name</td>
              <td style={{ padding: "10px" }}>
                <input type="text" name="name" value={student.name} onChange={(e) => handleInput(e)} style={{ width: "100%" }} />
                {error.name && <span style={{ color: "red" }}>{error.name}</span>}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Email</td>
              <td style={{ padding: "10px" }}>
                <input type="text" name="email" value={student.email} onChange={(e) => handleInput(e)} style={{ width: "100%" }} />
                {error.email && <span style={{ color: "red" }}>{error.email}</span>}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Hobby</td>
              <td style={{ padding: "10px" }}>
                {["dance", "music", "karate", "yoga"].map(hobbyItem => (
                  <label key={hobbyItem} style={{ marginRight: "10px" }}>
                    <input
                      type="checkbox"
                      name="hobby"
                      value={hobbyItem}
                      onChange={handleInput}
                      checked={hobby.includes(hobbyItem)}
                    />
                    {hobbyItem}
                  </label>
                ))}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center", padding: "10px" }}>
                <input type="submit" value={index !== -1 ? "Edit Data" : "Add Data"} style={{ padding: "5px 15px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label htmlFor="">Search:</label>
        <input type="text" placeholder="Search by name or email" onChange={handleSearch} style={{ padding: "5px", width: "50%", borderRadius: "5px", border: "1px solid #ddd" }} />
      </div>
      <table style={{ margin: "20px auto", borderCollapse: "collapse", width: "80%", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ddd", padding: "10px" }}>
              <button onClick={() => sortBy('name')} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                Name {symbol}
              </button>
            </th>
            <th style={{ borderBottom: "2px solid #ddd", padding: "10px" }}>
              <button onClick={() => sortBy('email')} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                Email {symbol}
              </button>
            </th>
            <th style={{ borderBottom: "2px solid #ddd", padding: "10px" }}>Hobby</th>
            <th style={{ borderBottom: "2px solid #ddd", padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.filter((val) => {
            if (search === '') return val;
            return val.name.toLowerCase().includes(search.toLowerCase()) || val.email.toLowerCase().includes(search.toLowerCase());
          }).map((v, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{v.name}</td>
              <td style={{ padding: "10px" }}>{v.email}</td>
              <td style={{ padding: "10px" }}>{v.hobby ? v.hobby.join(', ') : "No Hobby"}</td>
              <td style={{ padding: "10px" }}>
                <button onClick={() => deleteData(i)} style={{ marginRight: "5px", padding: "5px", background: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                <button onClick={() => editData(i)} style={{ padding: "5px", background: "#008CBA", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Form2;
