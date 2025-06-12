import React from 'react';
import WikiData from '../data-json/wikiInfo.json';
import { Box, Link, Typography } from '@mui/material';

const WikiInfo = ({ path }) => {
    const data = WikiData.find(item => item[path]);

    if(!data){
        return <Typography variant="h5">Coming Soon!</Typography>
    }

    const {title, description, images} = data[path];

    return (
            <Box width='100%' alignItems='center' justifyContent='center'>
                <Typography variant="h2">{title}</Typography>
                <br />
                <Typography variant="h4">{description}</Typography>
                <br />
                {images.map((image, index) => (
                    <div key={index}>
                        {Object.entries(image).map(([key, value]) => (
                            key === 'imgurl' ? (
                                <><Box
                                    key={key}
                                    alignItems='center'
                                    justifyContent='center' 
                                    width='100%'                                 
                                    
                                    >
                                        <img src={`${process.env.PUBLIC_URL}/${value}`} alt={`Wiki ${index + 1}`} styke={{maxWidth: '100%', maxHeight: '100%'}} />
                                    </Box><br /></>
                            ) : key === 'txturl' ? 
                            (
                                <><Typography key={key} variant="h5">
                                    URL : <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href={value}>{value}</Link>
                                </Typography><br />
                                </>
                            ) :
                            (
                                <><Typography key={key} variant="h5">{value}</Typography><br /></>                               
                            )
                        ))}
                    </div>
                ))}
            </Box>
    );
};

export default WikiInfo;