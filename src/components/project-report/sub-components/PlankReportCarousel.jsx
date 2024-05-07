import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

export function PlankReportCarousel({ children }) {
    return (
        <Carousel
            animation="slide"
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            indicators={true}
        >
            {children.map((child, index) => (
                <Slide key={index} component={child} />
            ))}
        </Carousel>
    );
}

function Slide({ component: Component }) {
    return (
        <Paper style={{ padding: 20, height: 'auto', minHeight: 300 }} elevation={3}>
            <Component />
        </Paper>
    );
}
