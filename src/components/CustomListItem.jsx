import React from "react";
import { IconButton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Divider from '@mui/material/Divider';
import InfoIcon from '@mui/icons-material/Info';

function CustomListItem({
    actionIcon: ActionIcon,
    listItemText,
    listItemUrl,
    wikiUrl
}) {

    const handleIconClick = (url, event) => {
        event.stopPropagation();
        window.open(url, '_blank');
    };

    const openLink = (url) => {
        window.open(url, '_blank');
    }

    return(
        <>
            <ListItemButton
                onClick={() => { openLink(listItemUrl); } }
            >
                <ListItemIcon>
                    <ActionIcon />
                </ListItemIcon>
                <ListItemText
                    primary={listItemText} />
                {wikiUrl !== ""?                    
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={(e) => handleIconClick(wikiUrl, e)}>
                        <InfoIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                :""}
            </ListItemButton>
            <Divider variant="inset" component="li" />
        </>
    );
}

export default CustomListItem;
