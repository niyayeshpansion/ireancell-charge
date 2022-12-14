import React, {useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import clsx from 'clsx';
import {useCharge} from '../../../hooks/useCharge';
import useTranslation from "next-translate/useTranslation";

const ChargeType = () => {
    const {simCardType, setSimCardType, setSpecial} = useCharge()
    const {t} = useTranslation('common')

    useEffect(() => {
        simCardType === 1 && setSpecial(false)
    } ,[simCardType])
    return (
        <Box className={'mt-5 lg:w-6/12 md:w-9/12 sm:w-7/12'}>
            <Typography className={'text-center mb-3 text-[#8b8b8d] text-sm vazir-req'}>{t('simType')}</Typography>
            <Box className={'flex justify-between items-center  border-[1px] rounded-[25px] border-[#e6e6e8]'}>
                <button
                    onClick={() => setSimCardType(0)}
                    className={clsx('text-center w-full px-[7px] py-[7px] ',
                        {['rounded-[25px] bg-primary p-1 ']: simCardType === 0})}
                >
                    {t('prepaid')}
                </button>
                <button
                    onClick={() => setSimCardType(1)}
                    className={clsx('text-center w-full px-[7px] py-[7px] ',
                        {['rounded-[25px] bg-primary p-1']: simCardType === 1})}
                >
                    {t('postpaid')}
                </button>
            </Box>
        </Box>
    );
};

export default ChargeType;
