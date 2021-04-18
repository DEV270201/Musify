import React from "react";
import "../Css/PopUp.css";

const PopUp = ({office}) => {
    return (
        <>
            <div class="info">
                <div class="info_head">
                    <h4 class="info_head1">{office.properties.Name}</h4>
                </div>
                <div class="add_info">
                    <p class="add_info1">{office.properties.Address}</p>
                    <a class="add_info2" href={`tel:${office.properties.TelNo}`}>{office.properties.TelNo}</a>
                </div>
            </div>
        </>
    );
}

export default PopUp;