import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      attendance: [],
      students: "",
      classes: 0,
      present: "" 
    }
    this.handleClick = this.handleClick.bind(this)
    this.takeAttendance = this.takeAttendance.bind(this)
  }
  handleClick() {
    if(this.state.students.length > 0){
      let newAttendance = []
      this.state.students.split(',').map((student) => {
        let indiStu = []
        indiStu.push(student)
        indiStu.push(new Array(parseInt(this.state.classes)).fill("."))
        newAttendance.push(indiStu)
      }) 
      this.setState({attendance: newAttendance})
    } 
    document.getElementById("generator-form").style.display = "none"
    document.getElementById("take-attendance").style.display = "block"
  }
  takeAttendance() {
    let presentStudents = this.state.present.split(',')
    console.log(presentStudents)
    let index = this.state.attendance[0][1].indexOf(".")
    for(let i = 0; i < this.state.attendance.length; i++){  
      presentStudents.indexOf((i+1).toString())
      if(presentStudents.indexOf((i+1).toString()) !== -1){
        let updatedAttendance = this.state.attendance.slice(0)
        updatedAttendance[i][1].splice(index, 1, "1")
        this.setState({attendance: updatedAttendance})
      } else {
        let updatedAttendance = this.state.attendance.slice(0) 
        updatedAttendance[i][1].splice(index, 1, "0")
        this.setState({attendance: updatedAttendance})
      } 
    } 
    console.log(this.state.present, this.state.attendance)

    this.setState({present: ""})
  }
  render(){
    console.log(this.state.attendance)
    return <div>
      <div id="generator-form">
        <div>
      <p>Classes: </p>
      <input type="text" value={this.state.classes} onChange={(e) => this.setState({classes: e.target.value})} /> 
    </div><div>
      <p>Students: </p>
      <textarea rows={7} cols={30} value={this.state.students} onChange={(e) => this.setState({students: e.target.value})}></textarea>
      <br />
      <button onClick={this.handleClick}>Generate</button>
  </div>
  </div> 
  <div style={{display: "flex"}}>
      <div id="sheet">{
        this.state.attendance.length > 0
          ? this.state.attendance.map((studentAtten, index) => {
            return(<div className="grid"><p>{index+1}.</p><p>{studentAtten[0]}</p><p>{studentAtten[1].map((i) => ` ${i} `)}</p><p>{addArr(studentAtten[1])}/{this.state.classes}</p></div>)
            })
          : ""
      }</div>
    <div id="take-attendance" style={{display: "none"}}>
    <textarea rows={5} cols={20} value={this.state.present} onChange={(e) => this.setState({present: e.target.value})}></textarea>
    <button onClick={this.takeAttendance}>Take Attendance</button>
    </div>
</div>
      </div> 
  }
}


function addArr(arr) {
 let index = arr.indexOf(".")
  let sum = 0
  for(let j = 0; j < index; j++){
    sum += parseInt(arr[j]) 
  }
  return sum
}

export default App;
