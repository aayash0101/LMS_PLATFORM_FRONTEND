import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

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

const CourseFilters = ({ filters, onChange, onReset }) => {
  const handle = (key, value) => onChange({ ...filters, [key]: value, page: 1 })

  return (
    <div className="flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search courses..."
          value={filters.search ?? ''}
          onChange={(e) => handle('search', e.target.value)}
        />
      </div>

      {/* Category */}
      <Select
        value={filters.category ?? 'all'}
        onValueChange={(v) => handle('category', v === 'all' ? '' : v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Level */}
      <Select
        value={filters.level ?? 'all'}
        onValueChange={(v) => handle('level', v === 'all' ? '' : v)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {LEVELS.map((l) => (
            <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={filters.sort ?? 'newest'}
        onValueChange={(v) => handle('sort', v)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="rating">Top Rated</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={onReset}>Reset</Button>
    </div>
  )
}

export default CourseFilters