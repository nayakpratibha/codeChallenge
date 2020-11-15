import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLisItem, deleteList } from "../../app/boardAction";
import { CardContainer } from '../card/CardContainer';

export function List({ list=[] }) {
  const dispatch = useDispatch();
  function onDragOver(ev) {
    ev.preventDefault();
  }

  function onDrop (ev, cat) {
     let id = ev.dataTransfer.getData("id");
     dispatch(updateLisItem(cat, id));
  }

  function onDeleteList (list) {
     dispatch(deleteList(list.id));
  }

  if (list.length === 0) {
    return null;
  }

  return (
    <div id="list-item">
      <div id="list-title">
        <h3 className="title">{list.title}</h3>
        <button className="delete-list" aria-label="Delete" onClick={()=>onDeleteList(list)}>Delete this list</button>
      </div>
      <div id="list-body" onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>{onDrop(e, list.id)}}>
          <CardContainer cardItems={list.cards}/>
      </div>
    </div>
  );
}
