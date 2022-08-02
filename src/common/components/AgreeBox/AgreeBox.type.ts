export type IAgreeBox = {
    allAgree: boolean | undefined;
    ageAgree: boolean;
    serviceAgree: boolean;
    privateAgree: boolean;
    adAgree: boolean;
    allHandleChange: () => void;
    setAgeAgree: any;
    setServiceAgree: any;
    setPrivateAgree: any;
    setAdAgree: any;
    handleChange: any;
};
