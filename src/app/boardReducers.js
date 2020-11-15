import {
    FETCH_LIST_ITEMS,
    ADD_LIST_ITEMS,
    SHOW_CARD_FORM,
    UPDATE_LIST,
    UPDATE_CARD_ITEM,
    DELETE_CARD,
    DELETE_LIST
  } from "./boardAction";

  const initialState = {
    items: [],
    laneID: 0,
    showNewCardForm: false,
    cardDetails: [],
    currentId : ""
  };

  export default function boardReducers(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case FETCH_LIST_ITEMS:
        return {
          ...state,
          items: action.payload,
          laneID: action.payload.length
        };

      case ADD_LIST_ITEMS:
        return {
          ...state,
          items: [...state.items, {
            "id": `${action.payload}`,
            "title": `List ${action.payload}`,
            "cards": []
          }],
          laneID: action.payload
        };

      case SHOW_CARD_FORM:
        return {
          ...state,
          showNewCardForm: true,
          cardDetails: action.payload.cardDetails,
          currentId: action.payload.laneID ? action.payload.laneID.laneIndex : 0
        };

      case UPDATE_LIST:
        const { cardId, listID } = action.payload;
        const onDragStartListId = cardId.split("-")[0];
        let newListItems = state.items;
        // Remove the card obj from source list
        let draggedFromIndex = newListItems.findIndex(item => item.id === onDragStartListId);
        let draggedFromObj = newListItems[draggedFromIndex];
        let cardDetails = draggedFromObj.cards.filter(item => item.id === cardId)[0];
        const newCards = draggedFromObj.cards.filter(item => item.id !== cardId);
        draggedFromObj.cards = newCards;
        newListItems.splice(draggedFromIndex,1, draggedFromObj);
        // Add card obj to the destination list
        let draggedToIndex = newListItems.findIndex(item => item.id === listID);
        let draggedToObj = newListItems[draggedToIndex];
        const newId = draggedToObj.cards.length + 1;
        cardDetails.id = `${listID}-card ${newId}`;
        draggedToObj.cards.push(cardDetails);
        const indexTo = newListItems.findIndex(item => item.id === listID);
        newListItems.splice(draggedToIndex,1, draggedToObj);
        return {
          ...state,
          items: newListItems
        };
      case UPDATE_CARD_ITEM:
        const { cardObj, cardDescription, comments , currentId, laneID } = action.payload;
        let newItems = state.items;
        let listId;
        let listObj;
        let listIndex;
        // For New card
        if (cardObj.length === 0) {
           listId = currentId ? currentId.split("-")[0] : laneID.toString();
           const listIndex1 = newItems.findIndex(item => item.id === listId);
           listObj = newItems[listIndex1];
           let cardIndex = listObj.cards.findIndex(item => item.id === cardObj.id);
           cardObj.title = 'Card Title';
           if (cardDescription) {
             cardObj.description = cardDescription;
             cardObj.id = `${listId}-card ${listObj.cards.length+1}`;
           }
           if (cardIndex !== -1) {
             cardObj.comments = comments;
           } else {
             listObj.cards.push(cardObj);
           }
           newItems.splice(listIndex1,1,listObj);
        }
        if (cardObj.length !== 0) {
          listId = cardObj.id.split("-")[0];
          listIndex = newItems.findIndex(item => item.id === listId);
          listObj = newItems[listIndex];
          let cardIndex = listObj.cards.findIndex(item => item.id === cardObj.id);
          cardObj.description = cardDescription;
          cardObj.comments = comments;
          listObj.cards.splice(cardIndex,1,cardObj);
          newItems.splice(listIndex,1,listObj);
        }
        return {
          ...state,
          showNewCardForm: false,
          items: newItems
        };

        case DELETE_CARD:
          const deletedCardList = state.items;
          if (action.payload.id) {
            const id = action.payload.id.split("-")[0];
            const listIndex2 = deletedCardList.findIndex(item => item.id === id);
            const listObject = deletedCardList[listIndex2];
            const newCardsItem = listObject.cards.filter(item => item.id !== action.payload.id);
            listObject.cards = newCardsItem;
            deletedCardList.splice(listIndex2,1, listObject);
          }
          return {
            ...state,
            items: deletedCardList,
            showNewCardForm: false
          };

        case DELETE_LIST:
          const deletedListItems = state.items;
          const deleteListInd = deletedListItems.findIndex(item => item.id === action.payload);
          deletedListItems.splice(deleteListInd,1);
          return {
            ...state,
            items: deletedListItems,
          };

      default:
        // ALWAYS have a default case in a reducer.
        return state;
    }
  }
