import React from 'react';
import {ItemTypes} from './Items';
import { useDrop } from 'react-dnd';
import ListItems from './ListItems';
import './App.css';

function Board(props) {

  const[{isOver}, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => props.dragHandler(item),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    }),
  })


    return (
      <div className="dropZone"ref={drop}> 
        <ListItems 
          items = {props.items}
          deleteItem = {props.deleteItem}
          setUpdateTitle = {props.setUpdateTitle}
          setUpdateDescription = {props.setUpdateDescription}
          type = {props.type}
        ></ListItems>
        
      </div>
    )
}

export default Board
