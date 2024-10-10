import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export const oktaAuthRequired = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);
  const accessToken = match?.[1];

  if (!accessToken) {
    res.status(401);
    return next("Unauthorized");
  }

  try {
    const basicAuth = Buffer.from(
      `${process.env.OKTA_CLIENT_ID}:${process.env.OKTA_CLIENT_SECRET}`
    ).toString("base64");

    const urlencoded = new URLSearchParams();
    urlencoded.append("token", accessToken);
    urlencoded.append("token_type_hint", "access_token");

    const response = await fetch(
      `https://${process.env.OKTA_DOMAIN}/oauth2/v1/introspect`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: urlencoded, // Pass URLSearchParams body
      }
    );
    const data = (await response.json()) as { active: boolean };
    console.log("data", data);

    if (!data.active) {
      res.status(401);
      return next("Unauthorized");
    }
  } catch (error) {
    res.status(500);
    return next("Server error");
  }
};
