import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    Typography,
    Grid,
    useMediaQuery,
    useTheme,
    Box
} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { tokens } from "../../../../theme.js";

const SettingsModal = ({ visible, onClose, onSave }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [settings, setSettings] = useState({
        codeSuggestion: true,
        mermaidDiagram: true,
    });

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem('askme-settings'));
        if (savedSettings) {
            setSettings(savedSettings);
        }
    }, [visible]);

    const handleToggle = (key) => {
        setSettings((prevSettings) => {
            const newSettings = { ...prevSettings, [key]: !prevSettings[key] };
            return newSettings;
        });
    };

    const handleSave = () => {
        localStorage.setItem('askme-settings', JSON.stringify(settings));
        onSave(settings);
        onClose();
    };

    return (
        <Dialog
            open={visible}
            onClose={onClose}
            aria-labelledby="settings-dialog-title"
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    width: isSmallScreen ? '80%' : '40%',
                },
            }}
        >
            <DialogTitle id="settings-dialog-title">
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                    Settings
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Box style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "10px" }}>
                        JIRA Creation
                    </Typography>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={9}>
                            <Typography>Code Suggestion</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Switch
                                checked={settings.codeSuggestion}
                                onChange={() => handleToggle('codeSuggestion')}
                                color="secondary"
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={3} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <Typography variant="h5"  style={{ fontWeight: "bold", marginBottom: "10px" }}>
                        SNOW Data Center
                    </Typography>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={9}>
                            <Typography>Mermaid Diagram</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Switch
                                checked={settings.mermaidDiagram}
                                onChange={() => handleToggle('mermaidDiagram')}
                                color="secondary"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <IconButton aria-label="cancel" onClick={onClose}>
                    <ClearIcon style={{ color: "red" }} fontSize="large" />
                </IconButton>
                <IconButton onClick={handleSave} aria-label="save">
                    <CheckIcon
                        style={{ color: colors.tertiary[400] }}
                        fontSize="large"
                    />
                </IconButton>
            </DialogActions>
        </Dialog >
    );
};

export default SettingsModal;