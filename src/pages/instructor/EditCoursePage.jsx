import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
    ArrowLeft, PlusCircle, Trash2, Pencil, Video,
    ChevronDown, ChevronUp, Eye, EyeOff, Upload, Check
} from 'lucide-react'
import { useCourse } from '@/features/courses/hooks/useCourse'
import { useUpdateCourse, usePublishCourse } from '@/features/courses/hooks/useUpdateCourse'
import { useDeleteCourse } from '@/features/courses/hooks/useDeleteCourse'
import { useCreateSection, useUpdateSection, useDeleteSection } from '@/features/courses/hooks/useSections'
import { useCreateLesson, useUpdateLesson, useDeleteLesson, useUploadVideo } from '@/features/courses/hooks/useLessons'
import { uploadThumbnailApi } from '@/features/courses/api/instructor.courses.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { LinkButton } from '@/components/ui/link-button'

const CATEGORIES = [
    'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
    'DevOps', 'Design', 'Business', 'Marketing', 'Photography', 'Music', 'Other',
]
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const SectionDialog = ({ courseId, section, open, onClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { title: section?.title ?? '', description: section?.description ?? '' },
    })
    const { mutate: create, isPending: creating } = useCreateSection(courseId)
    const { mutate: update, isPending: updating } = useUpdateSection(courseId)

    const onSubmit = (data) => {
        if (section) {
            update({ sectionId: section._id, data }, { onSuccess: () => { reset(); onClose() } })
        } else {
            create(data, { onSuccess: () => { reset(); onClose() } })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{section ? 'Edit Section' : 'Add Section'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label>Title</Label>
                        <Input
                            placeholder="e.g. Getting Started"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label>Description (optional)</Label>
                        <Textarea placeholder="What does this section cover?" rows={2} {...register('description')} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={creating || updating}>
                            {creating || updating ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const LessonDialog = ({ courseId, sectionId, lesson, open, onClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: lesson?.title ?? '',
            description: lesson?.description ?? '',
            isPreview: lesson?.isPreview ?? false,
        },
    })
    const { mutate: create, isPending: creating } = useCreateLesson(courseId, sectionId)
    const { mutate: update, isPending: updating } = useUpdateLesson(courseId, sectionId)

    const onSubmit = (data) => {
        if (lesson) {
            update({ lessonId: lesson._id, data }, { onSuccess: () => { reset(); onClose() } })
        } else {
            create(data, { onSuccess: () => { reset(); onClose() } })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{lesson ? 'Edit Lesson' : 'Add Lesson'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label>Title</Label>
                        <Input
                            placeholder="e.g. Introduction to React"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label>Description (optional)</Label>
                        <Textarea rows={2} {...register('description')} />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="isPreview" {...register('isPreview')} className="rounded" />
                        <Label htmlFor="isPreview" className="cursor-pointer">Free preview lesson</Label>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={creating || updating}>
                            {creating || updating ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const LessonRow = ({ courseId, sectionId, lesson }) => {
    const [editOpen, setEditOpen] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadDone, setUploadDone] = useState(false)
    const fileRef = useRef()

    const { mutate: deleteLesson, isPending: deleting } = useDeleteLesson(courseId, sectionId)
    const { mutate: uploadVideo } = useUploadVideo(courseId, sectionId, lesson._id)

    const handleVideoUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const formData = new FormData()
        formData.append('video', file)
        setUploading(true)
        uploadVideo(formData, {
            onSuccess: () => { setUploading(false); setUploadDone(true) },
            onError: () => setUploading(false),
        })
    }

    return (
        <>
            <div className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-muted/50 group text-sm">
                <Video className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="flex-1 min-w-0 line-clamp-1">{lesson.title}</span>

                {lesson.isPreview && (
                    <Badge variant="outline" className="text-xs shrink-0">Preview</Badge>
                )}

                {lesson.video?.url ? (
                    <Badge variant="secondary" className="text-xs text-green-600 shrink-0">
                        <Check className="w-3 h-3 mr-1" />Video
                    </Badge>
                ) : (
                    <span className="text-xs text-muted-foreground shrink-0">No video</span>
                )}

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        title="Upload video"
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                    >
                        {uploading
                            ? <span className="text-xs">...</span>
                            : <Upload className="w-3.5 h-3.5" />
                        }
                    </Button>
                    <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />

                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditOpen(true)}>
                        <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        disabled={deleting}
                        onClick={() => deleteLesson(lesson._id)}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>

            <LessonDialog
                courseId={courseId}
                sectionId={sectionId}
                lesson={lesson}
                open={editOpen}
                onClose={() => setEditOpen(false)}
            />
        </>
    )
}

const SectionCard = ({ courseId, section }) => {
    const [open, setOpen] = useState(true)
    const [editOpen, setEditOpen] = useState(false)
    const [addLesson, setAddLesson] = useState(false)

    const { mutate: deleteSection, isPending: deleting } = useDeleteSection(courseId)

    return (
        <>
            <Card>
                <CardHeader className="py-3 px-4">
                    <div className="flex items-center justify-between gap-2">
                        <button
                            className="flex items-center gap-2 flex-1 text-left font-medium text-sm"
                            onClick={() => setOpen((o) => !o)}
                        >
                            {open ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                            {section.title}
                            <span className="text-xs text-muted-foreground font-normal ml-1">
                                ({section.lessons?.length ?? 0} lessons)
                            </span>
                        </button>
                        <div className="flex items-center gap-1 shrink-0">
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditOpen(true)}>
                                <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 text-destructive"
                                disabled={deleting}
                                onClick={() => deleteSection(section._id)}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                {open && (
                    <div className="pt-0 pb-3 px-4 space-y-1">
                        <Separator className="mb-2" />
                        {section.lessons?.length === 0 && (
                            <p className="text-xs text-muted-foreground py-2 text-center">No lessons yet</p>
                        )}
                        {section.lessons?.map((lesson) => (
                            <LessonRow
                                key={lesson._id}
                                courseId={courseId}
                                sectionId={section._id}
                                lesson={lesson}
                            />
                        ))}
                        <Button
                            size="sm"
                            variant="ghost"
                            className="w-full mt-2 text-primary"
                            onClick={() => setAddLesson(true)}
                        >
                            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
                            Add Lesson
                        </Button>
                    </div>
                )}
            </Card>

            <SectionDialog
                courseId={courseId}
                section={section}
                open={editOpen}
                onClose={() => setEditOpen(false)}
            />
            <LessonDialog
                courseId={courseId}
                sectionId={section._id}
                open={addLesson}
                onClose={() => setAddLesson(false)}
            />
        </>
    )
}

const EditCoursePage = () => {
    const { id } = useParams()
    const [addSection, setAddSection] = useState(false)
    const [thumbUploading, setThumbUploading] = useState(false)
    const thumbRef = useRef()

    const { data: courseData, isLoading } = useCourse(id)
    const course = courseData?.data

    const { mutate: updateCourse, isPending: updating, error: updateError } = useUpdateCourse(id)
    const { mutate: publishCourse, isPending: publishing } = usePublishCourse(id)
    const { mutate: deleteCourse, isPending: deleting } = useDeleteCourse()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    // ✅ useEffect, not useState
    useEffect(() => {
        if (course) {
            setValue('title', course.title)
            setValue('description', course.description)
            setValue('category', course.category)
            setValue('level', course.level)
            setValue('price', course.price)
        }
    }, [course, setValue])

    const onSubmit = (data) => updateCourse({ ...data, price: Number(data.price) })

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const formData = new FormData()
        formData.append('thumbnail', file)
        setThumbUploading(true)
        try {
            await uploadThumbnailApi(id, formData)
        } finally {
            setThumbUploading(false)
        }
    }

    if (isLoading) return (
        <div className="space-y-4 max-w-3xl">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full rounded-xl" />
        </div>
    )

    if (!course) return <p className="text-muted-foreground">Course not found.</p>

    return (
        <div className="max-w-3xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                    <LinkButton variant="ghost" size="icon" to="/instructor/courses">
                        <ArrowLeft className="w-4 h-4" />
                    </LinkButton>
                    <div>
                        <h1 className="text-xl font-bold line-clamp-1">{course.title}</h1>
                        <Badge variant={course.isPublished ? 'default' : 'secondary'} className="mt-0.5">
                            {course.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                    </div>
                </div>
                <Button
                    variant={course.isPublished ? 'outline' : 'default'}
                    onClick={() => publishCourse()}
                    disabled={publishing}
                >
                    {course.isPublished
                        ? <><EyeOff className="w-4 h-4 mr-2" />Unpublish</>
                        : <><Eye className="w-4 h-4 mr-2" />Publish</>
                    }
                </Button>
            </div>

            <Tabs defaultValue="details">
                <TabsList className="w-full">
                    <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    <TabsTrigger value="curriculum" className="flex-1">Curriculum</TabsTrigger>
                    <TabsTrigger value="thumbnail" className="flex-1">Thumbnail</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                    <Card>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {updateError && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{updateError.response?.data?.message}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-1.5">
                                    <Label>Title</Label>
                                    <Input
                                        {...register('title', {
                                            required: 'Title is required',
                                            minLength: { value: 5, message: 'Title must be at least 5 characters' },
                                            maxLength: { value: 100, message: 'Title cannot exceed 100 characters' },
                                        })}
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label>Description</Label>
                                    <Textarea
                                        rows={4}
                                        {...register('description', {
                                            required: 'Description is required',
                                            minLength: { value: 20, message: 'Description must be at least 20 characters' },
                                            maxLength: { value: 2000, message: 'Description cannot exceed 2000 characters' },
                                        })}
                                    />
                                    {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label>Category</Label>
                                        <Select
                                            value={course.category}
                                            onValueChange={(v) => setValue('category', v)}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map((c) => (
                                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Level</Label>
                                        <Select
                                            value={course.level}
                                            onValueChange={(v) => setValue('level', v)}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {LEVELS.map((l) => (
                                                    <SelectItem key={l} value={l}>{l}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label>Price (USD)</Label>
                                    <Input type="number" min={0} step={0.01} {...register('price')} />
                                </div>

                                <Button type="submit" disabled={updating}>
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="mt-6 space-y-4">
                    {course.sections?.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-6">
                            No sections yet. Add your first section below.
                        </p>
                    )}

                    {course.sections?.map((section) => (
                        <SectionCard key={section._id} courseId={id} section={section} />
                    ))}

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setAddSection(true)}
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Section
                    </Button>

                    <SectionDialog
                        courseId={id}
                        open={addSection}
                        onClose={() => setAddSection(false)}
                    />
                </TabsContent>

                <TabsContent value="thumbnail" className="mt-6">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            {course.thumbnail?.url ? (
                                <img
                                    src={course.thumbnail.url}
                                    alt="Thumbnail"
                                    className="w-full aspect-video object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground text-sm">No thumbnail uploaded</p>
                                </div>
                            )}

                            <input
                                ref={thumbRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleThumbnailUpload}
                            />
                            <Button
                                variant="outline"
                                className="w-full"
                                disabled={thumbUploading}
                                onClick={() => thumbRef.current?.click()}
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                {thumbUploading ? 'Uploading...' : 'Upload Thumbnail'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default EditCoursePage