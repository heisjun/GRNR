export type ISubTabBar = {
    visible: boolean;
    overPage: number;
    crntPage: number;
    setScrollDownToggle: React.Dispatch<React.SetStateAction<boolean>>;
    setSubTabVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
