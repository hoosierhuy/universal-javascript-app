import React, { Component } from 'react';

import style from './style';
import marked from 'marked';

class Comment extends Component {

  constructor (props) {
    super (props);

    this.state = {
      toBeUpdated: false,
      author: '',
      text: '',
    };
    this.updateComment = this.updateComment.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
  }

  updateComment (evt) {
    evt.preventDefault (evt);
    // Shows the update field when the update link is clicked
    this.setState ({ toBeUpdated: !this.state.toBeUpdated, })
  }

  handleCommentUpdate (evt) {
    evt.preventDefault();
    let id = this.props.uniqueID;
    // If author or text is changed, set it, if not, leave null
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let comment = { author, text, };
    this.props.onCommentUpdate (id, comment);
    this.setState ( {
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: ''
    });
  }

  deleteComment (evt) {
    evt.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete (id);
    console.log('Comment deleted.');
  }

  handleTextChange (evt) {
    this.setState ({ text: evt.target.value, });
  }

  handleAuthorChange (evt) {
    this.setState ({ author: evt.target.value, });
  }

  rawMarkup () {
    let rawMarkup = marked (this.props.children.toString());

    return {
      __html: rawMarkup,
    };
  }

  render () {
    return (
      <section style={ style.comment }>
        <h3>{ this.props.author }</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
        <a style={ style.updateLink } href="#" onClick={ this.updateComment }>Update</a>
        <a style={ style.deleteLink } href="#" onClick={ this.deleteComment }>Delete</a>
        {
          (this.state.toBeUpdated) ?
            (<form onSubmit={ this.handleCommentUpdate }>
              <input
                type="text"
                placeholder="Update name..."
                style={ style.commentFormAuthor }
                value={ this.state.author }
                onChange={ this.handleAuthorChange }
              />
              <input
                type="text"
                placeholder="Update your comment..."
                style={ style.commentFormText }
                value={ this.state.text }
                onChange={ this.handleTextChange }
              />
              <input
                type="submit"
                style={ style.commentFormPost }
                value="Update"
              />
            </form>) : null
        }
      </section>
    )
  }

}

export default Comment;