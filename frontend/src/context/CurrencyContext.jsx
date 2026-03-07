import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', locale: 'en-US' },
    INR: { code: 'INR', symbol: '₹', locale: 'en-IN' },
    EUR: { code: 'EUR', symbol: '€', locale: 'de-DE' },
    GBP: { code: 'GBP', symbol: '£', locale: 'en-GB' },
};

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem('fintech_currency');
        return saved && CURRENCIES[saved] ? saved : 'INR';
    });

    useEffect(() => {
        localStorage.setItem('fintech_currency', currency);
    }, [currency]);

    const formatCurrency = (amount, maximumSignificantDigits = 21) => {
        if (amount === undefined || amount === null) return '';
        const curr = CURRENCIES[currency];
        return new Intl.NumberFormat(curr.locale, {
            style: 'currency',
            currency: curr.code,
            maximumSignificantDigits
        }).format(amount);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, CURRENCIES }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
