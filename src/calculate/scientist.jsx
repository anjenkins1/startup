import React from 'react';

import { CalcEvent, CalcNotifier } from './calculateNotifier';
import './scientist.css';

export function Scientists(props) {
  const userName = props.userName;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    CalcNotifier.addHandler(handleCalcEvent);

    return () => {
        CalcNotifier.removeHandler(handleCalcEvent);
    };
  });

  function handleCalcEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = ' unknown';
      if (event.type === CalcEvent.End) {
        message = ` saved a calculation`;
      } else if (event.type === CalcEvent.Start) {
        message = ` started a new calculation`;
      } else if (event.type === CalcEvent.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className='event'>
          <span className={'player-event'}>{event.from.split('@')[0]}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className='Scientists' >
      Scientist<br/>
      <span className='scientists-name'>{userName}</span>
      <div id='scientists-messages'>{createMessageArray()}</div>
    </div>
  );
}
