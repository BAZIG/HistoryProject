import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/",express.static("./node_modules/bootstrap/dist/"));

const month = new Date().getMonth();
const day = new Date().getDay();
const API_events = `https://byabbe.se/on-this-day/${month}/${day}/events.json`;


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/event", async (req, res) => {
    try {
        let response = await axios.get(`${API}/${month}/${day}/events.json`);
        let facts = response.data.events;
        let fact = facts[Math.floor(Math.random() * facts.length)];
        console.log(fact.wikipedia[0].title);
        res.render("europe.ejs", {fact : fact});
        
      } catch (error) {
        console.error(error);
      }
});

app.get("/europe", (req, res) => {
    res.render("europe.ejs");
});


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})