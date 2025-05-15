const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post("/sms", (req, res) => {
    const { text = "", phoneNumber, sessionId } = req.body;
    let response = "";

    const inputs = text.split("*");
    const level = inputs.length;

    switch (level) {
        case 1:
            response = "CON Karibu TAKA TU!\nWhat is your age group?\n1. Below 18\n2. 18-25\n3. 26-35\n4. 36-50\n5. 51+";
            break;
        case 2:
            response = "CON What type of waste do you usually have in a matatu?\n1. Food wrappers\n2. Drink bottles\n3. Receipts\n4. Chewing gum\n5. Other";
            break;
        case 3:
            response = "CON What do you usually do with your waste?\n1. Hold until bin\n2. Throw on floor\n3. Give conductor\n4. Throw outside";
            break;
        case 4:
            response = "CON What route is your matatu on? (e.g. Thika Rd, Mombasa Rd)";
            break;
        case 5:
            response = "END Thank you for participating in TAKA TU! You stand a chance to win amazing prizes.";
            break;
        default:
            response = "END Thank you!";
    }

    res.set("Content-Type", "text/plain");
    res.send(response);
});

app.get("/", (req, res) => {
    res.send("TAKA TU SMS Survey System is running.");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
