import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { ListContainer } from './features/list/ListContainer';
import { NewCardForm } from './features/card/NewCardForm';
import { getBoardItems, addNewLane } from "./app/boardAction";
import './App.css';
import { listItems } from './data/board.json';

function App({ items }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardItems(listItems));
  }, []);

  function addNewList(id) {
     dispatch(addNewLane(id+1));
  }

  const newState = useSelector(state => state.board);
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="header">Sample board</h2>
      </header>
      {
        newState.showNewCardForm === false ?
          <div className="flex-column">
            <ListContainer listItems={newState.items} />
            <div className="new-list" onClick={() => addNewList(newState.laneID)}>
              <span>Add new list...</span>
            </div>
          </div>
          : <NewCardForm cardDetails={newState.cardDetails} laneID={newState.laneID} currentId={newState.currentId} />
      }
    </div>
  );
}

export default App;
