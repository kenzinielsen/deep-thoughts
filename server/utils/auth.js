const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhh';
const expiration = '2h';

module.exports = {
    authMiddlewear: function({ req }) {
        //allows token to be send via req.body, req query or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
        //seperate bearer from tokenvalue
        if (req.headers.authorization) {
            token = token
            .split('')
            .pop()
            .trim()
        }
        //if no tike return request object
        if (!token) {
            return req;
        }
        try {
            //decode and attach user data
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token')
        }
        return req;
    },
    signToken: function({ username, email, _id }) {

        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
};
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }
};