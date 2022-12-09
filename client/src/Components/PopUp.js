import React from "react";
import "../Css/PopUp.css";

const PopUp = ({office}) => {
    return (
        <>
            <div className="info">
                <div className="info_head">
                    <h4 className="info_head1">{office.properties.Name}</h4>
                </div>
                <div className="add_info">
                    <p className="add_info1">{office.properties.Address}</p>
                    <a className="add_info2" href={`tel:${office.properties.TelNo}`}>{office.properties.TelNo}</a>
                </div>
            </div>
        </>
    );
}

export default PopUp;