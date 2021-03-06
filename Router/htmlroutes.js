const path = require("path");
const router = require("express").Router();

// ===============================================================================
// ROUTING
// ===============================================================================

// HTML GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases the user is shown an HTML page of content
// ---------------------------------------------------------------------------

router.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/exercise.html"));
});

router.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/stats.html"));
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

module.exports = router;
