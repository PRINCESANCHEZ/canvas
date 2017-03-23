/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
// Modules
const log4js = require("log4js");

const logger = log4js.getLogger("v1-post-event-controller");
const constants = require("../lib/constants");

// Public Methods ------------------------------------------------------------->

module.exports.post = _post;

function _post(req, res, next) {
	logger.info("Posting event log");
	if (req.body) {
		req.session.events = req.body;
		req.session.save();
		res.status(constants.HTTP_STATUS_OK);
		res.json(req.body);
	} else {
		res.status(constants.HTTP_STATUS_NOT_FOUND);
		res.json({ error: "Unable to post event log" });
	}
	return;
}
