import React from 'react';

const Table = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Num_Comments</th>
          <th>Points</th>

        </tr>
      </thead>
      <tbody>
      { (items.length > 0) ? items.map( (droplet, index) => {
           return (
            <tr key={ index }>
              <td>{ droplet.title }</td>
              <td>{ droplet.author}</td>
              <td>{ droplet.num_comments}</td>
              <td>{ droplet.points }</td>
            </tr>
          )
         }) : <tr><td colSpan="4">Loading...</td></tr> }
        </tbody>
    </table>
  );
}

export default Table