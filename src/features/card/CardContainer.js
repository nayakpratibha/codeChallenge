import React from 'react';
import { useDispatch } from 'react-redux';
import { showNewCardForm } from "../../app/boardAction";
import { Card } from './Card';

export function AddNewCard(laneIndex) {
    const dispatch = useDispatch();
    function showCardDetails(cardDetails, laneIndex) {
       dispatch(showNewCardForm(cardDetails,laneIndex));
    }

   return (
     <div className="new-card" onClick={() => showCardDetails([], laneIndex)}>
       <span>Add new card...</span>
     </div>
   );
}

export function CardContainer({ cardItems=[] }) {
  if (cardItems.length === 0) {
    return (
        <AddNewCard />
    );
  }

  return (
    <div id="CardContainer">
    {
          cardItems && cardItems.map((card, index) => {
             return (
                  <Card key={card.id} card={card} />
              );
          })
      }
      <AddNewCard laneIndex={cardItems ? cardItems[0].id : "1"}/>
    </div>
  );
}
