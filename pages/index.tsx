import React from "react";
import { FogbenderSimpleWidget } from "fogbender-react";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  const { sign, verify } = require("jsonwebtoken");

  const token = {
    widgetId: "dzAwMjc5MDIyNTg0ODc0NDA1ODg4",
    customerId: "C256434",
    customerName: "Netflix",
    userId: "U234328",
    userEmail: "jim@netflix.com",
    // here you need to calculate proper signature on server
    userHMAC:
      "04b7c1aab187a84bfa3160b99c100df08c78b3a1e25884fc13d8d72a9b96ddc3",
    userName: "Jim Lee", // Don’t know the name? Reuse email here
    userAvatarUrl: "https://avatars.dicebear.com/api/avataaars/jim.lee@netflix.com.svg" // optional
  };
  const secret = "+6EEXGvNSCbBeN/qheCb7Ilo656241ZS";
  // 🙋 NOTE: you can optionally also sign customerName, userEmail, and userName here for a stronger check
  const userJWT = sign(token, secret, {
    algorithm: "HS256",
  });
  
  return {props:{ token: {...token, userJWT }}};
};

const IndexPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <div>
      <h2>Welcome to Next</h2>
      <FogbenderSimpleWidget
        clientUrl="https://client.fogbender.com"
        token={props.token}
      />
    </div>
  );
};

export default IndexPage;
