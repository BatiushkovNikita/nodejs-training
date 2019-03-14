export default (req, res, next) => {
    if (req.headers !== undefined && req.headers.cookie !== undefined) {
        let cookies = {};
        req.headers.cookie.split(';').forEach(v => {
            let c = v.split('=');
            if (c.length === 2) {
                cookies[c[0].trim()] = c[1].trim();
            }
        });
        req.parsedCookies = cookies;
    }
    next();
};