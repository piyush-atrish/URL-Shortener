export const wrapAsync = (fn) => {
    return (req, res, next) => {
        // Execute the function and catch any errors, passing them to next()
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};