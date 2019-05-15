





class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
  }

  state = {
    list : [],
    activity : "",
    errorMsg: ""
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
        // let updatedList = this.state.list;
        // updatedList.splice(index,1);
        this.state.list.splice(index,1);
        this.setState({
            list: this.state.list
        });
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
      // render the list with a map() here
      let listItems = this.state.list.map( (item,index) => {
            return <tr key={index}>
                       <td>{index+1}</td>
                       <td>{item.activity}</td>
                       <td>{item.created_at}</td>
                       <td>
                           <button onClick={()=> this.deleteItem(index)}>Remove activity</button>
                       </td>
                    </tr>
        })
      console.log("rendering");
      return (
        <div className="list">
          <input disabled={this.state.disabled} onChange={(event)=>{this.changeHandler(event);}} value={this.state.activity}/><br/>
          <div style={{"color":"red"}}>{this.state.activity.length >= 10 ? "Eh too long la!" : ""}</div>
          <div style={{"color":"blue"}}>{this.state.errorMsg}</div>
          <button onClick={(event)=>{this.addItem(event);}}>add item</button>
          <h1 style={{"text-align":"center"}}>List of activities</h1>
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
                { listItems }
                </tbody>
            </table>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);