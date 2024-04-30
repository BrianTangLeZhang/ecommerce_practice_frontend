import { Button, ButtonGroup } from "@mui/material";

export default function AdminButtons() {
  return (
    <ButtonGroup fullWidth>
      <Button variant="contained" color="info">
        Edit
      </Button>
      <Button variant="contained" color="error">
        Delete
      </Button>
    </ButtonGroup>
  );
}
