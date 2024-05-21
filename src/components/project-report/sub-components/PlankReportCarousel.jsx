import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';



export function PlankReportCarousel({ slides, tree, log, plank }) {

    useEffect(() => {
        console.log("PlankReportCarousel rendered with tree:", tree, "log:", log, "plank:", plank);
    }, [tree, log, plank]);

    return (
        <Carousel
            animation="slide"
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            indicators={true}
            duration={1500}
        >
            {slides.map((SlideComponent, index) => (
                <Paper key={index} style={{ padding: 20, height: 'auto', minHeight: 300 }} elevation={3}>
                    {SlideComponent(tree, log, plank)}
                </Paper>
            ))}
        </Carousel>
    );
}

