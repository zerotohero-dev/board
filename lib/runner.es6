let every = (seconds, delegate) => {
    setInterval(() => {
        try {
            delegate();
        } catch (ignore) {

        }
    }, seconds * 1000);
};

export {every};
