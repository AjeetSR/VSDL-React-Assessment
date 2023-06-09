import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import HealthAndSafetyTwoToneIcon from "@mui/icons-material/HealthAndSafetyTwoTone";
import FastfoodTwoToneIcon from "@mui/icons-material/FastfoodTwoTone";
import HouseTwoToneIcon from "@mui/icons-material/HouseTwoTone";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import TurnedInNotTwoToneIcon from "@mui/icons-material/TurnedInNotTwoTone";
import { Container } from "react-bootstrap";
import ODAS from "../../api/odas";
import "./Assessments.scss";

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState("");

  // Get JSON from API response
  const getAssessments = async () => {
    const response = await ODAS.get().then((res) => res.assessments);
    setAssessments(response);
  };

  useEffect(() => {
    getAssessments();
  }, []);

  // To open alert and to save selected assessment
  const onGetStartedClick = (item) => {
    setSelectedAssessment(item);
    setShowAlert(true);
  };

  // returns Icon based on tag
  const getIcon = (tag) => {
    switch (tag) {
      case "Health":
        return (
          <HealthAndSafetyTwoToneIcon
            className={`IconStyle p-1 rounded`}
            sx={{
              background: "red",
            }}
          />
        );
      case "Food":
        return (
          <FastfoodTwoToneIcon
            className="IconStyle p-1 rounded"
            sx={{
              background: "mediumpurple",
            }}
          />
        );
      case "Housing":
        return (
          <HouseTwoToneIcon
            className="IconStyle p-1 rounded"
            sx={{
              background: "cornflowerblue",
            }}
          />
        );
      default:
        return (
          <TurnedInNotTwoToneIcon
            className="IconStyle p-1 rounded"
            sx={{
              background: "darkblue",
            }}
          />
        );
    }
  };

  return (
    <Container data-testid="Assessments">
      <h1 style={{ color: "grey" }}>Assessments</h1>

      {/* Loops over assessment list and displays individual assessment */}
      {assessments.map((item, index) => {
        return (
          <List
            key={index}
            sx={{ width: "100%", bgcolor: "background.paper" }}
            className="p-0"
          >
            <div className="d-md-flex p-4">
              <ListItem>
                <ListItemIcon>{getIcon(item.tag)}</ListItemIcon>
                <ListItemText className="ml-3">
                  <Typography
                    variant="h6"
                    sx={{ color: "#1da0c0", fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.author}</Typography>
                </ListItemText>
              </ListItem>

              <ListItem className="justify-content-md-end justify-content-center">
                <Button
                  data-testid="Get started button"
                  edge="end"
                  sx={{ background: "#067d9a", fontWeight: "500" }}
                  variant="contained"
                  onClick={() => onGetStartedClick(item)}
                >
                  Get Started
                  <NavigateNextRoundedIcon />
                </Button>
              </ListItem>
            </div>
            <Divider />
          </List>
        );
      })}

      {/* This will display alert */}
      <Snackbar
        open={showAlert}
        className="container p-0"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="info"
          className="w-100 p-3"
        >
          <Typography
            variant="h6"
            sx={{ color: "#1da0c0", fontWeight: "bold" }}
          >
            {selectedAssessment.title}
          </Typography>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Assessments;
