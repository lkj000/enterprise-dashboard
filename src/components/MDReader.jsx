import React, { useState, useEffect } from 'react';
import {Alert, AlertTitle } from "@mui/material";

const MDReader = ({ filePath }) => {
    const [content, setContent] = useState('');


    useEffect(() => {
        fetch(filePath)
            .then(response => response.text())
            .then(text =>  text.split(';').map((inc) => {
                 // HEADING Tag
                
            
             
                    const linkText = inc.substring(1,inc.indexOf(']'));
                    const linkUrl = inc.substring(inc.indexOf('(')+1, inc.lastIndexOf(')'));
                    return `<p><li><a href=${linkUrl} target="_blank">${linkText}</a></li></p>`;
                   
                
             
            }).join('\n')).then(check => setContent(`<ul>${check}</ul>`))
            .catch(err => console.error(err));
    }, [filePath]);

    const customLinkColor = {
        color: '#00C0F4',
        fontSize: '14.5px',
        paddingLeft: '23px',
        listType: 'square'
    };

    const customStyle = `
        .custom-link-color a {
            color: ${customLinkColor.color};
            font-size: ${customLinkColor.fontSize};
        }

        .custom-link-color ul {
            padding-left: ${customLinkColor.paddingLeft};
        }

        .custom-link-color li {
            list-style-type: ${customLinkColor.listType};
        }

        .custom-link-color p {
            font-size: ${customLinkColor.fontSize};
        }
    `;

    return (

        <Alert severity="success" style={{backgroundColor:"transparent"}}>            
            <AlertTitle sx={{ fontSize: "16px" }}>
            <   strong>FAQ</strong> 
            </AlertTitle>
            <hr/>
            <style dangerouslySetInnerHTML={{ __html: customStyle }} />
            <div 
                dangerouslySetInnerHTML={{ __html: content }}
                className="custom-link-color" 
            />                                
        </Alert>

    );
};

export default MDReader;