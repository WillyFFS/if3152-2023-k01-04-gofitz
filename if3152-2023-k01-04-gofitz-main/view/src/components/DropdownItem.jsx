import React from "react";

function DropdownItem(props) {
    return(
        <li><button data-testid="DropdownItem" onClick={props.methodClick} className="remove-button dropdown-item">Lapangan {props.id}</button></li>
    );
}

export default DropdownItem;