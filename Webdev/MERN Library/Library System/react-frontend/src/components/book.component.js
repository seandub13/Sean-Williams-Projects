import React, { Component } from "react";
import BookDataService from "../services/book.service";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeRelease_year = this.onChangeRelease_year.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangePages = this.onChangePages.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    //The default state for input
    this.state = {
      currentBook: {
        id: null,
        title: "",
        description: "",
        author: "",
        release_year: 2020, 
        genre:"",
        image: null,
        pages:0,
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        description: description
      }
    }));
  }

  onChangeAuthor(e) {
    const author = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        author: author
      }
    }));
  }

  onChangeRelease_year(e) {
    const release_year = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        release_year: release_year
      }
    }));
  }

  onChangeGenre(e) {
    const genre = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
         genre: genre
      }
    }));
  }

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result
    this.setState({
      image: btoa(binaryString)
    })
  }

  onChangeImage = e => {
    console.log("file to upload:", e.target.files[0])
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this._handleReaderLoaded.bind(this)
  
      reader.readAsBinaryString(file)
  
  }
}

  onChangePages(e) {
    const pages = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
         pages: pages
      }
    }));
  }
  

  getBook(id) {
    BookDataService.get(id)
      .then(response => {
        this.setState({
          currentBook: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //Changes the published status of the selected 
  updatePublished(status) {
    var data = {
      id: this.state.currentBook.id,
      title: this.state.currentBook.title,
      author: this.state.currentBook.author,
      release_year: this.state.currentBook.release_year, 
      genre:this.state.currentBook.genre,
      pages:this.state.currentBook.pages,
      image:this.state.currentBook.image,
      description: this.state.currentBook.description,
      published: status
    };

    BookDataService.update(this.state.currentBook.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentBook: {
            ...prevState.currentBook,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBook() {
    BookDataService.update(
      this.state.currentBook.id,
      this.state.currentBook
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Book was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  //Removes the book from the database
  deleteBook() {    
    BookDataService.delete(this.state.currentBook.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/books')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBook } = this.state;

    return (
      <div>
        {currentBook ? (
          <div className="edit-form">
            <h4>Book</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBook.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentBook.author}
                  onChange={this.onChangeAuthor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBook.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="release_year">Release Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="release_year"
                  value={currentBook.release_year}
                  onChange={this.onChangeRelease_year}
                />
              </div>
              <div className="form-group">
              <label htmlFor="genre"> Genre  <br></br>    
                  <select value={this.state.genre} onChange={this.onChangeGenre}>
                  <option value="Action/Adventure"></option>
                    <option value="Action/Adventure">Action/Adventure</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Romance">Romance</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Biographies/Autobiographies">Biographies/Autobiographies</option>
                    <option value="Classics">Classics</option>
                    <option value="Other">Other</option>            
                  </select>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="pages">Pages</label>
                <input
                  type="text"
                  className="form-control"
                  id="pages"
                  value={currentBook.pages}
                  onChange={this.onChangePages}
                />
              </div>
              <div className="form-group">
              <div><label htmlFor="Book Cover">Book Cover </label>
                <input type="file" onChange={this.onChangeImage}  name="image" id="file" accept="image/jpg, image/jpeg"  /> 
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentBook.published ? "Published" : "Pending"}
              </div>
              </div>
            </form>

            {currentBook.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBook}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBook}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
    );
  }
}