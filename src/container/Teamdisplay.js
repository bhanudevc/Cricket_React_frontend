import React, { Component } from 'react'

class Teamdisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            team:"",
            data: []
        }
    }
    getteam = () => {
        fetch('http://localhost:3001/player/team/'+this.state.team)
            .then((result) => {
                return result.json();
            }).then((data) => {
                console.log("data====", data);
                let dat = data.map((value) => {
                    console.log("values=======", value);
                    return (
                        <div>
                            <table  border="1">
                                <tbody>
                                    <tr>
                                        <td>{value.name}</td>
                                        <td>{new Date(value.dob).toLocaleDateString()}</td>
                                        <td>{value.role}</td>
                                        <td>{value.style}</td>
                                        <td>{value.team}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })
                this.setState({
                    data: dat
                })
            });
    }
    chekcvalue = (event) => {
        let nm = event.target;
        const { role } = this.state;
        console.log("event name===============", nm.name);
        // if (nm.value != "") {
            
        // } else {
            this.setState({
                team: nm.value
            })
        //}
    }
    render() {
        return (
            <div>
                <center>
                    display
                    <label>Select Team:</label><br />
                    <select name="team" onChange={this.chekcvalue}>
                        <option value="-1">Select</option>
                        <option value="Team1">Team1</option>
                        <option value="Team2">Team2</option>
                        <option value="Team3">Team3</option>
                    </select>
                    <button onClick={this.getteam}>Click</button>
                    <table border="1">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>DOB</td>
                                <td>Role</td>
                                <td>Style</td>
                                <td>Team</td>
                            </tr>
                        </tbody>
                    </table>
                    {this.state.data}
                </center>
            </div>
        )
    }
}
export default Teamdisplay
