import { IPaginationProps } from "../../model/types";
import PaginationButons from "../PaginationButtons/PaginationButons";

interface Props {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
}

const Pagination = ({
  top,
  bottom,
  children,
  ...paginationProps
}: Props & IPaginationProps) => {
  return (
    <>
      {top && <PaginationButons {...paginationProps} />}
      {children}
      {bottom && <PaginationButons {...paginationProps} />}
    </>
  );
};

export default Pagination;
