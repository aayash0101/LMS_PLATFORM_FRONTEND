import { useEffect, useRef } from 'react'

const EsewaCheckout = ({ paymentData }) => {
  const formRef = useRef()

  useEffect(() => {
    if (paymentData && formRef.current) {
      setTimeout(() => formRef.current?.submit(), 100)
    }
  }, [paymentData])

  if (!paymentData) return null

  const {
    amount,
    transactionId,
    signature,
    merchantCode,
    paymentUrl,
    successUrl,
    failureUrl,
  } = paymentData

  return (
    <form
      ref={formRef}
      method="POST"
      action={paymentUrl}
      className="hidden"
    >
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value={amount} />
      <input type="hidden" name="transaction_uuid" value={transactionId} />
      <input type="hidden" name="product_code" value={merchantCode} />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input type="hidden" name="success_url" value={successUrl} />
      <input type="hidden" name="failure_url" value={failureUrl} />
      <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" />
      <input type="hidden" name="signature" value={signature} />
    </form>
  )
}

export default EsewaCheckout