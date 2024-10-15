import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useState } from "react";

export default function Tabs() {
  const [currentTabOne, setCurrentTabOne] = useState(1);
  const [currentTabTwo, setCurrentTabTwo] = useState(1);
  return (
    <div className="col-lg-7">
      {/* <div className="text-18 lh-1 text-dark-1 fw-500 mb-30">Tabs</div> */}
      {/* <div className="tabs -pills js-tabs">
        <div className="tabs__controls d-flex x-gap-10 js-tabs-controls">
          <div onClick={() => setCurrentTabOne(1)}>
            <button
              className={`tabs__button px-20 py-8 rounded-8 text-light-1 js-tabs-button ${
                currentTabOne == 1 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-1"
              type="button"
            >
              All Categories
            </button>
          </div>

          <div onClick={() => setCurrentTabOne(2)}>
            <button
              className={`tabs__button px-20 py-8 rounded-8 text-light-1 js-tabs-button ${
                currentTabOne == 2 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-2"
              type="button"
            >
              Animation
            </button>
          </div>

          <div onClick={() => setCurrentTabOne(3)}>
            <button
              className={`tabs__button px-20 py-8 rounded-8 text-light-1 js-tabs-button ${
                currentTabOne == 3 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-3"
              type="button"
            >
              Design
            </button>
          </div>

          <div onClick={() => setCurrentTabOne(4)}>
            <button
              className={`tabs__button px-20 py-8 rounded-8 text-light-1 js-tabs-button ${
                currentTabOne == 4 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-4"
              type="button"
            >
              Illustration
            </button>
          </div>
        </div>

        <div className="tabs__content mt-20 js-tabs-content">
          <div
            className={`tabs__pane -tab-item-1 ${
              currentTabOne == 1 ? "is-active" : ""
            } `}
          >
            <p>
              Pharetra nulla ullamcorper sit lectus. Fermentum mauris
              pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel
              fames interdum urna lobortis sagittis sed pretium. Morbi sed arcu
              proin quis tortor non risus.
            </p>
            <p className="mt-20">
              Elementum lectus a porta commodo suspendisse arcu, aliquam lectus
              faucibus.
            </p>
          </div>

          <div
            className={`tabs__pane -tab-item-2 ${
              currentTabOne == 2 ? "is-active" : ""
            } `}
          >
            <p>
              Pharetra nulla ullamcorper sit lectus. Fermentum mauris
              pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel
              fames interdum urna lobortis sagittis sed pretium. Morbi sed arcu
              proin quis tortor non risus.
            </p>
            <p className="mt-20">
              Elementum lectus a porta commodo suspendisse arcu, aliquam lectus
              faucibus.
            </p>
          </div>

          <div
            className={`tabs__pane -tab-item-3 ${
              currentTabOne == 3 ? "is-active" : ""
            } `}
          >
            <p>
              Pharetra nulla ullamcorper sit lectus. Fermentum mauris
              pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel
              fames interdum urna lobortis sagittis sed pretium. Morbi sed arcu
              proin quis tortor non risus.
            </p>
            <p className="mt-20">
              Elementum lectus a porta commodo suspendisse arcu, aliquam lectus
              faucibus.
            </p>
          </div>

          <div
            className={`tabs__pane -tab-item-4 ${
              currentTabOne == 4 ? "is-active" : ""
            } `}
          >
            <p>
              Pharetra nulla ullamcorper sit lectus. Fermentum mauris
              pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel
              fames interdum urna lobortis sagittis sed pretium. Morbi sed arcu
              proin quis tortor non risus.
            </p>
            <p className="mt-20">
              Elementum lectus a porta commodo suspendisse arcu, aliquam lectus
              faucibus.
            </p>
          </div>
        </div>
      </div> */}

      <div className="tabs -active-purple-2 mt-30 js-tabs">
        <div className="tabs__controls d-flex items-center js-tabs-controls">
          <div onClick={() => setCurrentTabTwo(1)}>
            <button
              className={`text-light-1 lh-12 tabs__button mr-30 js-tabs-button  ${
                currentTabTwo == 1 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-1"
              type="button"
            >
              Create Question Sets
            </button>
          </div>

          <div onClick={() => setCurrentTabTwo(2)}>
            <button
              className={`text-light-1 lh-12 tabs__button mr-30 js-tabs-button  ${
                currentTabTwo == 2 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-2"
              type="button"
            >
              Manage Visibility & Access
            </button>
          </div>

          <div onClick={() => setCurrentTabTwo(3)}>
            <button
              className={`text-light-1 lh-12 tabs__button mr-30 js-tabs-button  ${
                currentTabTwo == 3 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-3"
              type="button"
            >
              Track Student Progress
            </button>
          </div>
          <div onClick={() => setCurrentTabTwo(4)}>
            <button
              className={`text-light-1 lh-12 tabs__button mr-30 js-tabs-button  ${
                currentTabTwo == 4 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-4"
              type="button"
            >
              Engage & Notify Your Followers
            </button>
          </div>
        </div>

        <div className="tabs__content mt-20 js-tabs-content">
          <div
            className={`tabs__pane -tab-item-1 ${
              currentTabTwo == 1 ? "is-active" : ""
            } `}
          >
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Craft Your Question Sets with Ease
              </Typography>
              <Typography variant="body1" gutterBottom>
                As an instructor on Gotestli, you can easily create quizzes
                tailored to your teaching needs. Use our predefined questions,
                or upload your own question sets via Excel using our provided
                format. Save time with our user-friendly tools while delivering
                high-quality learning experiences.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Upload Excel files with bulk questions</strong>
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Create unique quizzes</strong> using predefined
                        questions from our library
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>
                          Organize quizzes by categories, difficulty, or custom
                          tags
                        </strong>
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </div>

          <div
            className={`tabs__pane -tab-item-2 ${
              currentTabTwo == 2 ? "is-active" : ""
            } `}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Manage Visibility & Access
              </Typography>
              <Typography variant="body1" gutterBottom>
                You have complete control over the visibility of your quizzes.
                Choose between
                <strong style={{ color: "#1976d2" }}>
                  {" "}
                  Private Question Sets{" "}
                </strong>{" "}
                or
                <strong style={{ color: "#1976d2" }}>
                  {" "}
                  Public Question Sets{" "}
                </strong>{" "}
                for your question sets:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Private Question Sets</strong>: Restrict access
                        to specific groups or individual students.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Public Question Sets</strong>: Make your content
                        available to all students on the platform.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Notify Followers</strong>: Students who follow
                        you will be notified whenever you create or publish new
                        question sets.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              <Typography variant="body1">
                Share your quizzes with ease and reach your desired audience.
              </Typography>
            </Grid>
          </div>

          <div
            className={`tabs__pane -tab-item-3 ${
              currentTabTwo == 3 ? "is-active" : ""
            } `}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Track Student Progress
              </Typography>
              <Typography variant="body1" gutterBottom>
                Gain valuable insights into student performance with detailed
                analytics on Gotestli.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>View Student Scores</strong>: Track how students
                        performed on your quizzes.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Send Reminders</strong>: For quizzes still in
                        progress, remind students to complete them.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Detailed Reports</strong>: Analyze quiz results
                        and adjust future question sets accordingly.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              <Typography variant="body1">
                Help your students succeed by staying on top of their progress.
              </Typography>
            </Grid>
          </div>
          <div
            className={`tabs__pane -tab-item-4 ${
              currentTabTwo == 4 ? "is-active" : ""
            } `}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Engage & Notify Your Followers
              </Typography>
              <Typography variant="body1" gutterBottom>
                Build a community of engaged learners by allowing students to
                follow you.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Build a Following</strong>: Students can follow
                        you for updates on new quizzes.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Automatic Notifications</strong>: Notify
                        followers every time you create a new question set.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Boost Engagement</strong>: Keep students engaged
                        by releasing high-quality content regularly.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              <Typography variant="body1">
                Keep your students informed and motivated with timely
                notifications.
              </Typography>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
