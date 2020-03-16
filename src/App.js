import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  selectAuthor = author => this.getDetail(author.id);

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return this.state.loading ? (
        <Loading />
      ) : (
        <AuthorList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  getAuthors = async () => {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const authors = response.data;
      this.setState({ authors: authors, loading: false });
    } catch (error) {
      console.log("error!!!!!!!!!!!");
    }
  };

  getDetail = async authorId => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/" + `${authorId}` + "/"
      );
      console.log(response);
      const details = response.data;
      this.setState({ currentAuthor: details, loading: false });
    } catch (error) {
      console.log("error!!!!!!!!!!!");
    }
  };

  componentDidMount() {
    this.getAuthors();
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
