import { Button, ButtonGroup } from "@mui/material";

export default function AdminButtons() {
  return (
    <ButtonGroup fullWidth sx={{margin:"10px 0",gap:1}}>
      <Button variant="contained" color="warning">
        Edit
      </Button>
      <Button variant="contained" color="error">
        Delete
      </Button>
    </ButtonGroup>
  );
}
