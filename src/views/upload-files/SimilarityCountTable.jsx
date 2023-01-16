import React, { Fragment } from "react";
import { Table } from "reactstrap";

function SimilarityCountTable({ data }) {
  return (
    <Fragment>
      <Table className="mb-0">
        <thead>
          <tr>
            <th>Year</th>
            <th>Files</th>
            <th>Word count</th>
          </tr>
        </thead>
        <tbody>
          {data.year_details &&
            data.year_details.map((item, index) => (
              <tr key={index}>
                <td>{item ? item.year : "---"}</td>
                <td>{item ? item.file_count : "---"}</td>
                <td>{item ? item.word_count : "---"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default SimilarityCountTable;
