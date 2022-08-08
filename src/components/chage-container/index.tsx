import React from 'react';
import {Box, Card, CardContent, Container, Grid, Typography} from "@mui/material";
import useTranslation from 'next-translate/useTranslation';
import Charge from "./Charge";
import Invoice from "./Invoice";

const Index = () => {
    const {t} = useTranslation('common')

    return (
        <Box className={'h-full lg:flex md:flex items-center sm:block sm:mt-5 '}>
            <Container>
                <Card className={'shadow-charge-container rounded-[15px] '}>
                    <CardContent>
                        <Grid container>
                            <Grid item sm={12} md={7} lg={7}>
                                <Charge />
                            </Grid>
                            <Grid item sm={12} md={5} lg={5}>
                                <Invoice />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Index;