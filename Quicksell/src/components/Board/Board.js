import fetch_data from "../../utiles/fetch_data";
import groupme from "../../utiles/gruop_data";
import { useEffect, useState } from "react";
import Loading from '../Loading/Loading'
import "./Board.css"
import List from "../../assets/icons/list.png"
import Group from "../Group/Group";

function Board() {
    const [apidata, setapidata] = useState({});
    const [groups, setGroups] = useState();
    const [displayOn, setDisplayON] = useState(false);
    const [state1, setState1] = useState("Status",);
    const [state2, setState2] = useState("Priority");
    useEffect(() => {
        const apicall = async () => {
            const data = await fetch_data("https://api.quicksell.co/v1/internal/frontend-assignment ");
            setapidata(data);
        }
        apicall();
    }, []);
    useEffect(() => {
        if (apidata !== undefined && state1 !== undefined && state2 !== undefined && apidata.tickets !== undefined && apidata.users !== undefined)
            setGroups(groupme(state1, state2, apidata));
    }, [state1, state2, apidata]);

    function displayClickHandler() {
        setDisplayON(!displayOn);
    }

    return (
        <div className="board">
            <div className="header1">
                <button onClick={displayClickHandler} className="display">
                    <img src={List} alt="list-icon" />
                    Display
                </button>
            </div>
            {displayOn &&
                <div className="stateContainer">
                    <div className="states">
                        Grouping
                        <select value={state1} onChange={(event) => { setState1(event.target.value) }}>
                            <option value="Status">
                                Status
                            </option>
                            <option value="User">
                                User
                            </option>
                            <option value="Priority">
                                Priority
                            </option>
                        </select>
                    </div>
                    <div className="states">
                        Ordering
                        <select value={state2} onChange={(event) => { setState2(event.target.value) }}>
                            <option value="Priority">
                                Priority
                            </option>
                            <option value="Title">
                                Title
                            </option>
                        </select>
                    </div>
                </div>}

            <div className="header2">
                {
                    (groups !== undefined) ? groups.map((element, index) => {
                        return (apidata !== undefined && apidata.tickets !== undefined) ? (<Group key={index} icon={element.icon} cards={element.cards} title={element.status} grouping={state1} />) : <Loading />
                    }) : <Loading />
                }

            </div>


        </div>
    )
}

export default Board;