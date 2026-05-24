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
import { LinkButton } from '@/components/ui/link-button'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const CATEGORIES = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Design',
    'Business',
    'Marketing',
    'Photography',
    'Music',
    'Other',
]

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const CreateCoursePage = () => {
    const { mutate: createCourse, isPending, error } = useCreateCourse()

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            category: 'Web Development',
            level: 'Beginner',
            price: 0,
        },
    })

    const category = watch('category')
    const level = watch('level')
    const onSubmit = (data) => createCourse({ ...data, price: Number(data.price) })
    const apiError = error?.response?.data?.message

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
                <LinkButton variant="ghost" size="icon" to="/instructor/courses">
                    <ArrowLeft className="w-4 h-4" />
                </LinkButton>
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
                                {...register('title', {
                                    required: 'Title is required',
                                    minLength: { value: 5, message: 'Title must be at least 5 characters' },
                                    maxLength: { value: 100, message: 'Title cannot exceed 100 characters' },
                                })}
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="What will students learn in this course?"
                                rows={4}
                                {...register('description', {
                                    required: 'Description is required',
                                    minLength: { value: 20, message: 'Description must be at least 20 characters' },
                                    maxLength: { value: 2000, message: 'Description cannot exceed 2000 characters' },
                                })}
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                        </div>

                        {/* Category */}
                        <div className="space-y-1.5">
                            <Label>Category</Label>
                            <Select
                                value={category}
                                onValueChange={(v) => setValue('category', v, { shouldValidate: true })}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Level */}
                        <div className="space-y-1.5">
                            <Label>Level</Label>
                            <Select
                                value={level}
                                onValueChange={(v) => setValue('level', v, { shouldValidate: true })}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {LEVELS.map((l) => (
                                        <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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