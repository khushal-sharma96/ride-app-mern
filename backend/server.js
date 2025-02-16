const app = require('./main.js');

const PORT =  process.env.PORT_NUMBER;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});