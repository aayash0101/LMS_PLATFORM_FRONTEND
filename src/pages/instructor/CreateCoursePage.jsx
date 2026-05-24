import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCreateCourse } from '@/features/courses/hooks/useCreateCourse'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const CATEGORIES = [
  'Development', 'Business', 'Design', 'Marketing',
  'IT & Software', 'Personal Development', 'Photography', 'Music',
]
const LEVELS = ['beginner', 'intermediate', 'advanced']

const CreateCoursePage = () => {
  const { mutate: createCourse, isPending, error } = useCreateCourse()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '', description: '', category: '', level: 'beginner', price: 0,
    },
  })

  const onSubmit = (data) => createCourse({ ...data, price: Number(data.price) })
  const apiError = error?.response?.data?.message

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/instructor/courses"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Fill in the basics — you can add content after creating
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {apiError && (
              <Alert variant="destructive">
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}

            {/* Title */}
            <div className="space-y-1.5">
              <Label>Course Title</Label>
              <Input
                placeholder="e.g. Complete React Developer Bootcamp"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                placeholder="What will students learn in this course?"
                rows={4}
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            {/* Category + Level */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select onValueChange={(v) => setValue('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Level</Label>
                <Select defaultValue="beginner" onValueChange={(v) => setValue('level', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((l) => (
                      <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <Label>Price (USD) — set 0 for free</Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                {...register('price')}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Course & Add Content'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateCoursePage