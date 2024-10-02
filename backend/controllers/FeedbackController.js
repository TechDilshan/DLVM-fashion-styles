const Feedback = require('../models/Feedback');

const createMessage = (req, res, next) => {
    const { cusid, id, comment } = req.body; 

    console.log("Received data:", req.body); // Log the incoming data

    const cart = new Feedback({ 
        cusid: cusid,
        id: id,
        comment: comment,
    });

    cart.save()  
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            console.error('Error adding feedback:', error.message); // Log the error message
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


const getMessage = async (req, res, next) => {
    const { itemId } = req.query; // Extract itemId from query parameters

    try {
        const feedbacks = await Feedback.find({ id: itemId }); // Find feedbacks related to the itemId
        res.json({ response: feedbacks }); // Send the feedbacks as a response
    } catch (error) {
        console.error('Error retrieving feedbacks:', error.message); // Log the error message
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateMessage = (req, res, next) => { // Function to update a cart item
    const { cusid, itemid, comment} = req.body;
    
    Feedback.updateOne({ cusid: cusid }, { $set: { comment:comment} })  
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const deleteMessage = (req, res, next) => { // Function to delete a cart item
    const email = req.body.email;  // Extract the ID of the cart item to be deleted from the request body
    Feedback.deleteOne({email: email}) // Delete the specified cart item from the database
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

exports.createMessage = createMessage;
exports.getMessage = getMessage;
exports.updateMessage = updateMessage;
exports.deleteMessage = deleteMessage;