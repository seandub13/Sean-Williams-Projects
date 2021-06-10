import React, { Component } from 'react';
 
var API = 'https://hn.algolia.com/api/v1/search?query=redux&page='; //this is the name of the url of the api excluding the pagenumber at the end
var pnum = -1; //this is turned into 0 when the first fetch takes place allowing me to reuse the function
var snum = pnum.toString(); //turns the int into a srting
 
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      hits: [],
    };
  }
 
  componentDidMount() {
    this.fetchData();
  }
  //this is the function that gets the data and is also reused again to get to the next page when the user clicks more
  //(this works because the variable is orginally set to -1 which turns into 0 at the first attempt to load)
  fetchData = () => {
    pnum = pnum+1;
    snum = pnum.toString();
    fetch(API+snum) //combines the url and page number
     .then(response => response.json())
    .then(data => this.setState({ hits: data.hits }));
    console.log(snum);
    
  }
  //this is the functon to fetch the data from one behind, it takes the page number and minuses it
  fetchPrevData = () => {
    if (pnum > 0){
    pnum = pnum-1;
    snum = pnum.toString();
    fetch(API+snum) //combines the url and page number
     .then(response => response.json())
    .then(data => this.setState({ hits: data.hits }));
    console.log(snum);
  }}
  
  render() {
    const { hits } = this.state;
 
    return (
      <div>
      {/* this add the table with the data from the state */}
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
      {hits.map(hit =>
          <tr key={hit.objectID}>
              <td><a href={hit.url} target="_blank">{ hit.title }</a></td>
              <td>{ hit.author}</td>
              <td>{ hit.num_comments}</td>
              <td>{ hit.points }</td>
            </tr>
          )
         }
        </tbody>
    </table>
    {/* this adds the buttons */}
    <button onClick={this.fetchPrevData}>Previous</button>
    <button onClick={this.fetchData}>More</button>
    </div>
    
    
    );
  }
}
export default App;

