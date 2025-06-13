import React from 'react';
import TypingEffect from '../../../common-components/TypingEffect';
import { ListItem, ListItemText, Grid, Typography, Box } from '@mui/material';
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import PersonIcon from "@mui/icons-material/Person";
import ResponseFeedback from './ResponseFeedback';

const areEqual = (prevProps, nextProps) => {
    return prevProps.Messages === nextProps.Messages;
};

const ChatList=({Messages,messagesEndRef,boxRef,setSendDisable,colors})=>{
 const memoizedMessages = React.useMemo(() => Messages, [Messages]);
    return (
        <>
            {memoizedMessages.map((message, index) => (
                <ListItem ref={messagesEndRef} key={index}>
                    <Grid container>
                        <Grid item xs={12} key={index}>
                            {message.prompt === "yes" ? (
                                <ListItemText align={message.align}>
                                    <Typography>
                                        <PersonIcon key="icon" fontSize="medium" />
                                        <hr color={colors.tertiary[400]} />
                                        <div padding="20%">{message.text}</div>
                                    </Typography>                                    
                                </ListItemText>
                            ) : (
                                <ListItemText align={message.align} key={index}>
                                    <Typography>
                                        <TipsAndUpdatesIcon key="icon" fontSize="medium" />
                                        <hr color={colors.tertiary[400]} />
                                        <Box marginleft="20%">
                                            <TypingEffect
                                                text={message.text}
                                                speed={200}
                                                containerRef={boxRef}
                                                id="reponse"
                                                setSendDisable={setSendDisable}
                                                alreadyMarkdown={false} // in case of markdown turn this to true
                                            />               
                                        </Box>
                                    </Typography>
                                    <ResponseFeedback correlationId={message.correlationId} />
                                </ListItemText>
                            )}
                        </Grid>
                    </Grid>
                </ListItem>
            ))}
        </>
    );
}
export default React.memo(ChatList, areEqual);