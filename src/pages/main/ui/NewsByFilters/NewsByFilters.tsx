import { useDebounce } from "@/shared/hooks/useDebounce";
import styles from "./styles.module.css";
import { useAppSelector } from "@/app/appStore";
import { useGetNewsQuery } from "@/entities/news/api/newsApi";
import { useGetCategoriesQuery } from "@/entities/category/api/categoriesApi";
import { NewsFilters } from "@/widgets/news";
import NewsListWithPagination from "../NewsListWithPagination/NewsListWithPagination";

const NewsByFilters = () => {
  const filters = useAppSelector((state) => state.news.filters);
  const news = useAppSelector((state) => state.news.news);

  const deboucedKeywords = useDebounce(filters.keywords as string, 1500);
  const { isLoading } = useGetNewsQuery({
    ...filters,
    keywords: deboucedKeywords,
  });

  const { data } = useGetCategoriesQuery(null);
  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} categories={data?.categories || []} />

      <NewsListWithPagination
        isLoading={isLoading}
        news={news}
        filters={filters}
      />
    </section>
  );
};

export default NewsByFilters;
