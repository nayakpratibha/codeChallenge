import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addCommentsToCard, deleteCard } from "../../app/boardAction";

export function NewCardForm({ cardDetails, currentId, laneID }) {
  const commentsInit = cardDetails.comments ? cardDetails.comments : [];
  const [descriptionValue, setDescriptionValue] = useState("");
  const [commnetsValue, setCommentsValue] = useState("");
  const [comments, addComments] = useState(commentsInit);
  const dispatch = useDispatch();
  const date = new Date();

  useEffect(() => {
    const descriptionValue = cardDetails.description ? cardDetails.description : "";
    setDescriptionValue(descriptionValue);
  }, []);

  function handleChange(event) {
    setDescriptionValue(event.target.value);
  }

  function handleDelete(cardDetails) {
    dispatch(deleteCard(cardDetails));
  }

  function handleComment(event) {
     setCommentsValue(event.target.value);
  }

  function handleAddComment(comments) {
    if(commnetsValue) {
      const obj = {
         id: comments.length+1,
         text: commnetsValue
      }
      const newComments = [...comments, obj];
      addComments(newComments);
      setCommentsValue("");
    }
  }

  function handleUpdateDetails(cardDetails) {
      dispatch(addCommentsToCard(cardDetails, descriptionValue, comments, currentId, laneID));
  }

  return (
        <div className="newcard-form">
            <div id="newcard-title">
              <span className="newcard-span">Card Title</span>
            </div>
            <div id="newcard-body">
              <input type="text" value={descriptionValue} onChange={(e)=>handleChange(e)} placeholder="Card Description"></input>
              <button className="delete-card" aria-label="Delete" onClick={()=>handleDelete(cardDetails)}>Delete Card</button>
            </div>
              <input type="textarea" value={commnetsValue} onChange={(e)=>handleComment(e)}></input>
            <div className="comment-section">
              <button className="add-comment" aria-label="Delete" onClick={()=>handleAddComment(comments)}>Add Comment</button>
              {
                comments && comments.map((item) => {
                  return (
                    <div id="list-container">
                     <ul key={item.id}>
                        <li id={item.id}>{item.text}</li>
                        <span>{`${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`}</span>
                     </ul>
                    </div>
                  );
                })}
               <div id="footer">
                <button className="update" aria-label="Update" onClick={()=>handleUpdateDetails(cardDetails)}>Update</button>
              </div>
            </div>
        </div>
    )
}
