import {
    ExternalServiceReducerInterface,
    initialState,
    useExternalServicesReducer,
} from 'data/reduces/ExternalServiceReducer';
import { createContext } from 'react';
import React, { PropsWithChildren } from 'react';

const initialValue: ExternalServiceReducerInterface = {
    externalServicesDispatch: () => {},
    externalServicesState: initialState,
};
export const ExternalServiceContex = createContext(initialValue);

export const ExternalServiceProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const provider = useExternalServicesReducer();

    return (
        <ExternalServiceContex.Provider value={provider}>
            {children}
        </ExternalServiceContex.Provider>
    );
};
