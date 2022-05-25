import React from 'react';
import {Component} from "react";
import {convertStringNotes} from "../helper/Helper";
import {BsPlusLg} from "react-icons/bs";
import {ModalForm} from "../ModalDialogs/NoteFormModalDialog";
import NoteModalDialog from "../ModalDialogs/NoteModalDialog";

class RowComponent extends Component {
    state = {
        isOpen: false,
        showNote: false,
        date: null,
        note: null,
    }

    openModal(val, e) {
        e.preventDefault();
        this.setState({
            isOpen: true,
            showNote: false,
            date: new Date(val[2], val[1], val[0] + 1).toJSON().slice(0, 10)
        });
    }

    closeModal = () => this.setState({
        isOpen: false,
        date: null
    });

    openModalNote(e, val, note) {
        e.preventDefault();
        this.setState({
            showNote: true,
            note: note,
            date: new Date(val[2], val[1], val[0] + 1).toJSON().slice(0, 10)
        });
    }

    closeModalNote = () => this.setState({
        showNote: false,
        isOpen: false,
        date: null
    });

    render() {
        let row = this.props.row;
        let current = new Date();
        let currentDay = current.getDate();
        let currentMonth = current.getMonth();
        let currentYear = current.getFullYear();

        function getMonth(number) {
            return (parseInt(number) + 1).toString();
        }

        function getNotes(val) {
            let key = val[2] + "-" +
                (getMonth(val[1]).length === 1 ? "0" : "") + getMonth(val[1]) + "-" +
                (val[0].toString().length === 1 ? "0" : "") + val[0];
            let notes = localStorage.getItem(key);
            if (notes !== null && notes !== "")
                return convertStringNotes(localStorage.getItem(key).split(";"));
            return null;
        }

        return (
            <tr>
                {row.map(val =>
                    <td>
                        {this.state.isOpen ?
                            <ModalForm onClose={this.closeModal}
                                       show={this.state.isOpen}
                                       date={this.state.date}
                                       note={null}
                                       isNew={true}
                            />
                            : null
                        }

                        {this.state.showNote ?
                            <NoteModalDialog onClose={this.closeModalNote}
                                             show={this.state.showNote}
                                             date={this.state.date}
                                             note={this.state.note}
                                             geolocation={this.state.geolocation}
                            />
                            : null
                        }

                        <div className={(val === "" ? "day-not-in-curren-month " : "day-in-curren-month ")
                            .concat((currentDay === val[0] && currentMonth === val[1] && currentYear === val[2] ?
                                "current-day-in-calendar " : null)
                        )}>
                            <div className={val === "" ? "" : "header-day-in-the-calendar"}>
                                <p className={val === "" ? "p-day-not-in-curren-month" : null}>
                                    {val === "" ? null :
                                        <BsPlusLg onClick={
                                            (e) => {
                                                this.openModal(val, e)
                                            }}
                                                  className="icon"/>
                                    }
                                    {val[0]}
                                </p>
                            </div>

                            <div className="notes-in-the-calendar">
                                <article>
                                    <ul>
                                        {(val === "" || getNotes(val) === null) ?
                                            null :
                                            getNotes(val).map(
                                                note =>
                                                    <li className="note-name"
                                                        onClick={
                                                            (e) => {
                                                                this.openModalNote(e, val, note)
                                                            }}>
                                                        {note.name}
                                                    </li>
                                            )}
                                    </ul>
                                </article>
                            </div>
                        </div>
                    </td>
                )}
            </tr>
        )
    }
}

export default RowComponent;