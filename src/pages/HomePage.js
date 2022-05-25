import React from 'react';
import NavPart from "../parts/NavPart";
import video from "../resourses/video.mp4";
import calendar from "../resourses/calendar.png";
import statistics from "../resourses/statistics.png";


function HomePage() {
    return (
        <div className="main-container">

            <NavPart/>

            <div>
                <h1>Psaní poznámek je nyní jednodušší než kdy jindy</h1>

                <video controls>
                    <source src={video}
                            type="video/mp4"/>
                </video>

                <a className="button-want-to-try"
                   href="/calendar">
                    Chci to zkusit
                </a>
            </div>

            <div className="main-info">
                <div style={{ backgroundImage: `url(${calendar})`,
                    backgroundRepeat: 'no-repeat'}}>
                </div>
                <div style={{ backgroundImage: `url(${statistics})`,
                    backgroundRepeat: 'no-repeat'}}>
                </div>
            </div>

        </div>
    )
}

export default HomePage;