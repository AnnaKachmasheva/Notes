import React, {useState} from 'react';
import {BsFillPauseFill, BsFillPlayFill, BsGrid3X3Gap, BsPlusLg} from "react-icons/bs";
import {ModalForm} from "../ModalDialogs/NoteFormModalDialog";
import music from "../resourses/music.mp3";
import AllNotesModalDialog from "../ModalDialogs/AllNotesModalDialog";
import CanvasComponent from "../components/CanvasComponent";

function SidePanelPart() {

    const [showForm, setShowForm] = useState(false);
    const [showAllNotes, setShowAllNotes] = useState(false);

    const audio = new Audio(music);

    function play() {
        audio.play();
    }

    return (
        <div className="nav">
            <nav className="menu-max">

                <ModalForm onClose={() => setShowForm(false)}
                           show={showForm}
                           date={new Date().toJSON().slice(0, 10)}
                           note={''}
                           isNew={true}
                />

                <AllNotesModalDialog onClose={() => setShowAllNotes(false)}
                                     show={showAllNotes}/>

                <div className="buttons-music">
                    <button className="audio"
                            onClick={play}>
                        <BsFillPlayFill className="icon" />
                        <span>Play</span>
                    </button>
                    <button className="audio"
                            onClick={() => {
                                audio.pause()
                            }}>
                        <BsFillPauseFill className="icon" />
                        <span>Stop</span>
                    </button>
                </div>

                <button className="new-note"
                        onClick={() => setShowForm(true)}>
                    <span>Nová poznámka</span>
                    <BsPlusLg className="icon" />
                </button>

                <button className="all-note"
                        onClick={() => setShowAllNotes(true)}>
                    <span>Všechny poznámky</span>
                    <BsGrid3X3Gap className="icon"/>
                </button>

                <CanvasComponent />

            </nav>
        </div>

    )
}

export default SidePanelPart;