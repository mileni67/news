import PaginationWrapper from "@/features/pagination/ui/Pagination/Pagination";
import { TOTAL_PAGE } from "@/shared/constants/constants";
import { useDebounce } from "@/shared/hooks/useDebounce";
import NewsFilters from "../NewsFilters/NewsFilters";
import styles from "./styles.module.css";
import NewsList from "@/widgets/news/ui/NewsList/NewsList";
import { useAppDispatch, useAppSelector } from "@/app/appStore";
import { useGetNewsQuery } from "@/entities/news/api/newsApi";
import { setFilters } from "@/entities/news/model/newsSlice";

const NewsByFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.news.filters);
  const news = useAppSelector((state) => state.news.news);

  const deboucedKeywords = useDebounce(filters.keywords as string, 1500);
  const { isLoading } = useGetNewsQuery({
    ...filters,
    keywords: deboucedKeywords,
  });

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGE) {
      dispatch(
        setFilters({ key: "page_number", value: filters.page_number + 1 })
      );
    }
  };

  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      dispatch(
        setFilters({ key: "page_number", value: filters.page_number - 1 })
      );
    }
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch(setFilters({ key: "page_number", value: pageNumber }));
  };
  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} />

      <PaginationWrapper
        top
        bottom
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGE}
        currentPage={filters.page_number}
      >
        <NewsList isLoading={isLoading} news={news} />
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilters;
