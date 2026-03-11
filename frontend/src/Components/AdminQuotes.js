import React, { useEffect, useState } from "react";

function AdminQuotes() {

  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/quotes")
      .then(res => res.json())
      .then(data => setQuotes(data));
  }, []);

  const deleteQuote = async (id) => {

  await fetch(`http://localhost:5000/api/quotes/${id}`, {
    method: "DELETE"
  });

  setQuotes(quotes.filter(q => q._id !== id));

};

  return (
    <div style={{ padding: "40px" }}>
      <h2>Quotation Requests</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Company</th>
            <th>Date</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Material</th>
            <th>Weight</th>
            <th>Vehicle</th>
          </tr>
          
        </thead>

        <tbody>
          {quotes.map((q, index) => (
            <tr key={index}>
              <td>{q.company}</td>
              <td>{q.date}</td>
              <td>{q.pickup}</td>
              <td>{q.drop}</td>
              <td>{q.material}</td>
              <td>{q.weight}</td>
              <td>{q.vehicleType}</td>
              <td><button onClick={() => deleteQuote(q._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default AdminQuotes;