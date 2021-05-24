import React from 'react';
import './App.css';
import ListItems from './ListItems';
import { v4 as uuidv4 } from 'uuid';
import Board from './Board';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

class App extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       items:[],
       currentItem:{
         title:'',
         desciption:'',
         key: '',
         status:  '',
         creationDate: '',
         editDate: ''
       }
     }
     this.handleInput = this.handleInput.bind(this);
     this.addItem = this.addItem.bind(this);
     this.deleteItem = this.deleteItem.bind(this);
     this.setUpdateTitle = this.setUpdateTitle.bind(this);
     this.setUpdateDescription = this.setUpdateDescription.bind(this);

   }

  handleInput(e) {
    let curDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    this.setState({
      currentItem: {
        title: e.target.value,
        description: '',
        key: uuidv4(),
        status: "todo",
        creationDate: curDate,
        editDate: curDate
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    let curDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    if(newItem.title !==""){  
      const newItems = [...this.state.items, newItem];
      localStorage.setItem('myItems', JSON.stringify(newItems));
      this.setState({
        items: newItems,
        currentItem: {
          title: '',
          key: '',
          desciption: '',
          status: "todo",
          creationDate: curDate,
          editDate: curDate
        }
      })
    }
  }

  dragHandler(e) {
    let curDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    e.type="done"
    e.editDate = curDate;
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item =>
      item.key !== key); 
    localStorage.setItem('myItems', JSON.stringify(filteredItems));
    this.setState({
      items: filteredItems
    })
  }

  setUpdateTitle(title, key) {
    const items=  this.state.items;
    let curDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    items.map(item => {
      if(item.key === key){
        item.editDate= curDate;
        item.title = title;
      }
    })
    localStorage.setItem('myItems', JSON.stringify(items));
    this.setState({
      items: items
    })
  }
  setUpdateDescription(description, key) {
    const items =  this.state.items;
    let curDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    items.map(item => {
      if(item.key === key){
        item.editDate= curDate;
        item.description= description;
      }
    })
    localStorage.setItem('myItems', JSON.stringify(items));
    this.setState({
      items: items
    })
  }

  componentDidUpdate(){
    localStorage.setItem('myItems', JSON.stringify(this.state.items))
  }

  componentDidMount(){
    const myItems =  JSON.parse(localStorage.getItem('myItems'));
    if(myItems !== null){
      this.setState({
        items: myItems
      })
    }
  }

  

  render(){
  return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div id="board-1" className="board">
            <span>To Do</span>
            <form id="to-do-form" onSubmit={this.addItem}>
              <input 
                type="text" 
                placeholder ="Enter a todo" 
                value={this.state.currentItem.title}
                onChange={this.handleInput}/>
              <button type="submit">Add</button>
            </form>
            <Board 
              addItem={this.addItem}
              deleteItem={this.deleteItem}
              setUpdateDescription={this.setUpdateDescription}
              setUpdateTitle={this.setUpdateTitle}
              items={this.state.items}
              type="todo"
              dragHandler = {this.dragHandler}
            />
            </div>
            
          <div id="board-2"  className="board">
            <span>Done</span>
            <Board 
              addItem={this.addItem}
              currentItemTitle={this.state.currentItem.title}
              handleInput={this.handleInput}
              deleteItem={this.deleteItem}
              setUpdateDescription={this.setUpdateDescription}
              setUpdateTitle={this.setUpdateTitle}
              items={this.state.items}
              type="done"
              dragHandler = {this.dragHandler}
            />
          </div>  

          </div>
        </DndProvider>
    </div>
    
  );
 }
}


export default App;
