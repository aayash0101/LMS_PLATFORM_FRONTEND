import { useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { useVerifyPayment } from '@/features/payments/hooks/useVerifyPayment'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'

const PaymentVerifyPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const hasRun = useRef(false)

    const rawSearch = window.location.search.replace('&?', '&')
    const fixedParams = new URLSearchParams(rawSearch)
    const encodedData = fixedParams.get('data')
    const courseId = fixedParams.get('courseId')

    const { mutate: verify, isPending, isSuccess, isError, error } = useVerifyPayment()

    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        if (!encodedData || !courseId) return

        setTimeout(() => {
            verify({ encodedData, courseId })
        }, 500)
    }, [encodedData, courseId])
    if (isPending) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
                <p className="text-muted-foreground">Verifying your payment...</p>
            </div>
        </div>
    )

    if (isSuccess) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4 max-w-sm">
                <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
                <h1 className="text-2xl font-bold">Payment Successful!</h1>
                <p className="text-muted-foreground text-sm">
                    You're now enrolled. Start learning right away.
                </p>
                <LinkButton to={`/learn/${courseId}`} className="w-full" size="lg">
                    Go to Course
                </LinkButton>
                <LinkButton to="/my-courses" variant="outline" className="w-full">
                    My Courses
                </LinkButton>
            </div>
        </div>
    )

    if (isError) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4 max-w-sm">
                <XCircle className="w-16 h-16 mx-auto text-destructive" />
                <h1 className="text-2xl font-bold">Payment Failed</h1>
                <p className="text-muted-foreground text-sm">
                    {error?.response?.data?.message ?? 'Something went wrong verifying your payment.'}
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
                <LinkButton to="/courses" variant="ghost" className="w-full">
                    Browse Courses
                </LinkButton>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <p className="text-muted-foreground">No payment data found.</p>
                <LinkButton to="/courses">Browse Courses</LinkButton>
            </div>
        </div>
    )
}

export default PaymentVerifyPage