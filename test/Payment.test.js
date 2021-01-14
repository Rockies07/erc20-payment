/**
 * @author Billy Editiano, Gleeger Indonesia
 */

const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const uuid = require("uuid");

/** Load Contracts */
const Token = artifacts.require("TokenMock");
const Payment = artifacts.require("Payment");

contract("Payment", accounts => {
  /** ERC20 Token Representation */
  let token;

  /** Payment Instance */
  let payment;

  beforeEach(async () => {
    token = await Token.new("1000000000000000000000");
    payment = await Payment.new(token.address);

    // give accounts[1] 1000000000 balance of token
    await token.transfer(accounts[1], "1000000000", { from: accounts[0] });
  });

  describe("payment", () => {
    it("approve and pay", async () => {
      const [owner, payer] = accounts;
      const paymentId = uuid.v4();
      console.log(paymentId);

      const approvalRes = await token.approve(payment.address, "5000000", { from: payer });
      const allowed = await token.allowance(payer, payment.address);
      console.log(allowed.toString());
      const transferFromRes = await payment.pay(paymentId, "5000000", { from: payer });

      console.log(approvalRes.receipt);
      console.log(transferFromRes.receipt);
    });
  });

});