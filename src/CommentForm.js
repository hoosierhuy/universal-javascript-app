import React, { Component } from 'react';

import style from './style';

class CommentForm extends Component {

  constructor (props) {
    super (props);

    this.state = { author: '', text: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleAuthorChange (evt) {
    this.setState({ author: evt.target.value, });
  }

  handleTextChange (evt) {
    this.setState({ text: evt.target.value, });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    console.log(`${this.state.author} said "${this.state.text}"`);
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author, text, })
    this.setState({ author: '', text: '', })
  }

  render () {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
        <input
          type="text"
          placeholder="Your name..."
          style={ style.commentFormAuthor }
          value={ this.state.author }
          onChange={ this.handleAuthorChange }
        />
        <input
          type="text"
          placeholder="Your comment..."
          style={ style.commentFormText }
          value={ this.state.text }
          onChange={ this.handleTextChange }
        />
        <input
          type="submit"
          style={ style.commentFormPost }
          value="Post"
        />
      </form>
    );
  }

}

export default CommentForm;