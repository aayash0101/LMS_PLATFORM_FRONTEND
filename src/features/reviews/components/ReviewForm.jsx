import { useState } from 'react'
import { Star } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCreateReview } from '../hooks/useCreateReview'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const StarPicker = ({ value, onChange }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className="focus:outline-none"
      >
        <Star
          className={`w-7 h-7 transition-colors ${
            star <= value
              ? 'fill-amber-400 text-amber-400'
              : 'text-muted-foreground hover:text-amber-300'
          }`}
        />
      </button>
    ))}
  </div>
)

const ReviewForm = ({ courseId, onSuccess }) => {
  const [rating, setRating] = useState(0)
  const { mutate: createReview, isPending, error } = useCreateReview(courseId)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { comment: '' },
  })

  const onSubmit = (data) => {
    if (rating === 0) return
    createReview(
      { rating, comment: data.comment },
      {
        onSuccess: () => {
          reset()
          setRating(0)
          onSuccess?.()
        },
      }
    )
  }

  const apiError = error?.response?.data?.message

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {apiError && (
            <Alert variant="destructive">
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label>Your Rating</Label>
            <StarPicker value={rating} onChange={setRating} />
            {rating === 0 && (
              <p className="text-xs text-muted-foreground">Click a star to rate</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Comment (optional)</Label>
            <Textarea
              placeholder="What did you think of this course?"
              rows={3}
              {...register('comment', { maxLength: { value: 1000, message: 'Max 1000 characters' } })}
            />
            {errors.comment && (
              <p className="text-sm text-destructive">{errors.comment.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending || rating === 0}>
            {isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReviewForm