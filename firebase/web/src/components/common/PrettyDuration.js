import React from 'react';
const moment = require('moment')

function PrettyDuration(props) {
    const intSeconds = parseInt(props.seconds);
    const prettyDuration = moment().startOf('day').seconds(intSeconds).format('HH:mm:ss');

    return (<span>
        {prettyDuration}
    </span>)
}

export default PrettyDuration
