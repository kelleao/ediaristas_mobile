import {
    NEXT_PUBLIC_API,
    NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY,
    // @ts-ignore
} from '@env';

const RN_ENV = {
    NEXT_PUBLIC_API,
    NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY,
};

for (const key in RN_ENV) {
    if (!process.env[key]) {
        // @ts-ignore
        process.env[key] = RN_ENV[key];
    }
}
