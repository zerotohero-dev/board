let every = (seconds, delegate) => {
    setInterval(() => {
        try {
            delegate();
        } catch (ignore) {
            console.log(ignore);
        }
    }, seconds * 1000);
};

export {every};
