import React from "react";
import Table from "react-bootstrap/Table";
import { tableProps } from "../@types/all.types";
import "../App.css";

const AddressTable = (props: tableProps) => {
  // let Rows = (props: tableProps) => {
  //   let rows;
  //   list.map((value, index) => {
  //       <tr id={index.toString()}>
  //         <td>{value}</td>
  //       </tr>
  //   });
  // };
  let address = props.addressList;
  return (
    <div className="table-div">
      <Table bordered hover variant={"dark"}>
        <thead>
          <tr>
            <th>Gin N Juice Token Holders</th>
          </tr>
        </thead>
        <tbody>
          {() => {
            return address.map((address, key) => (
              <tr key={key}>
                <td>{address}</td>
              </tr>
            ));
          }}
        </tbody>
      </Table>
    </div>
  );
};

export default AddressTable;
