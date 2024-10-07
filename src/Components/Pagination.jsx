
import { useEffect, useState } from 'react';


function Pagination() {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(list.length / itemsPerPage);

  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem('user')) || [];
    setList(oldList);
  }, []);

  let handleChange = (e) => {
    let { name, value } = e.target;
    let newValue = { ...user, [name]: value };
    setUser(newValue);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.email) { // Basic validation
      let newList = [...list, user];
      setList(newList);
      localStorage.setItem('user', JSON.stringify(newList));
      setUser({});
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <table style={{ margin: 'auto', border: '1px solid #ddd', padding: '15px', width: '300px', borderRadius: '5px' }}>
          <caption style={{ marginBottom: '10px' }}>
            <h2>Add User Data</h2>
          </caption>
          <tbody>
            <tr>
              <td style={{ paddingRight: '10px', textAlign: 'right' }}>Name:</td>
              <td><input type="text" name="name" value={user.name || ''} onChange={handleChange} style={{ width: '100%' }} /></td>
            </tr>
            <tr>
              <td style={{ paddingRight: '10px', textAlign: 'right' }}>Email:</td>
              <td><input type="text" name="email" value={user.email || ''} onChange={handleChange} style={{ width: '100%' }} /></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', paddingTop: '10px' }}>
                <input type="submit" value="Submit" style={{ padding: '5px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <table border={1} style={{ margin: '20px auto', borderCollapse: 'collapse', width: '80%', textAlign: 'center' }}>
        <caption style={{ marginBottom: '10px' }}>
          <h2>User Data</h2>
        </caption>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map((val, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{val.name}</td>
                <td style={{ padding: '10px' }}>{val.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        {
          currentPage > 1 &&
          <button onClick={() => setCurrentPage(currentPage - 1)} style={{ padding: '5px 10px', marginRight: '5px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Prev
          </button>
        }
        {
          [...Array(totalPage)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                padding: '5px 10px',
                marginRight: '5px',
                background: currentPage === index + 1 ? '#4CAF50' : '#ddd',
                color: currentPage === index + 1 ? 'white' : 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {index + 1}
            </button>
          ))
        }
        {
          currentPage < totalPage &&
          <button onClick={() => setCurrentPage(currentPage + 1)} style={{ padding: '5px 10px', marginLeft: '5px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Next
          </button>
        }
      </div>
    </div>
  );
}

export default Pagination;
