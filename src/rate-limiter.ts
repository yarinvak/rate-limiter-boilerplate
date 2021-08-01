const limitTracker: Record<string, Record<string, {timestamps: number[], index: number, errorCounter: number}>> = {};
const timeRangeInMilliSeconds = 1000;
const rateLimit = 5;

export const canPerformRequest = (userId: string, route: string, timestamp: number): boolean => {
    updateTracker(userId, route, timestamp);
};

// TODO: Verify keys exist for both user and route
const isRequestRateValid = (userId: string, route: string, timestamp: number): boolean => {
    const userData = limitTracker[userId];
    const routeData = userData[route]
};

// @ts-ignore
const updateTracker = (userId: string, route: string, timestamp: number) => {

};
