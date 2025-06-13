import React, { useEffect,useState } from "react";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Import Prism's theme
import { Box, Typography,IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Add support for different languages if needed
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
// Add support for other common languages if needed

const CodeBox = ({ code }) => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    // Extract the language and code from the fenced block
    const match = code.match(/```(\w+)\n([\s\S]*?)```/);
    const language = match ? match[1] : 'text';
    const cleanedCode = code.replace(/```/g, '');
    const codeText = match ? match[2] : cleanedCode;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    return (
        <Box sx={{
            mb: 2,
            mt: 2,
            border: '1px solid #ccc',
            borderRadius: '5px',
        }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#676767',
                    borderRadius: '5px 5px 0 0 ',

                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', padding: '5px' }}>
                    {language}
                </Typography>
                {!copied && (<IconButton onClick={handleCopy} sx={{ color: '#fff' }}>
                    <ContentCopyIcon />
                </IconButton>
                )}
                {copied && (
                    <Typography  sx={{ color: '#fff', padding: '8px' }}>
                        Copied!
                    </Typography>
                )}
            </Box>
            <Box
                component="pre"
                sx={{
                    backgroundColor: '#2d2d2d', // Similar to Prism Tomorrow theme
                    color: '#ccc',
                    padding: '1em',
                    overflowX: 'auto',
                    overflowY: 'auto',
                    maxHeight: '400px',
                    marginTop: '0px',
                    marginBottom: '1px',
                }}
            >
                <code className={`language-${language}`} >{codeText}</code>
            </Box>
        </Box >
    );
}

export default CodeBox;