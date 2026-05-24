import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null

  const { page, totalPages, hasNextPage, hasPrevPage } = pagination

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrevPage}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) {
              acc.push('...')
            }
            acc.push(p)
            return acc
          }, [])
          .map((item, i) =>
            item === '...' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">…</span>
            ) : (
              <Button
                key={item}
                variant={item === page ? 'default' : 'outline'}
                size="sm"
                className="w-9"
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            )
          )}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default Pagination