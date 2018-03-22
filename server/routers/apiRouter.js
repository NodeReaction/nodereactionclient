"use strict";

// EXPRESS
const express = require("express");
const request = require("request");
const router = express.Router();

// CONTROLLERS
const agentController = require("./../controllers/agentController");
const userController = require("./../controllers/userController");
const applicationController = require("./../controllers/applicationController");
const routeController = require("./../controllers/routeController");
const traceController = require("./../controllers/traceController");
const dashboardController = require("./../controllers/dashboardController");
const analyticsController = require("./../controllers/analyticsController");

// ROUTES
// AGENT - POSTS DATA TO SERVER
router.post(
  "/agent/data/save",
  (req, res, next) => {
    console.log("recieved msg");
    next();
  },
  agentController.validate,
  agentController.create,
  (req, res) => {
    res.end();
  }
);

// TRACES
router.get("/traces/:application_id/:offset", traceController);

// DASHBOARD
router.get(
  "/dashboard/top/:application_id/:offset",
  dashboardController.topFive
);
router.get(
  "/dashboard/stats/:application_id/:offset",
  dashboardController.quickStats
);

// ROUTE
router.get("/routes/:application_id/:offset", routeController.getRoutes);
router.get(
  "/analytics/graph/:application_id/:route/:method/:offset/:time",
  analyticsController.graphData, analyticsController.rangeData
);

// USER
router.post("/user/create", userController.userCreate, (req, res) => {
  res.status(200).json(res.locals.userId);
});

router.get("/user/read/:id", userController.userRead, (req, res) => {
  res.status(200).json(res.locals.userId);
});

router.post("/user/update", userController.userUpdate, (req, res) => {
  res.status(200).json(res.locals.userId);
});

router.post("/user/delete/:id", userController.userDelete, (req, res) => {
  res.status(200).json(res.locals.userId);
});

router.get("/users/", userController.usersList, (req, res) => {
  res.status(200).json(res.locals.users);
});

router.post("/user/validate", userController.userVerify, (req, res) => {
  res.status(200).json(res.locals.userId);
});

// APPLICATION
router.post(
  "/application/create",
  applicationController.applicationCreate,
  (req, res) => {
    res.status(200).json(res.locals.applicationId);
  }
);
router.get(
  "/application/read/:id",
  applicationController.applicationRead,
  (req, res) => {
    res.status(200).json(res.locals.application);
  }
);

router.get(
  "/application/delete/:id",
  applicationController.applicationDelete,
  (req, res) => {
    res.status(200).json(res.locals.applicationId);
  }
);
router.get(
  "/applications",
  applicationController.applicationsList,
  (req, res) => {
    res.status(200).json(res.locals.applications);
  }
);

router.get("/applications/:user_id", applicationController.userApplications);

// DEFAULT ROUTES
router.all("*", (req, res, next) => {
  const err = new Error(
    `apiRouter.js - default catch all route - not found - ${req.url}`
  );
  err.status = 404;
  next(err);
});

module.exports = router;