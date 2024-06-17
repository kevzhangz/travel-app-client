import { Button, Grid, Typography } from "@mui/material"
import Table from "./Table"

const CustomTableView = (props) => {
  return (
    <div>
      <Grid container spacing="1">
        <Grid item xs={8}>
          <Typography variant="h5" sx={{ textAlign: 'left' }}>
            Data {props.menu}
          </Typography>
        </Grid>
      </Grid>
      <Table data={props.data} columns={props.columns}/>
    </div>
  )
}

export default CustomTableView