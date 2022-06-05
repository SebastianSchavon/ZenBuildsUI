import {
    LogDiv,
    LogDivRow,
    LogP1
} from "./logComponentElements"

const LogComponent = ({ Log }) => {
    return ( 
        <LogDiv>
            <LogDivRow>Date: <LogP1>{Log.date}</LogP1></LogDivRow>
            <LogDivRow>IP: <LogP1>{Log.ip}</LogP1></LogDivRow>
            <LogDivRow>Authentication success: <LogP1>{'' + Log.authSuccessful}</LogP1></LogDivRow>
            
        </LogDiv>
    );
}
 
export default LogComponent;