export type ISubTabBar = {
    visible: boolean;
    crntPage: number;
    overPage: number;
    subPage: number;
    setCrntPage: React.Dispatch<React.SetStateAction<number>>;
    setSubPage: React.Dispatch<React.SetStateAction<number>>;
};
