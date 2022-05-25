import * as React from "react";
import {useState} from "react";
import {ModalForm} from "./NoteFormModalDialog";
import {BsXLg} from "react-icons/bs";
import ModalConfirm from "./ConfirmModalDialog";

const NoteModalDialog = (props) => {

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showModalForm, setShowModalForm] = useState(false);

    if (!props.show)
        return null;

    function handlerConfirm(e) {
        setShowConfirmDialog(true);
        e.preventDefault();
    }

    function handleUpdate(e) {
        setShowModalForm(true);
        e.preventDefault();
    }

    return (
        <div className="modal-note"
             onClick={props.onClose}>

            <ModalConfirm onClose={() => setShowConfirmDialog(false)}
                          show={showConfirmDialog}
                          date={props.date}
                          note={props.note}
                          type={'removeOne'}
            />

            <ModalForm onClose={() => setShowModalForm(false)}
                       show={showModalForm}
                       date={props.date}
                       note={props.note}
                       isNew={false}
            />

            <div className="modal-note-content"
                 onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">
                    <p>Note</p>
                    <BsXLg className="icon-close-window"
                           onClick={props.onClose}/>
                </div>

                <div className="modal-note-body">
                    <section><span>Datum: </span> {props.date}</section>
                    <section><span>Název: </span>{props.note.name}</section>
                    <section><span>Popis: </span>{props.note.description}</section>
                    <section><span>Geolokace: </span>{props.note.geolocation}</section>
                    <div>
                        {props.note.image === null ? null :
                            <img alt="image-note"
                                 src={props.note.image}
                                 style={{height: 200, width: null, flex: 1}}/>}
                    </div>
                </div>

                <div className="modal-confirm-buttons">
                    <button className="confirm-button-yes"
                            onClick={(e) => {
                                handleUpdate(e)
                            }}>
                        Aktualizovat
                    </button>
                    <button className="confirm-button-no"
                            onClick={(e) => {
                                handlerConfirm(e)
                            }}>
                        Odstranit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteModalDialog;