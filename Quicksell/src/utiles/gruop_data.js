import Icon1 from '../assets/icons/Backlog.svg'
import Icon2 from '../assets/icons/To-do.svg'
import Icon3 from '../assets/icons/in-progress.svg'
import Icon4 from '../assets/icons/down.svg'
import Icon5 from '../assets/icons/Cancelled.svg'

import Icon from '../assets/icons/user.png'

import Icon6 from '../assets/icons/No-priority.svg'
import Icon7 from '../assets/icons/SVG - Urgent Priority colour.svg'
import Icon8 from '../assets/icons/Img - High Priority.svg'
import Icon9 from '../assets/icons/Img - Medium Priority.svg'
import Icon10 from '../assets/icons/Img - Low Priority.svg'



function groupme(group, order, apidata) {
    const allCards = apidata.tickets;
    const users = apidata.users;
    const userMap = new Map();
    users.forEach((element) => {
        userMap.set(element.id, element.name);
    })
    const arr = [];
    if (group === "Status") {
        const statusArray = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
        const IconArray = [Icon1, Icon2, Icon3, Icon4, Icon5]

        statusArray.forEach((statusElement, index) => {
            const groupObj = { status: statusElement, cards: [], icon: IconArray[index] };
            allCards.forEach((cardElement) => {
                if (cardElement.status === statusElement) {
                    groupObj.cards.push(cardElement);
                }
            });
            arr.push(groupObj);
        })
    }



    if (group === "User") {
        const statusSet = new Set();
        allCards.forEach(element => {
            statusSet.add(userMap.get(element.userId));
        });

        statusSet.forEach((statusElement) => {
            const groupObj = { status: statusElement, cards: [], icon: Icon };
            allCards.forEach((cardElement) => {
                if (userMap.get(cardElement.userId) === statusElement) {
                    groupObj.cards.push(cardElement);
                }
            });
            arr.push(groupObj);
        })
    }


    if (group === "Priority") {
        const statusSet = [4, 3, 2, 1, 0];
        const IconArray = [Icon6, Icon7, Icon8, Icon9, Icon10]

        const priorityArray = ["No priority", "Low", "Medium", "High", "Urgent"];
        statusSet.forEach((statusElement, index) => {
            const groupObj = { status: priorityArray[statusElement], cards: [], icon: IconArray[index] };
            allCards.forEach((cardElement) => {
                if (cardElement.priority === statusElement) {
                    groupObj.cards.push(cardElement);
                }
            });
            arr.push(groupObj);
        })
    }

    if (order === "Priority") {
        arr.forEach((element) => {
            element.cards.sort((a, b) => (b.priority - a.priority));
        })
    }
    if (order === "Title") {
        arr.forEach((element) => {
            element.cards.sort((a, b) => (a.title.toLowerCase().localeCompare(b.title.toLowerCase())))
        })
    }


    return arr;


}


export default groupme;