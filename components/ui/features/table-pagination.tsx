import React, {memo, useMemo} from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui";
import {AMOUNT_IN_PAGE} from "@lib/constants";

type Props = {
  count: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
}
export const TablePagination = memo(({
  count,
  setPageNumber,
  pageNumber,
}: Props) => {
  const pageAmount = useMemo(() => Math.ceil(count / 10), [count])

  return (
    <Pagination className={'relative z-50'}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPageNumber(pageNumber => pageNumber == 1 ? pageNumber : pageNumber - 1)}
            className={'select-none'}
          />
        </PaginationItem>
        {[...new Array(pageAmount)].map((_, ind) => (
          <PaginationItem key={ind}>
            <PaginationLink
              onClick={() => setPageNumber(ind + 1)}
              isActive={pageNumber == ind + 1}
              className={'select-none'}
            >
              {ind + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/*<PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>*/}
        <PaginationItem>
          <PaginationNext
            onClick={() => setPageNumber(pageNumber => pageNumber == pageAmount ? pageNumber : pageNumber + 1)}
            className={'select-none'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

TablePagination.displayName = 'TablePagination';