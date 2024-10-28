import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Autocomplete,
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  acceptDocument,
  deleteDriverDocumentData,
  getDriverDocsAll,
} from "../../../api-requests/diver-documentsRouter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import "./driverDocs.css"

interface Document {
  doc_id: number;
  doc_number: string;
  doc_type: string;
  driver_id: number;
  front_image: string;
  back_image: string;
  status: boolean;
}

export default function DocumentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<Document[]>([]);
  const [initialUpload, setInitialUpload] = useState(false);
  const [openImage, setOpenImage] = useState<string | undefined>(undefined);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // Fetch all driver documents from the API
      const documentRecords = await getDriverDocsAll();

      console.log("Full API response:", documentRecords);

      if (Array.isArray(documentRecords)) {
        setRows(documentRecords);
      } else {
        console.error("Data fetched is not an array:", documentRecords);
      }
    } catch (error) {
      console.error("Error fetching driver documents:", error);
    }
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getData();
    }
  };

  const handleAccept = async (id: number) => {
    try {
      await acceptDocument(id);

      setInitialUpload(true); // Set initialUpload to true after the first action

      // Update the status of the accepted document
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.doc_id === id ? { ...row, status: true } : row
        )
      );
    } catch (error) {
      console.error("Error accepting document:", error);
    }
  };

  const handleCloseImage = () => {
    setOpenImage(undefined);
  };

  const handleReject = async (id: number) => {
    try {
      await deleteDriverDocumentData(id);

      setInitialUpload(true); // Set initialUpload to true after the first action

      // Remove the rejected document from the state
      setRows((prevRows) => prevRows.filter((row) => row.doc_id !== id));
    } catch (error) {
      console.error("Error rejecting document:", error);
    }
  };

  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ Width: "100%", overflow: "hidden", padding: "12px" }}>
          <Stack
            direction="row"
            spacing={65}
            className="my-2 mb-2"
            sx={{ padding: "10px" }}
          >
            <Stack>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ width: " 180px", ml: "16px" }}
              >
                Documents List
              </Typography>
            </Stack>
            <Stack>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={rows}
                sx={{ width: 250 }}
                onChange={(e, v) => filterData(v)}
                getOptionLabel={(rows) => rows.doc_number || ""}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Search By Doc" />
                )}
              />
            </Stack>
          </Stack>
          <Divider />
          <Box height={10} />

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "lightgray" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Document ID</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Document Number
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Document Type
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Driver ID
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Front Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Back Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  {!initialUpload && (
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.doc_id}
                      >
                        <TableCell>{row.doc_id}</TableCell>
                        <TableCell align="center">{row.doc_number}</TableCell>
                        <TableCell align="center">{row.doc_type}</TableCell>
                        <TableCell align="center">{row.driver_id}</TableCell>
                        <TableCell align="center">
                          <img
                            src={row.front_image}
                            alt="Front"
                            style={{ maxWidth: "100px", cursor: "pointer" }}
                            onClick={() => setOpenImage(row.front_image)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <img
                            src={row.back_image}
                            alt="Back"
                            style={{ maxWidth: "100px", cursor: "pointer" }}
                            onClick={() => setOpenImage(row.back_image)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {row.status ? "Accepted" : "Pending"}
                        </TableCell>
                        {!initialUpload && (
                          <TableCell align="center">
                            <IconButton
                              color="primary"
                              onClick={() => handleAccept(row.doc_id)}
                              sx={{ marginRight: "10px" }}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleReject(row.doc_id)}
                            >
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {rows.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Skeleton variant="rectangular" width={210} height={118} />
        </Box>
      )}
    </>
  );
}
