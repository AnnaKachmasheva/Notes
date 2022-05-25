import * as React from "react";
import {useState} from "react";
import {BsArchive, BsXLg} from "react-icons/bs";
import {allKeys, getListNotes} from "../helper/Helper";
import {ModalForm} from "./NoteFormModalDialog";
import ModalConfirm from "./ConfirmModalDialog";

const AllNotesModalDialog = (prop) => {

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showModalForm, setShowModalForm] = useState(false);
    const [date, setDate] = useState(null);
    const [note, setNote] = useState(null);
    const [typeConfirmModal, setTypeConfirmModal] = useState(null);

    if (!prop.show)
        return (<></>);

    function handlerConfirmRemoveOne(e, isShow, date, note) {
        setShowConfirmDialog(isShow);
        setDate(date);
        setNote(note);
        setTypeConfirmModal('removeOne');

        e.preventDefault();
    }

    function handlerConfirmRemoveAll(e, isShow) {
        setShowConfirmDialog(isShow);
        setTypeConfirmModal('removeAll');

        e.preventDefault();
    }

    function handleUpdate(e, isShow, date, note) {
        setShowModalForm(true);
        setDate(date);
        setNote(note);

        e.preventDefault();
    }

    return (
        <div className='all-notes-container'>
            <ModalConfirm onClose={() => setShowConfirmDialog(false)}
                          show={showConfirmDialog}
                          date={date}
                          note={note}
                          type={typeConfirmModal}
            />

            <ModalForm onClose={() => setShowModalForm(false)}
                       show={showModalForm}
                       date={date}
                       note={note}
                       isNew={false}
            />

            <div onClick={prop.onClose}
                 className="window-all-notes">
                <div onClick={(e) => e.stopPropagation()}
                     className="content">

                    <div className="modal-header">
                        <p>All notes</p>
                        <BsXLg className="icon-close-window"
                               onClick={prop.onClose}/>
                    </div>

                    <div className="list-notes">
                        {allKeys.map(date =>
                            <div>
                                <p>{date.length === 10 ? date : ""}</p>
                                <ul>
                                    {getListNotes(date).map(note =>
                                        <li>
                                            <article>
                                                <p>{date.length === 10 ? note.name : ""}</p>
                                                <p className="description">
                                                    {date.length === 10 ? note.description : ""}</p>
                                            </article>
                                            <div>
                                                <button className=""
                                                        onClick={(e) => {
                                                            handleUpdate(e, true, date, note)
                                                        }}>
                                                    <span>Změnit</span>
                                                </button>
                                                <button className="confirm-button-no"
                                                        onClick={(e) => {
                                                            handlerConfirmRemoveOne(e, true, date, note)
                                                        }}>
                                                    <span>Odstanit</span>
                                                </button>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="button-clear">
                        <button className="confirm-button-no"
                                onClick={(e) => {
                                    handlerConfirmRemoveAll(e, true)
                                }}>
                            Odstanit všechny
                            <BsArchive className="icon-clear"
                                       onClick={prop.onClose}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllNotesModalDialog;