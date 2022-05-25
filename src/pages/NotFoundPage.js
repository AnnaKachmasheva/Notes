import React from 'react';
import Footer from "../parts/FooterPart";

const NoteFound = () => (
    <div>
        <div className="error-container">
            <h1>Stránka nenalezena</h1>
            <h2>Error 404</h2>
            <a href='/'>Jít na domovskou stránku</a>
        </div>
        <Footer/>
    </div>
);

export default NoteFound;