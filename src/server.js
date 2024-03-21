import express from "express";
import strava from "strava-v3";
import cors from "cors";
import request from "request";
import secret from "./secret.js";

const app = express();
const port = 5000;

strava.config({
  client_id: "123314",
  client_secret: secret,
  redirect_uri: "http://localhost:5000/strava",
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/auth/strava", (req, res) => {
  const url = strava.oauth.getRequestAccessURL({
    client_id: 123314,
    redirect_uri: "http://localhost:5000/strava",
    response_type: "code",
    scope: "read_all,profile:read_all,activity:read_all",
  });

  request(url, (error, response, body) => {
    if (error) {
      res.status(500).send(error);
      return;
    } else {
      res.json({ redirectUrl: url });
    }
  });
});

app.get("/strava", (req, res) => {
  const code = req.query.code;
  strava.oauth.getToken(code, (err, payload) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    const accessToken = payload.body.access_token;

    //code to get athlete data, to be used later

    // strava.athlete.get({ 'access_token': accessToken}, (err, athlete) => {
    //   if (err) {
    //     console.error("Error fetching athlete data:", err);
    //     res.status(500).send("Internal Server Error");
    //     return;
    //   }
    //   res.json(athlete);
    // }
    // );

    strava.athlete.listActivities(
      { access_token: accessToken },
      (err, activities) => {
        if (err) {
          console.error("Error fetching activities data:", err);
          res.status(500).send("Internal Server Error");
          return;
        }
        res.json(activities);
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
