import Header from "../../components/partials/dashboard/HeaderStyle/header";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import TableUsers from "../../components/usersTable";
import AxiosInstance from "../../utils/axiosInstance";
import EnhancedTable from "../../components/tableUsers";
import { Dropdown } from "react-bootstrap";

const UsersPage = () => {
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center gap-5 mt-5">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {role != "" ? role : "Role"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setRole("user");
                setConfirm("");
              }}
            >
              User
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setRole("expert");
                setConfirm("");
              }}
            >
              Expert
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setRole("company");
                setConfirm("");
              }}
            >
              Company
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {state == "" ? "State" : state == true ? "Active" : "Blocked"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setState(true)}>Active</Dropdown.Item>
            <Dropdown.Item onClick={() => setState(false)}>
              Blocked
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Confirm
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setConfirm(true);
                setRole("");
              }}
            >
              Confirmed
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setConfirm(false);
                setRole("");
              }}
            >
              Not Confirmed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
      <div className="d-flex justify-content-center">
        <div className="w-75 mt-5">
          <TableUsers pageSize={2} role={role} confirm={confirm} />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
