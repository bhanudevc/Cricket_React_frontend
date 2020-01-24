import React, { Component } from 'react'
import './form.css';
class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            dob: "",
            role: [],
            style: [],
            team: "",
            flag: "",
            chk1: false,
            chk2: false,
            submit: false
        }
        this.chekcvalue = this.chekcvalue.bind(this);
    }
    chekcvalue = (event) => {
        let nm = event.target;
        const { role } = this.state;
        console.log("event name===============", nm.name);
        if (nm.value != "") {
            if (nm.name == "rol") {
                if (nm.checked) {
                    if (nm.value == "Bowler") {
                        this.setState({
                            chk1: true
                        })
                    } else if (nm.value == "Batsman") {
                        this.setState({
                            chk2: true
                        })
                    }
                    role.push(nm.value);
                } else {
                    role.pop(nm.value);
                    this.setState({
                        chk1: false,
                        chk2: false
                    })
                }
                this.setState({
                    role: role,
                    flag: ""
                });
            } else {
                this.setState({
                    [nm.name]: nm.value,
                    flag: ""
                })
            }
        } else {
            this.setState({
                flag: nm.name
            })
        }
    }
    stylecheck = (event) => {
        let nm = event.target;
        const { style } = this.state;
        let str = "";
        if (nm.name == "style1" || nm.name == "style2") {
            if (nm.value != "") {
                style.push(nm.value);
            } else {
                style.pop(nm.value);
            }
            this.setState({
                style: style
            })
        } else {
            this.setState({
                flag: nm.name
            })
        }
    }
    validate = () => {
        debugger
        if (this.state.name == "") {
            alert("Fill the name");
            document.frm.name.focus();
            return false;
        }
        if (!isNaN(this.state.name)) {
            alert("Name must be in characters");
            document.frm.name.focus();
            return false;
        }
        if (this.state.role == "") {
            alert("Select any Role");
            document.frm.role.focus();
            return false;
        }
        if(this.state.dob >= Date.now()){
            alert("Incorrect date");
            document.frm.dob.focus();
            return false;
        }
        if (this.state.team == "-1") {
            alert("Enter any Team");
            document.frm.team.focus();
            return false;
        }
        return true;
    }
    saving = () => {
        if (this.validate()) {
            fetch('http://localhost:3001/player/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    dob: this.state.dob,
                    role: this.state.role.join(","),
                    style: this.state.style.join(","),
                    team: this.state.team
                })
            })
                .then((data) => {
                    alert("Registration successful");
                    this.props.history.push('/display');
                })
                .catch((error) => {
                    alert("Registration failed");
                });
        }
    }
    render() {
        console.log("state values==========", this.state);
        const { flag } = this.state
        const { chk1, chk2 } = this.state
        return (
            <div>
                <form name="frm">
                    <center>
                        <table>
                            <th colSpan="2">
                                form
                            </th>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" name="name" onBlur={this.chekcvalue} /></td>
                                <td><div className="err">{(flag == "name") ? "Fill the name" : ""}</div></td>
                            </tr>
                            <tr>
                                <td>DOB</td>
                                <td><input type="date" name="dob" onBlur={this.chekcvalue} /></td>
                                <td><div className="err">{(flag == "dob") ? "Fill the dob" : ""}</div></td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td><input type="checkbox" name="rol" onChange={this.chekcvalue} value="Bowler" />Bowler</td>
                                {(chk1) ? <td className="style">Style  <input type="text" name="style1" onBlur={this.stylecheck} /></td> : ""}
                                <td><div className="err">{(flag == "rol") ? "check roles" : ""}</div></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="checkbox" name="rol" onChange={this.chekcvalue} value="Batsman" />Batsman</td>
                                {(chk2) ? <td className="style">Style  <input type="text" name="style2" onBlur={this.stylecheck} /></td> : ""}
                                <td><div className="err">{(flag == "rol") ? "check roles" : ""}</div></td>
                            </tr>
                            <tr>
                                <td>Team</td>
                                <td>
                                    <select name="team" onBlur={this.chekcvalue}>
                                        <option value="-1">Select</option>
                                        <option value="Team1">Team1</option>
                                        <option value="Team2">Team2</option>
                                        <option value="Team3">Team3</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input type="button" name="submit" value="Submit" onClick={this.saving} />&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="reset" value="Reset" />
                                </td>
                            </tr>
                        </table>
                    </center>
                </form>
            </div>
        )
    }
}
export default Form
