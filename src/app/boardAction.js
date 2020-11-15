export const FETCH_LIST_ITEMS = "FETCH_LIST_ITEMS";
export const ADD_LIST_ITEMS = "ADD_LIST_ITEMS";
export const SHOW_CARD_FORM = "SHOW_CARD_FORM";
export const UPDATE_LIST = "UPDATE_LIST";
export const UPDATE_CARD_ITEM = "UPDATE_CARD_ITEM";
export const DELETE_CARD = "DELETE_CARD";
export const DELETE_LIST = "DELETE_LIST";

export function getBoardItems(listItems) {
   return {
       type: FETCH_LIST_ITEMS,
       payload: listItems
     };
 }

export function addNewLane(laneID) {
    return {
      type: ADD_LIST_ITEMS,
      payload: laneID
    }
}

export function showNewCardForm(cardDetails, laneID) {
    return {
      type: SHOW_CARD_FORM,
      payload: {
         cardDetails,
         laneID
      }
    }
}

export function updateLisItem(listID, cardId) {
    return {
      type: UPDATE_LIST,
      payload: {
         cardId,
         listID
      }
    }
}

export function addCommentsToCard(cardObj, cardDescription, comments, currentId, laneID) {
    return {
      type: UPDATE_CARD_ITEM,
      payload: {
         cardObj,
         cardDescription,
         comments,
         currentId,
         laneID
      }
    }
}

export function deleteCard(cardObj) {
    return {
      type: DELETE_CARD,
      payload: cardObj
    }
}

export function deleteList(listId) {
    return {
      type: DELETE_LIST,
      payload: listId
    }
}
