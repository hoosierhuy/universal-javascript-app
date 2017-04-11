import React, { Component } from 'react';

import Comment from './Comment';
import style from './style';

class CommentList extends Component {

  render () {
    let commentNodes = this.props.data.map (comment => {
      return (
        <Comment
          author={ comment.author }
          uniqueID={ comment['_id'] }
          onCommentDelete={ this.props.onCommentDelete }
          onCommentUpdate={ this.props.onCommentUpdate }
          key={ comment['_id'] }>
          {/* Line break for readability, for me anyways. */}
          { comment.text }
        </Comment>
      );
    });
    return (
      <section style={ style.commentList }>
        { commentNodes }
      </section>
    )
  }

}

export default CommentList;