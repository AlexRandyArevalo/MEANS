import React, { Component } from 'react'
import axios from 'axios'
import Tippy from '@tippyjs/react';
import "tippy.js/dist/tippy.css";
import 'tippy.js/animations/scale.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../custom-style/style.css'
import Table from '../../table.component/table.component'
import { ClipLoader } from "react-spinners"
import ModalEditUser from '../modal/modal.edit.user.component'
import ModalDeleteUser from '../modal/modal.delete.user.component'
import {
    faTrashAlt,
    faEdit,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faTrashAlt,
    faEdit,
    faEllipsisH
);

export default class UserList extends Component {
    constructor(props) {
        super(props)
        this.editmodal = React.createRef([])
        this.deletemodal = React.createRef([])
        this.state = {
            color_red: "#dc3545",
            loader: {
                loading: false,
                didmount: false
            },
            users: {
                data: []
            },
        }
    }

    componentDidMount() {
        this.setState({
            loader: {
                didmount: true
            }
        })
        this.setDataTable()
    }

    // Display List of Users
    setDataTable = () => {
        console.log('setDataTable')
        if (!!this.state.loader.didmount)
            this.setState({ loader: { loading: true } }) // Show Loader
        axios.get("/users")
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        users: {
                            data: res.data.data
                        }
                    })
                    this.setState({ loader: { loading: false } }) // Hide Loader
                }
            })
            .catch(err => console.log(err))
    }

    ListOfUsers = () => {
        return (
            this.state.users.data.map((user, index) =>
            (<tr key={index}>
                <th>{index + 1}.</th>
                <td className="text-truncate td-mw-12 text-muted" title={user.eid}>{this.state.users.data[index].eid}</td>
                <td className="text-truncate td-mw-12 text-muted" title={user.lName}>{this.state.users.data[index].lName}</td>
                <td className="text-truncate td-mw-12 text-muted" title={user.fName}>{this.state.users.data[index].fName}</td>
                <td className="text-truncate td-mw-12 text-muted" title={user.mName}>{this.state.users.data[index].mName}</td>
                <td className="text-truncate td-mw-12 text-muted" title={user.contact}>{this.state.users.data[index].contact}</td>
                <td className="text-truncate td-mw-12 text-muted" title={user.addressOne}>{this.state.users.data[index].addressOne}</td>
                <td className="text-truncate td-mw-12 text-muted" title={user.addressTwo}>{this.state.users.data[index].addressTwo}</td>
                <td>
                    <Tippy
                        // offset={[0, 3]}
                        interactive={true}
                        animation="scale"
                        placement="top"
                        trigger="click"
                        content={
                            <div className="pt-2 pb-2">
                                <a href="#" className="text-white p-2" onClick={() => this.deletemodal.current.showModal_delete(user)}>
                                    <FontAwesomeIcon icon="trash-alt" />
                                </a>
                                <a href="#" className="text-white p-2" onClick={() => this.editmodal.current.Edit(user)}>
                                    <FontAwesomeIcon icon="edit" />
                                </a>
                            </div>
                        }
                    >
                        <a href="#" className="text-muted" id={`Popover${index + 1}`}><FontAwesomeIcon icon="ellipsis-h" /></a>
                    </Tippy>
                </td>
            </tr>)
            )
        )
    }

    render() {
        return (<div>
            <div className="shadow-sm p-3 mb-5 bg-body rounded">
                <h5 className="p-3 pb-0">User List</h5>
                <div className="border rounded p-4 m-3">
                    <Table
                        class={'table'}
                        Header={
                            <tr>
                                <th width="5%">#</th>
                                <th width="13.5%">EID</th>
                                <th width="13.5%" className="text-nowrap">Last Name</th>
                                <th width="13.5%" className="text-nowrap">First Name</th>
                                <th width="13.5%" className="text-nowrap">Middle Name</th>
                                <th width="13.5%">Contact</th>
                                <th width="13.5%">Address I</th>
                                <th width="13.5%">Address II</th>
                                <th width="13.5%"></th>
                            </tr>
                        }
                        Loader={
                            <tr>
                                <td className="sweet-loading pt-2 ps-1" style={{ borderBottom: "none", padding: "0px" }}>
                                    <ClipLoader color={this.state.color_red} loading={this.state.loader.loading} size={24} />
                                </td>
                            </tr>
                        }
                        Body={this.ListOfUsers()}
                    />
                </div >
                {/* Edit User Modal */}
                <ModalEditUser
                    ref={this.editmodal}
                    loadupdates={this.setDataTable}
                />
                {/* Delete User Modal */}
                <ModalDeleteUser
                    ref={this.deletemodal}
                    loadupdates={this.setDataTable}
                />
            </div>
        </div>)
    }
}
