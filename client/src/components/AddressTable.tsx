import React from "react";
import Table from "react-bootstrap/Table";
import { tableProps } from "../@types/all.types";
import "../App.css";

function AddressTable(props: tableProps) {
  return (
    <div className="table-div">
      <Table bordered hover variant="dark">
        <thead>
          <tr>
            <th>Gin &amp; Juice Token Holders</th>
          </tr>
        </thead>
        <tbody>
          {props.addressList.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  <a
                    href={`https://etherscan.io/address/${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {value}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default AddressTable;
