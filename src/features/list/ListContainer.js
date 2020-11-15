import React from 'react';
import { List } from './List';

export function ListContainer({ listItems=[] }) {
  if (listItems.length === 0) {
    return null;
  }
  return (
    <div id="listContainer">
    {
          listItems && listItems.map((list, index) => {
             return (
                  <List key={List.id} list={list} />
              );
          })
      }
    </div>
  );
}
