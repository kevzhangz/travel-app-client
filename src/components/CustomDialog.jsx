import { Button, Dialog, DialogActions, DialogContent, Slide, IconButton, Card, CardContent, Typography, Divider, Grid, Box } from '@mui/material'

const CustomDialog = (props) => {
  const { open, handleClose, component } = props
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="lg"
      fullWidth="true"
    >
      <DialogContent>
        { component }
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export {
  CustomDialog,
}