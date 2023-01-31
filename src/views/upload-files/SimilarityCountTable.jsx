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
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item ? item.year : "---"}</td>
                <td>{item ? item.file_count : "---"}</td>
                <td>{item ? item.word_count : "---"}</td>
              </tr>
            ))}
          {data && (
            <tr>
              <td>
                <strong>Total:</strong>
              </td>
              <td>
                <strong>
                  {" "}
                  {[...data.map((i) => parseInt(i.file_count))].reduce(
                    (a, b) => a + b,
                    0
                  )}{" "}
                </strong>
              </td>
              <td>
                {" "}
                <strong>
                  {" "}
                  {[...data.map((i) => parseInt(i.word_count))].reduce(
                    (a, b) => a + b,
                    0
                  )}{" "}
                </strong>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default SimilarityCountTable;
