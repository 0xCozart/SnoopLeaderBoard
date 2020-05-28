import React from "react";
import Table from "react-bootstrap/Table";
import { tableProps } from "../@types/all.types";
import "../App.css";

function AddressTable(props: tableProps) {
  return (
    <Table bordered hover variant={"dark"}>
      <thead>
        <tr>
          <th>Gin N Juice Token Holders</th>
        </tr>
      </thead>
      <tbody>
        {props.addressList.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default AddressTable;
