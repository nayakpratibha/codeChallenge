import React from 'react';
import { useDispatch } from 'react-redux';
import { showNewCardForm } from "../../app/boardAction";

export function Card({ card }) {
  const dispatch = useDispatch();
  function showCardDetails(cardDetails) {
     dispatch(showNewCardForm(cardDetails));
  }

  function onDragStart (ev, id) {
      console.log('dragstart:',id);
      ev.dataTransfer.setData("id", id);
  }

  return (
        <div id={card.id} key={card.id} draggable onDragStart = {(e) => onDragStart(e, card.id)} className="card-items">
            <div id="card-body" onClick={() => showCardDetails(card)}>
              <span className="card-title">{card.title}</span>
              <p className="card-text">{card.description}</p>
            </div>
        </div>
    )
}
