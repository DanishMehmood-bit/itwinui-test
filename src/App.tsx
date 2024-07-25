/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./App.scss";

import { DropdownMenu, Table } from "@itwin/itwinui-react";
import React, {useEffect, useState} from "react";

import { CellProps } from "@itwin/itwinui-react/cjs/react-table/react-table";
// import { SvgMore } from "@itwin/itwinui-react/cjs/utils";

const d: any[]=[];
const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    for (let i=0; i<100; i++) {
      d.push({ name: `danish ${i}`, description: "test" });
    }
    setData(d);
  }, []);

  const columns = [
      {
        Header: "Table",
        columns: [
          {
            id: "name",
            Header: "Name",
            accessor: "name",
            maxWidth: 350,
            Cell: (props: CellProps<any>) => (
              <div
                data-tip={props.row.original.name}
                className="iac-iModelCell"
              >
                <span>{props.value}</span>
              </div>
            ),
          },
          {
            id: "description",
            Header: "Description",
            accessor: "description",
            disableSortBy: true,
          },
          {
            id: "LastModified",
            Header: "Created Date Time",
            accessor: "createdDateTime",
            maxWidth: 350,
            Cell: (props: CellProps<any>) => {
              const date = props.data[props.row.index].createdDateTime;
              return date ? new Date(date).toDateString() : "";
            },
          },
          {
            id: "options",
            style: { width: "50px" },
            disableSortBy: true,
            maxWidth: 50,
            Cell: (props: CellProps<any>) => {
              const moreOptions = (close: () => void) => {
                const options = undefined;
                return options !== undefined ? options : [];
              };

              return (
                <DropdownMenu menuItems={moreOptions}>
                  <div
                    className="iac-options-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    MORE
                  </div>
                </DropdownMenu>
              );
            },
          },
        ],
      },
    ];

  console.log("DATA", data);
  return (
    <div className="viewer-container">
      <button onClick={() => setData([{ name: "danish", description: "test", fal: "aa" }])}>CLICK ME!</button>
      <Table
        columns={columns}
        data={data}
        emptyTableContent={data.length === 0 ? "EMPTY..." : "LOADING..."}
      />
    </div>
  );
};

export default App;
