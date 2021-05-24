import React from 'react';
import './ListItems.css';
import Card from './Card';


function ListItems(props) {

    const items = props.items;
    const listItems = items.filter(item => props.type === item.status).map(item => {
        return <Card
            description={item.description}
            key={item.key}
            title={item.title}
            creationDate={item.creationDate}
            editDate={item.editDate}
            onDeleteClick={() => props.deleteItem(item.key)}
            onChangeUpdateTitle={(e) => {
                props.setUpdateTitle(e.target.value, item.key)
            }}
            onChangeUpdateDescription={(e) => {
                props.setUpdateDescription(e.target.value, item.key)
            }}
        />
    })
    return (
        <div>{listItems}</div>
    )
}

export default ListItems
