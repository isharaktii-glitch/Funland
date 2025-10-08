// server/utils/ocr.js
const Tesseract = require('tesseract.js');

const verifyBankSlip = async (slipImage, ownerBankDetails) => {
  const { data: { text } } = await Tesseract.recognize(slipImage, 'eng');
  const extractedDetails = extractBankDetails(text); // Custom function to parse text
  return (
    extractedDetails.bankName === ownerBankDetails.bankName &&
    extractedDetails.branch === ownerBankDetails.branch &&
    extractedDetails.accountNumber === ownerBankDetails.accountNumber
  );
};

// server/routes/payment.js
router.post('/verify-slip', async (req, res) => {
  const { slipImage } = req.body;
  const owner = await Owner.findOne({});
  const isValid = await verifyBankSlip(slipImage, owner.bankDetails);
  if (isValid) {
    // Update user to paid version
    await User.updateOne({ _id: req.user.id }, { isPaid: true });
    res.json({ message: 'Payment verified, access granted' });
  } else {
    res.status(400).json({ message: 'Invalid bank slip' });
  }
});
