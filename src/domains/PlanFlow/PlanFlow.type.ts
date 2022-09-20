export type IPlanFlow = {
    data: {
        plantName: string;
        plans: {
            date: string;
            text: string;
        }[];
    }[];
    currentDate: Date;
};
