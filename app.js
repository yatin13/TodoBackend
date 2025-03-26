const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { env } = require('./db/constant');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '2480mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '2480mb' }));
app.use(cookieParser());
app.use('/api', require('./routes/user'));
app.use('**', (req, res) => {
    res.status(404).json({ success: false, message: "Invalid router" })
});

global.badReqErr = (err) => {
    err.statusCode = 400;
    return err;
};
app.use((err, req, res, next) => {
    console.log('err:', err)
    if (err && err.code == 11000) {
        let { keyValue, keyPattern } = err;
        keyPattern = Object.keys(keyPattern)[0];
        keyValue = keyValue[keyPattern];
        if (keyPattern == 'email') err.message = 'This email already exist';
        if (keyPattern == 'phoneNo') err.message = 'This phone number already exist'
        return res.status(400).json({ success: false, message: err.message || 'Unexpected error occured!', error: err })
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ success: false, message: 'File uploading limit exceeded', error: err })
    if (err.statusCode == 400) return res.status(400).json({ success: false, message: err.message || 'Unexpected error occured!', error: err });
    return res.status(500).json({ success: false, message: err.message || 'Unexpected error occured!', error: err });
})

// Start the server
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});

module.exports = app;






