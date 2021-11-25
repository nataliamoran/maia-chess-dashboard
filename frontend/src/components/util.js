import { SERVER_URL } from "../../env";

//function used to post an event log
export default function postEventLog(eventTitle, eventStatus){
    const log = {
        event_title: eventTitle,
        event_status: eventStatus
      }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(log)
    };
    fetch(SERVER_URL+'/api/log', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

}

