const express = require('express');
const router = express.Router();
const Group = require('../model/group');
const User = require('../model/user');
const Event = require('../model/event');
// Fetch groups for a user
router.get('/:userId', async (req, res) => {
  try {
    const groups = await Group.find({ members: req.params.userId }).populate('events');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new group
router.post('/', async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newGroup = new Group({ name, members: [userId] });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Failed to create group' });
  }
});

// Fetch all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
});

// Invite a user to a group by username
router.post('/:groupId/invite', async (req, res) => {
  try {
    const { username } = req.body;
    const group = await Group.findById(req.params.groupId);
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (!group.members.includes(user._id)) {
      group.members.push(user._id);
      await group.save();
      user.groups.push(group._id);
      await user.save();
    }
    res.status(200).json({ message: 'User invited successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:groupId/addEvent', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { eventId } = req.body;

    // Find the group by ID
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Find the event by ID (assuming you have an Event model)
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Add the event to the group's events array if it's not already there
    if (!group.events.includes(eventId)) {
      group.events.push(eventId);
      await group.save();
    }

    res.status(200).json({ message: 'Event added to group successfully' });
  } catch (error) {
    console.error('Error adding event to group:', error);
    res.status(500).json({ message: 'Failed to add event to group' });
  }
});

module.exports = router;
