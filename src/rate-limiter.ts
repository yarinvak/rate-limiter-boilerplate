const limitTracker: Record<string, Record<string, {timestamps: number[], index: number, errorCounter: number}>> = {};
const timeRangeInMilliSeconds = 1000;
const rateLimit = 5;
// Todo: set dynamically according to rateLimit
const emptyTimestamps = [0, 0, 0, 0, 0];

export const canPerformRequest = (userId: string, route: string, timestamp: number): boolean => {
    const routeData = getUserRouteData(userId, route);
    if (isRequestRateValid(routeData, timestamp)) {
        updateTracker(routeData, timestamp);
        return true;
    } else {
        return false;
    }
};

// TODO: Verify keys exist for both user and route
const isRequestRateValid = (routeData, timestamp: number): boolean =>
     Math.abs(timestamp - routeData.timestamps[routeData.index]) > timeRangeInMilliSeconds;
;

// @ts-ignore
const updateTracker = (routeData, timestamp: number) => {
    routeData.timestamps[routeData.index] = timestamp;
    routeData.index++;
    trySendErrorLogs(routeData, userId, route);
    routeData.errorCounter = 0;
};

const getUserRouteData = (userId: string, route: string): {timestamps: number[], index: number, errorCounter: number} =>{
    let userData = limitTracker[userId];
    if (!userData) {
        userData = {}
        limitTracker[userId] = userData;
    }
    let routeData = userData[route];
    if (!routeData) {
        routeData = {timestamps: emptyTimestamps, index: 0, errorCounter: 0};
        userData[route] = routeData;
    }

    return routeData;
};

const trySendErrorLogs = (routeData, userId: string, route: string) => {
    if (routeData.errorCounter > 0) {
        console.log(`user ${userId} sent ${routeData.errorCounter} request outside of rate`);
        routeData.errorCounter = 0;
    }
};
