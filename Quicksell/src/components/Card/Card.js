import "./Card.css";
import Avtar from "../../assets/users/user_1.jpg";
import Warning from "../../assets/icons/warning.png";
import Icon1 from '../../assets/icons/Backlog.svg'
import Icon2 from '../../assets/icons/To-do.svg'
import Icon3 from '../../assets/icons/in-progress.svg'
import Icon4 from '../../assets/icons/down.svg'
import Icon5 from '../../assets/icons/Cancelled.svg'

import Icon from '../../assets/icons/user.png'

import Icon6 from '../../assets/icons/No-priority.svg'
import Icon7 from '../../assets/icons/SVG - Urgent Priority grey.svg'
import Icon8 from '../../assets/icons/Img - High Priority.svg'
import Icon9 from '../../assets/icons/Img - Medium Priority.svg'
import Icon10 from '../../assets/icons/Img - Low Priority.svg'


function Card(props) {
    console.log(JSON.stringify(props))

    let statusIcon = Icon;
    let priorityIcon = Icon;
    // "Backlog", "Todo", "In progress", "Done", "Canceled"
    switch (props.priority) {
        case 0: priorityIcon = Icon6
            break;
        case 1: priorityIcon = Icon10
            break;
        case 2: priorityIcon = Icon9
            break;
        case 3: priorityIcon = Icon8
            break;
        case 4: priorityIcon = Icon7
            break;
        default: priorityIcon = Icon
    }

    switch (props.status) {
        case "Backlog": statusIcon = Icon1
            break;
        case "Todo": statusIcon = Icon2
            break;
        case "In progress": statusIcon = Icon3
            break;
        case "Done": statusIcon = Icon4
            break;
        case "Canceled": statusIcon = Icon5
            break;
        default: statusIcon = Icon
    }

    return (
        <div className="Card">
            <div className="userDetails">
                <div className="userId">{props.id}</div>
                {props.grouping === 'User' ? <></> : <div>
                    <img src={Avtar} alt="avatr" className="userAvatar"></img>
                    <div className="circle1"></div>
                </div>
                }
            </div>

            {
                props.grouping === 'User' ?
                    <div className="title1"><span><img src={statusIcon} /></span>{props.title}</div> :
                    <div className="title2"> <span>{
                        props.grouping === 'Status' ?
                            <></> :
                            <img src={statusIcon} />}</span>{props.title}</div>
            }

            {<div className="tagcontainer">
                <span>
                    {props.grouping === 'Priority' ? <></> : <img src={priorityIcon}></img>}
                </span>
                {props.tags.map((element, index) => {
                    return (<div className="tag" key={index}><div className="circle2"></div>{element}</div>)

                })}
            </div>
            }
        </div>
    )
}


export default Card;