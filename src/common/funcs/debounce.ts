export const getDebouncedFunc = (callback: any, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
};
