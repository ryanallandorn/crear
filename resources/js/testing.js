// resources/js/testing.js

let ray = null;

// Dynamically import node-ray only in development
if (import.meta.env.MODE === 'development') {
    import('node-ray').then((module) => {
        ray = module.ray;
    });
}

// Export `logData` for use in other files
export const logData = (data, label) => {
    if (ray) {
        ray(data).label(label);
    } else {
        console.log(`[${label}]`, data);
    }
};
