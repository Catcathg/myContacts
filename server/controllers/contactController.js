const Contact = require("../models/Contact");

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }); //req.user.id (filtré en fonction du user connecté)
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const contact = new Contact({ ...req.body, user: req.user.id });  // créer un contact qui est lié au user connecté
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate( 
      { _id: req.params.id, user: req.user.id }, //on update seulement si le contact appartient au user connecté
      req.body,
      { new: true }
    );

    if (!contact) return res.status(404).json({ message: "Contact introuvable" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // que supprimer les contacts au user connecté

    if (!contact) return res.status(404).json({ message: "Contact introuvable" });
    res.json({ message: "Contact supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
