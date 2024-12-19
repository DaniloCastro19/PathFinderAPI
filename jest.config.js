/**@type {import('jest').Config} */

const config = {
    verbose: true,
    fakeTimers:{
        enableGlobally:true,
        timerLimit:10000,
    },
    transform: {},
    collectCoverage: true, 
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
};

export default config;