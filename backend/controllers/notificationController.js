var NotificationModel = require("../models/notification");

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find();
    res.status(200).send({ notifications });
  } catch (err) {
    res.status(532).send({
      message: err.message,
    });
  }
};

exports.approveNotification = async (req, res) => {x
  try {
    const notifId = req.params.id;
    const notification = await NotificationModel.findById({ notifId });
    notification['approved'] != notification['approved']
    await notification.save();
    const notifications = await NotificationModel.find();
    res.status(200).send({ notifications });
  } catch (err) {
    res.status(532).send({
      message: err.message,
    });
  }
};
