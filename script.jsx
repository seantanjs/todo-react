class DeletedItemList extends React.Component {
  render() {
      console.log(this.props.deletedList);
      let deletedList = this.props.deletedList.map( (deletedItem,index) => {
            return <tr key={index}>
                       <td>{index+1}</td>
                       <td>{deletedItem[0].activity}</td>
                       <td>{deletedItem[0].created_at}</td>
                    </tr>
        })
      console.log("rendering");
      return (
          <React.Fragment>
          <h2 style={{"text-align":"center"}}>Deleted Activities</h2>
          <table>
            <thead>
                <tr>
                    <td scope="col">Id</td>
                    <td scope="col">Activity</td>
                    <td scope="col">Timestamp</td>
                </tr>
                </thead>
                <tbody>
                    { deletedList }
                </tbody>
            </table>
          </React.Fragment>
      );
  }
}

class TodoItem extends React.Component {
  render() {
      // render the list with a map() here
      let listItems = this.props.listItems.map( (item,index) => {
            return <tr key={index}>
                       <td>{index+1}</td>
                       <td>{item.activity}</td>
                       <td>{item.created_at}</td>
                       <td>
                           <button onClick={(index)=> this.props.deleteItem(index)}>Remove activity</button>
                           <button onClick={(index)=> this.props.editItem(index)}>Edit activity</button>
                       </td>
                    </tr>
        })
      console.log("rendering");
      return (
        <React.Fragment>
            { listItems }
        </React.Fragment>
      );
  }
}


class ItemList extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
  }

  state = {
    list : [],
    activity : "",
    errorMsg: "",
    deletedList: []
  }


  changeHandler(event){
    this.state.errorMsg = "";
    this.setState({
        activity:event.target.value,
        errorMsg: this.state.errorMsg
    });
    console.log("change", event.target.value);
  }

   deleteItem(index) {
        this.state.deletedList.push(this.state.list.splice(index,1));
        this.setState({
            list: this.state.list,
            deletedList: this.state.deletedList
        });
        console.log(this.state.deletedList);
    }

    editItem(index) {
        alert("test");
    }

  addItem(event){
      if(this.state.activity.length == 0) {
          this.state.errorMsg = "Eh pls enter smth la!"
          this.setState({
            errorMsg: this.state.errorMsg
        });
           console.log(this.state.list);
      } else {
          this.state.list.push({
              "activity": this.state.activity,
              "created_at": moment().format('D MMMM YYYY, h:mm:ss a'),
              "completed": false,
              "updated_at": ""
          });
          this.setState({
            list:this.state.list
        });
           console.log(this.state.list);

      }
}

  render() {
      console.log("rendering");
      return (
        <div>
          <div className="form">
              <input disabled={this.state.disabled} onChange={(event)=>{this.changeHandler(event);}} value={this.state.activity}/><br/>
              <div style={{"color":"red"}}>{this.state.activity.length >= 10 ? "Eh too long la!" : ""}</div>
              <div style={{"color":"blue"}}>{this.state.errorMsg}</div>
              <button onClick={(event)=>{this.addItem(event);}}>add item</button>
          </div>
          <div className="header-title">
              <h2>List of activites</h2>
              <h2>Item count: {this.state.list.length}</h2>
          </div>
            <table>
            <thead>
                <tr>
                    <td scope="col">Id</td>
                    <td scope="col">Activity</td>
                    <td scope="col">Timestamp</td>
                    <td scope="col">Action</td>
                </tr>
                </thead>
                <tbody>
                    <TodoItem listItems={this.state.list} deleteItem={this.deleteItem} editItem={this.editItem} />
                </tbody>
            </table>
            <hr/>
            <DeletedItemList deletedList={this.state.deletedList} />
        </div>
      );
  }
}


class TodoApp extends React.Component {
  constructor(){
    super()
  }

  render() {
      return (
        <div>
            <ItemList />
        </div>
      );
  }
}

ReactDOM.render(
    <TodoApp />,
    document.getElementById('root')
);