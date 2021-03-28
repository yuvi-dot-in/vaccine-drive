import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          <Typography>{title}</Typography>
          <h2 className="infoBox-cases">{cases}</h2>
          <h4 className="infoBox-total">{total} Total</h4>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
