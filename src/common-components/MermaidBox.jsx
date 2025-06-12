
import React, { useEffect, useState, memo, useRef } from "react";
import mermaid from "mermaid";
import { Box, Typography, IconButton } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import "./styles.css";

mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    themeCSS: `
    .node text {
        font-size: 12px;
    }
    .node .label {
        font-size: 12px;
    }
`,

});

const MermaidBox = memo(({ code, loading }) => {
    const [zoom, setZoom] = useState(1);
    const [copied, setCopied] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const mermaidRef = useRef(null);

    const handleZoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
    };

    const renderMermaid = async () => {
        try {
            mermaid.contentLoaded();
        } catch (error) {
            console.error("Error rendering Mermaid diagram:", error);
        }
    };
    const handleFullscreenToggle = () => {
        if (!isFullscreen) {
            if (mermaidRef.current.requestFullscreen) {
                mermaidRef.current.requestFullscreen();
            } else if (mermaidRef.current.mozRequestFullScreen) { /* Firefox */
                mermaidRef.current.mozRequestFullScreen();
            } else if (mermaidRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                mermaidRef.current.webkitRequestFullscreen();
            } else if (mermaidRef.current.msRequestFullscreen) { /* IE/Edge */
                mermaidRef.current.msRequestFullscreen();
            }
            // Toggle fullscreen state when the user exits fullscreen mode
            const handleFullscreenChange = () => {
                if (!document.fullscreenElement) {
                    setIsFullscreen(false);
                    document.removeEventListener('fullscreenchange', handleFullscreenChange);
                }
            };
            document.addEventListener('fullscreenchange', handleFullscreenChange);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        renderMermaid();
    }, []);

    function cleanMermaidCode(mermaidCode) {
        // Define a set of replacements for special characters or problematic patterns
        const replacements = [
            // { pattern: /"/g, replacement: '\\"' }, // Escape double quotes
            { pattern: /\[(https?:\/\/.*?)\]\(https?:\/\/(.*?)\)/g, replacement: '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>' },
            {
                pattern: /\[([^\]]*?)\((.*?)\)([^\]]*?)\]/g, replacement: (match, p1, p2, p3) => {
                    if (p1 === '' && p3 === '') {
                        return `[(${p2})]`;
                    }
                    return `[${p1}${p2}${p3}]`;
                }
            }, // Remove parenthesis inside brackets
            {
                pattern: /\{([^}]*)\((.*?)\)([^}]*)\}/g, replacement: (match, p1, p2, p3) => {
                    if (p1 === '' && p3 === '') {
                        return `{${p2}}`;
                    }
                    return `{${p1}${p2}${p3}}`;
                }
            },
            {
                pattern: /\|([^|]*)\((.*?)\)([^|]*)\|/g, replacement: (match, p1, p2, p3) => {
                    if (p1 === '' && p3 === '') {
                        return `|${p2}|`;
                    }
                    return `|${p1}${p2}${p3}|`;
                }
            },
            // Add more patterns if needed
        ];
        let cleanedCode = mermaidCode;
        replacements.forEach(({ pattern, replacement }) => {
            cleanedCode = cleanedCode.replace(pattern, replacement);
        });
        return cleanedCode;
    }
    const match = code.match(/```mermaid\n([\s\S]*?)```/);
    const mermaidCode = match ? match[1] : code;
    const sanitizedMermaidCode = cleanMermaidCode(mermaidCode);

    const handleCopy = () => {
        navigator.clipboard.writeText(sanitizedMermaidCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };
    return (
        <Box
            ref={mermaidRef}
            sx={{
                mb: 2,
                mt: 2,
                border: "1px solid #ccc",
                borderRadius: "5px",
                overflow: "hidden", // Ensures the diagram stays within bounds
                position: "relative",
                width: "100%",
                height: "auto",
                backgroundColor: "white",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#676767",
                    borderRadius: "5px 5px 0 0",
                    padding: "5px",
                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                    Mermaid
                </Typography>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                    {!copied && (<IconButton onClick={handleCopy} sx={{ color: '#fff' }}>
                        <ContentCopyIcon />
                    </IconButton>
                    )}
                    {copied && (
                        <Typography sx={{ color: '#fff', padding: '8px' }}>
                            Copied!
                        </Typography>
                    )}
                    <IconButton onClick={handleFullscreenToggle}>
                        {isFullscreen ? (
                            <FullscreenExitIcon style={{ color: "white" }} />
                        ) : (
                            <FullscreenIcon style={{ color: "white" }} />
                        )}
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 1,
                        display: "flex",
                        gap: "5px",
                    }}
                >
                    <Box
                        component="button"
                        sx={{
                            background: "#676767",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            padding: "5px",
                            fontSize: "1.2em",
                            borderRadius: "3px",
                        }}
                        onClick={handleZoomIn}
                    >
                        +
                    </Box>
                    <Box
                        component="button"
                        sx={{
                            background: "#676767",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            padding: "5px",
                            fontSize: "1.2em",
                            borderRadius: "3px",
                        }}
                        onClick={handleZoomOut}
                    >
                        -
                    </Box>
                </Box>
                <Box sx={{ overflowX: 'auto', overflowY: 'auto', backgroundColor: "white" }}>
                    <Box
                        sx={{
                            backgroundColor: "white",
                            color: "#ccc",
                            padding: "1em",
                            minHeight: "500px",
                            transform: `scale(${zoom})`,
                            transformOrigin: "top left",
                            transition: "transform 0.2s ease",
                            whiteSpace: "nowrap",
                            borderRadius: "0 0 5px 5px",
                            overflow: "auto",

                        }}
                        className={loading ? "mermaid-loading" : "mermaid"}
                    >
                        {sanitizedMermaidCode}
                    </Box>
                </Box>

            </Box>
        </Box>
    );
});

export default React.memo(MermaidBox);