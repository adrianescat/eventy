var mongoose = require('mongoose'),
    Event = mongoose.model('Event');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.create = function(req, res) {
  var event = new Event(req.body);
  event.creator = req.user;

  event.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

exports.list = function(req, res) {
  Event.find().sort('-created').populate('creator', 'firstName   lastName fullName').exec(function(err, events) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
        });
    } else {
      res.json(events);
    }
  });
};

exports.eventByID = function(req, res, next, id) {
  Event.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, event) {
    if (err) return next(err);
    if (!event) return next(new Error('Failed to load event ' + id));
    req.event = event;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.event);
};

exports.update = function(req, res) {
  var event = req.event;

  event.title = req.body.title;
  event.description = req.body.description;

  event.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

exports.delete = function(req, res) {
  var event = req.event;

  event.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.event.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};