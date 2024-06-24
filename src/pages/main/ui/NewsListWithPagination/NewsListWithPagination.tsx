import PaginationWrapper from "@/features/pagination/ui/Pagination/Pagination";
import { TOTAL_PAGE } from "@/shared/constants/constants";
import NewsList from "@/widgets/news/ui/NewsList/NewsList";
import { IFilters } from "@/shared/interfaces";
import { INews } from "@/entities/news";
import { usePaginationNews } from "../../utils/hooks/usePaginationNews";

interface Props {
  filters: IFilters;
  news: INews[];
  isLoading: boolean;
}

const NewsListWithPagination = ({ filters, news, isLoading }: Props) => {
  const { handleNextPage, handlePreviousPage, handlePageClick } =
    usePaginationNews(filters);

  return (
    <PaginationWrapper
      top
      bottom
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      handlePageClick={handlePageClick}
      totalPages={TOTAL_PAGE}
      currentPage={filters.page_number}
    >
      <NewsList
        direction="column"
        type="item"
        isLoading={isLoading}
        news={news}
      />
    </PaginationWrapper>
  );
};

export default NewsListWithPagination;
