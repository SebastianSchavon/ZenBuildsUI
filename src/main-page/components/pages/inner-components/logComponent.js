import {
    LogDiv
} from "./logComponentElements"

const LogComponent = ({ Log }) => {
    return ( 
        <LogDiv>
            <p>Date: {Log.date}</p>
            <p>Ip: {Log.ip}</p>
            <p>Authentication successful? {Log.authSuccessful}</p>
        </LogDiv>
    );
}
 
export default LogComponent;