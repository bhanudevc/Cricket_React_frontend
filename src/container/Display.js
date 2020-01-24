import React, { Component } from 'react'

class Display extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = () => {
        fetch('http://localhost:3001/player/display')
            .then((result) => {
                return result.json();
            }).then((data) => {
                console.log("data====", data);
                let dat = data.map((value) => {
                    console.log("values=======", value);
                    return (
                        <div>
                            <table border="1">
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
    render() {
        return (
            <div>
                <center>
                    display
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
export default Display
