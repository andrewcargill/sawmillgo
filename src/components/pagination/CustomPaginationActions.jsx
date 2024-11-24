import React from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const CustomPaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  hasMoreLogs,
}) => {
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const getItemAriaLabel = (type) => {
    if (type === "previous") {
      return "Go to previous page";
    }
    if (type === "next") {
      return "Go to next page";
    }
    return "";
  };

  return (
    <div>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label={getItemAriaLabel("previous")}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={!hasMoreLogs}
        aria-label={getItemAriaLabel("next")}
      >
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
};

export default CustomPaginationActions;
