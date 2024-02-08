const express = require("express");
const router = express.Router();

const artistController = require("../controllers/ArtistController");

router.get('/', artistController.get_artists);
router.get('/:id', artistController.get_artist_by_id);
router.post('/', artistController.post_artist);
router.patch('/:id', artistController.update_artist);

module.exports = router;