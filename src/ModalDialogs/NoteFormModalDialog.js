import * as React from 'react';
import {BsUpload, BsXLg} from "react-icons/bs";
import {useFormik} from "formik";
import {removeNote} from "../helper/Helper";
import {useState} from "react";

function Form(prop) {

    const [status, setStatus] = useState(null);

    const validate = values => {
        const errors = {};

        if (!values.date) {
            let svg = document.getElementById('area');
            console.log('svg' + svg);

            errors.date = 'Toto pole je povinné.';
        } else if (values.date.length < 8) {
            errors.date = 'Musí mít minimálně 8 znaku.';
        }

        if (!values.name) {
            errors.name = 'Toto pole je povinné.';
        } else if (values.name.length < 2) {
            errors.name = 'Musí mít minimálně 2 znaky.';
        }

        if (!values.description) {
            errors.description = 'Toto pole je povinné.';
        } else if (values.description.length > 1000) {
            errors.description = 'Musí mít maximálně 1000 znaku.';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            date: prop.date,
            name: prop.note === null ? null : prop.note.name,
            description: prop.note === null ? null : prop.note.description,
            geolocation: prop.note === null ? null : prop.note.geolocation,
            image: prop.note === null ? null :  prop.note.image,
        },
        validate,
        onSubmit: values => {
            if (prop.isNew === false && prop.note.date === values.date) {
                removeNote(values.date, prop.note);
            }

            let notes = localStorage.getItem(values.date);
            if (notes === null)
                notes = "";
            localStorage.setItem(values.date, notes.concat(JSON.stringify(values, null, 2)) + ';');

            prop.onClose();
        },
    });

    function handleChangeGeolocationCheckbox(e) {
        let isChecked = e.target.value;
        if (isChecked === "checked") {
            if (!navigator.geolocation) {
                setStatus('Váš prohlížeč nepodporuje geolokaci.');
            } else {
                setStatus('Lokalizace...');
                navigator.geolocation.getCurrentPosition((position) => {
                    setStatus(null);
                    formik.values.geolocation = position.coords.latitude + ", " + position.coords.longitude;
                }, () => {
                    setStatus('Nelze načíst vaši polohu.');
                });
            }
        } else {
            setStatus(null);
        }
    }

    function handlerImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            formik.values.image =  URL.createObjectURL(img);
        }
    }

    return (
        <div onClick={prop.onClose}
             className="window">
            <div onClick={(e) => e.stopPropagation()}
                 className="content">

                <div className="modal-header">
                    <p>{prop.isNew ? "New note" : "Update note"}</p>
                    <BsXLg className="icon-close-window"
                           onClick={prop.onClose}/>
                </div>

                <form className="form-new-note"
                      onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input id="date"
                               className={formik.errors.date ? "error-input" : "success-input"}
                               type="date"
                               required={true}
                               autoFocus
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.date}
                        />
                        {formik.errors.date ? <div className="error">{formik.errors.date}</div> : null}

                        <label htmlFor="name">Name</label>
                        <input id="name"
                               className={formik.errors.name ? "error-input" :
                                   (formik.values.name !== null ? "success-input" : "")}
                               type="text"
                               required={true}
                               placeholder="Zadejte název poznámky..."
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.name}
                        />
                        {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}

                        <label htmlFor="description">Popis</label>
                        <textarea id="description"
                                  className={formik.errors.description ? "error-input" :
                                      (formik.values.description !== null ? "success-input" : '')}
                                  placeholder="Zadejte popis poznámky..."
                                  required={true}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.description}
                        >
                    </textarea>
                        {formik.errors.description ? <div className="error">{formik.errors.description}</div> : null}

                    </div>
                    <div>
                        <div className='container-file-input'>
                            <label htmlFor="file">Přidat soubor</label>
                            <BsUpload className="icon-upload-file"/>
                            {formik.values.image === null ? null :
                                <img alt="image" src={formik.values.image}/>
                            }
                            <div id="file-input">
                                <input id="file"
                                       type="file"
                                       accept="image/*"
                                       multiple
                                       onChange={handlerImageChange}
                                />
                            </div>
                        </div>

                        <label htmlFor="location" className="location-label">
                            Zapamatovat si moji polohu
                            <span>{status}</span>
                        </label>
                        <input id="location"
                               type="checkbox"
                               onChange={handleChangeGeolocationCheckbox}
                               value="checked"
                        />

                        <div className="buttons-form">
                            <button className="save-button"
                                    type="submit">
                                <span>Uložit</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const ModalForm = (prop) => {
    if (!prop.show)
        return null;
    return Form(prop);
}