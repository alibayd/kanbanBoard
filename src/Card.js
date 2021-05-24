import React from 'react';
import { ItemTypes } from './Items';
import { useDrag } from 'react-dnd';
import './ListItems.css';


function Card(props){
    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.CARD,
        id: props.key,
        collect: monitor => ({
          isDragging: !!monitor.isDragging()
        })
      })
  
    return (
    <div className="list" ref = {drag}>
            <p>
                <input 
                    className="title"
                    type="text" 
                    id ={props.key+"t"} 
                    value = {props.title}
                    onChange={props.onChangeUpdateTitle}
                />
                <span id="x" onClick = {props.onDeleteClick}>X</span>
                <input 
                    className="description"
                    type="text" 
                    id ={props.key+"d"} 
                    value = {props.description}
                    onChange={props.onChangeUpdateDescription}
                />
                <div className="dates">
                    <p id="creation">Created:{props.creationDate}</p>
                    <p id="edit">Last edited:{props.editDate}</p>
                </div>
            </p>
            
        </div>
    );
}

export default Card
