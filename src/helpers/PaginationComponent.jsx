import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComponent = ({
  pagination,
  onPageChange,
  currentDataCount,
  totalRecords,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;

    // console.log(totalPages, currentPage);

    if (totalPages > 0) {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => onPageChange(1)}
            isActive={1 === currentPage}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage > 4) {
      pageNumbers.push(<span key="ellipsis-start">...</span>);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push(<span key="ellipsis-end">...</span>);
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={totalPages === currentPage}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="w-full pb-4 flex justify-between items-center">
      <span>
        Showing {currentDataCount} of {totalRecords} records
      </span>

      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </div>
  );
};

export default PaginationComponent;
