import * as React from "react";
import {removeNote} from "../helper/Helper";
import {Draggable} from "drag-react";

const ModalConfirm = (props) => {

    if (!props.show)
        return null;

    function remove(key, noteToRemove) {
        if (props.type === "removeOne")
            removeNote(key, noteToRemove);
        else
            localStorage.clear();
        props.onClose();
    }

    return (
        <div className="modal-confirm"
             onClick={props.onClose}>
            <Draggable>
                <div className="modal-confirm-container">
                    <div className="modal-confirm-content"
                         onClick={(e) => e.stopPropagation()}>

                        <div className="modal-confirm-header">
                            <p>{props.type === "removeOne" ?
                                "Opravdu chcete poznámku smazat?" :
                                "Opravdu chcete smazat všechny poznámky?"}</p>
                        </div>

                        {props.type === "removeOne" ?
                            <div className="modal-confirm-body">
                                <p><span>Datum: </span>{props.date}</p>
                                <p><span>Název: </span>{props.note.name}</p>
                                <p><span>Popis: </span>{props.note.description}</p>
                            </div>
                            :
                            <p>Smazání všech záznamů bude neodvolatelné. Již je nelze obnovit.</p>
                        }

                        <div className="modal-confirm-buttons">
                            <button className="confirm-button-yes"
                                    onClick={() => {remove(props.date, props.note)}}>
                                Ano
                            </button>
                            <button className="confirm-button-no"
                                    onClick={props.onClose}>
                                Ne
                            </button>
                        </div>
                    </div>
                </div>
            </Draggable>
        </div>
    )
}

export default ModalConfirm;