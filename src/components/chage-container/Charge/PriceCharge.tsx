import React, {useEffect, useState} from 'react';
import {Box, Grid, TextField, Typography} from '@mui/material';
import NumberFormat from 'react-number-format';
import {useCharge} from '../../../hooks/useCharge';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

const priceCharge = [
    {id: 1, price: 10000, isSpecial: false},
    {id: 2, price: 20000, isSpecial: false},
    {id: 3, price: 50000, isSpecial: true},
    {id: 4, price: 100000, isSpecial: true},
    {id: 5, price: 200000, isSpecial: true},
]


type PriceChargeProps = {
    setErrorPrice: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    errorPrice: boolean | undefined
}

const PriceCharge = ({errorPrice, setErrorPrice}: PriceChargeProps) => {
    const [customPrice, setCustomPrice] = useState<boolean>(false);
    const [selected, setSelected] = useState<number | null>(1)
    const {isSpecial, setPrice, price, simCardType} = useCharge()
    const {t} = useTranslation('common')

    const handleSelectedPrice = (index: number, price: number) => {
        customPrice && setCustomPrice(false)
        setSelected(index)
        setPrice(price)
    }

    const HandleInputCustomPrice = () => {
        setCustomPrice(!customPrice)
        setSelected(null)
        ValidatePrice(price)
    }
    const handleChangePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
        const price = parseInt(e.target.value)
        ValidatePrice(price)
    }
    const ValidatePrice = (priceEntries: number) => {
        if (priceEntries >= 10000 && priceEntries <= 900000) {
            setPrice(priceEntries)
            setErrorPrice(true)
        }
        else {
            setErrorPrice(false)
        }
    }

    useEffect(() => {
        if (!isSpecial) {
            setPrice(priceCharge[1].price)
        } else {
            /// find price base on special
            const indexOfFirstSpecial = priceCharge.findIndex((item) => item.isSpecial)
            handleSelectedPrice(indexOfFirstSpecial, priceCharge[indexOfFirstSpecial].price)
        }
        if (simCardType === 1) {
            /// find price based on irancell logic
            const indexOfFirstPriceBasedOnSimType = priceCharge.findIndex((item) => item.price === 50000)
            handleSelectedPrice(indexOfFirstPriceBasedOnSimType, priceCharge[indexOfFirstPriceBasedOnSimType].price)
        }
    }, [isSpecial, simCardType])

    return (
        <Box className={'mt-5 lg:w-7/12 sm:w-11/12'}>
            <Typography className={' vazir-req text-[#8b8b8d] mb-5 text-sm'}>  {t('ChargeAmount')}</Typography>
            <Grid container spacing={1}>
                {priceCharge.map((item, index) => (
                    <Grid key={index} item lg={4} xs={4} md={4} sm={4}>
                        <button
                            onClick={() => handleSelectedPrice(index, item.price)}
                            disabled={isSpecial && item.isSpecial !== isSpecial}
                            className={clsx('price-chip', {
                                ['cursor-not-allowed text-gray-400']: isSpecial && item.isSpecial !== isSpecial,
                                ['bg-primary']: index === selected
                            })}>
                            <NumberFormat
                                className={'text-sm'}
                                thousandSeparator={true}
                                displayType={'text'}
                                value={item.price}
                            />
                            <span className={'m-1 text-sm vazir-req !font-light'}>{t('currency')}</span>
                        </button>
                    </Grid>
                ))}
                <Grid item lg={4} xs={4} md={4} sm={4}>
                    <button
                        disabled={isSpecial}
                        onClick={HandleInputCustomPrice}
                        className={clsx('price-chip vazir-req', {
                            ['cursor-not-allowed text-gray-400']: isSpecial,
                            ['bg-primary']: selected === null}
                        )}>
                        {t('otherPrice')}
                    </button>
                </Grid>
            </Grid>
            {customPrice && !isSpecial && (
                <Box className={'flex flex-col items-center mt-2'}>
                    <TextField type={'number'} onChange={handleChangePrice} defaultValue={price} fullWidth/>
                    <span className={clsx('text-sm mt-4 text-center text-[#8f8f91]', {
                        ['bg-red-200 w-full py-2 rounded-[20px]'] : errorPrice === false
                    })}>{t('customPriceText')}</span>
                </Box>
            )}
        </Box>
    );
};

export default PriceCharge;
