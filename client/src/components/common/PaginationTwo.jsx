import React from "react";

export default function PaginationTwo({
  pageNumber,
  setPageNumber,
  data,
  pageCapacity,
}) {
  const handlePrevious = () => {
    if (pageNumber == 1) {
    } else {
      setPageNumber((pre) => pre - 1);
    }
  };
  const handleNext = () => {
    if (Math.ceil(data.length / pageCapacity) > pageNumber) {
      setPageNumber((pre) => pre + 1);
    }
  };

  return (
    <div className="pagination -buttons">
      <button className="pagination__button -prev " onClick={handlePrevious}>
        <i className="icon icon-chevron-left"></i>
      </button>

      <div className="pagination__count">
        <span
          onClick={() => setPageNumber(1)}
          className={` pointer border border-primary-subtle p-2 rounded ${pageNumber == 1 ? "bg-info-subtle" : ""} `}
          href="#"
        >
          1
        </span>
        {data.length > pageCapacity ? (
          <span
            onClick={() => setPageNumber(2)}
            className={` pointer border border-primary-subtle p-2 rounded ${pageNumber == 2 ? "bg-info-subtle" : ""} `}
            href="#"
          >
            2
          </span>
        ) : (
          ""
        )}
        {data.length > pageCapacity * 2 ? (
          <span
            onClick={() => setPageNumber(3)}
            className={` pointer border border-primary-subtle p-2 rounded ${pageNumber == 3 ? "bg-info-subtle" : ""} `}
            href="#"
          >
            3
          </span>
        ) : (
          ""
        )}

        {data.length > pageCapacity * 4 && pageNumber != 4 && <span>...</span>}

        {pageNumber > 3 &&
          Math.ceil(data.length / pageCapacity) != pageNumber && (
            <span href="#" className="pointer border border-primary-subtle p-2 rounded bg-info-subtle">
              {pageNumber}
            </span>
          )}
        {data.length > pageCapacity * 4 &&
          pageNumber < Math.ceil(data.length / pageCapacity) - 1 &&
          pageNumber > 3 && <span className="">...</span>}
        {data.length > pageCapacity * 3 + 1 ? (
          <span
            className={` pointer border border-primary-subtle p-2 rounded
             ${ pageNumber == Math.ceil(data.length / pageCapacity)
                ? "bg-info-subtle"
                : ""}
            `}
            onClick={() => setPageNumber(Math.ceil(data.length / pageCapacity))}
          >
            {Math.ceil(data.length / pageCapacity)}
          </span>
        ) : (
          ""
        )}
      </div>

      <button onClick={handleNext} className="pagination__button -next">
        <i className="icon icon-chevron-right"></i>
      </button>
    </div>
  );
}
