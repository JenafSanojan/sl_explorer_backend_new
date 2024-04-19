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
  