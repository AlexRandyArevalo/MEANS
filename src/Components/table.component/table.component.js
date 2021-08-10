import { Component } from "react";

export default class Table extends Component {
    render() {
        return (<div>
            <table className="table">
                <thead>
                    {
                        this.props.Header
                    }
                </thead>
                <tbody>
                    {
                        this.props.Loader
                    }
                    {
                        this.props.Body
                    }
                </tbody>
            </table>
        </div>)
    }
}
