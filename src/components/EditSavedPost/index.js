import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getRecommendations } from '../../actions'

import './style.scss'
import intersperse from '../../util/intersperse'

const EditSavedPost = (props) => {
  const { getRecommendations, inProgressPost } = props

  const [title, setTitle] = useState(props.content.title)
  const [body, setBody] = useState(props.content.body)
  const [elementSuggestions, setElementSuggestions] = useState(props.content.recs)
  const [elementSuggestionsAsLinks, setElementSuggestionsAsLinks] = useState([])

  useEffect(() => {
    const suggestions = props.inProgressPost.recs.map((r) => '/r/' + r.subreddit)
    setElementSuggestionsAsLinks(
      suggestions.map((s) => <a href={`https://reddit.com${s}`}>{s}</a>)
    )
  }, [props.inProgressPost, props.inProgressPost.recs])

  function onSubmit(e) {
    e.preventDefault()

    const post = {
      title,
      body,
      recs: [],
    }

    getRecommendations(post)
  }

  const handlePostUpdate = (e) => {
    e.preventDefault()
    props.setIsEditing(false)
  }

  return (
    <div>
      <form className='edit-saved-post' onSubmit={onSubmit}>
        <label>
          Title
          <br />
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content
          <br />
          <textarea
            className='content-input'
            name='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <div className='button-group'>
          <button type='submit'>Get subreddit suggestions</button>
        </div>
        <div className='suggestions'>
          <p>Subreddit Suggestions:</p>
          <p>{intersperse(elementSuggestions, ' · ')}</p>
        </div>
        <div className='button-group'>
          <button onClick={handlePostUpdate}>Done</button>
          <button className='warning' onClick={props.handleDeleteSavedPost}>
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => state


export default connect(mapStateToProps, { getRecommendations })(EditSavedPost)