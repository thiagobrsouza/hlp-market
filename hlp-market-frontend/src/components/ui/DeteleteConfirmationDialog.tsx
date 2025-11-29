'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, title, message }: DeleteConfirmationDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    Confirmar Exclusão
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;