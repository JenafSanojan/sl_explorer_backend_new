const Stripe = require("stripe");
const key = 'sk_test_51P7Kv2P2T7YncC47TkYD9rgaAGQ4WS5W7OvitfgE6tPfscDEjHpcgioG5ccpzYmRjqn6rpCNKsuDlU8uGYLTEthh00IjXEVgLN';
const stripe = new Stripe(key);

const createPayment = async (req, res) => {
  try {
    const { body } = req;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body?.amount,
      currency: body?.currency,
    });
 
    if(paymentIntent?.status !== 'completed'){
        console.log('=====in');
        return res.status(200).json({
             message: 'Confrim Payment Please' ,
            client_secret: paymentIntent?.client_secret
            });
    }
    return res.status(200).json({
        message: 'Payment Completed Successfully',
        });
  } catch (error) {
    console.log(error); f
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
    createPayment
  }; 
  