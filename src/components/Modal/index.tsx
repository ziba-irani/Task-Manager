import CloseIcon from '@mui/icons-material/Close'
import { Button, Stack, Modal, Box, TextField, IconButton, MenuItem } from "@mui/material"
import styled from 'styled-components'
import { FormikProps } from 'formik'
import { formikModel } from '../Main-Page/Model'
import { memo } from 'react'

interface IProps {
    handleOpenModal: (e: boolean) => void
    openModal: boolean
    mode: string
    formik: FormikProps<formikModel>
    handleMode: (e: string) => void
}

const ModalBox = memo(styled(Box)`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 400px;
background-color: #ffffff;
border: 2px solid #713FFF;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
padding: 2rem;
display: flex;
flex-direction: column;
gap: 1.5rem;
border-radius: 8px;
margin-top: 1rem;
`)

const StyledTextField = memo(styled(TextField)`
.MuiOutlinedInput-root {
    margin: 0.8rem 0rem;
    border-radius: 5px;
}
`)

const ModalTitle = memo(styled.h2`
font-size: 1.25rem;
font-weight: 500;
margin: 0;
`)

const StyledSubmitButton = memo(styled(Button)`
background-color: #713FFF;
color: white;
text-transform: none;
margin-top: 1rem;
&:hover {
    background-color: #5a2dff;
}
`)

const ModalContent = memo(({ handleOpenModal, openModal, mode, formik, handleMode }: IProps) => {


    return (
        <Modal
            open={openModal}
            onClose={() => { handleOpenModal(false); formik.resetForm(); handleMode('Save') }}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <ModalBox>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    {
                        mode == 'Save' && (
                            <ModalTitle id="modal-title">Add New Task</ModalTitle>
                        )
                    }
                    {
                        mode == 'Update' && (
                            <ModalTitle id="modal-title">Edit Current Task</ModalTitle>
                        )
                    }
                    <IconButton onClick={() => { handleOpenModal(false); formik.resetForm(); handleMode('Save') }}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <form onSubmit={formik.handleSubmit}>
                    <StyledTextField
                        id="id"
                        name="id"
                        label="ID"
                        variant="outlined"
                        type="number"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.id}
                        error={formik.touched.id && Boolean(formik.errors.id)}
                        helperText={formik.touched.id && formik.errors.id}
                    />
                    <StyledTextField
                        id="title"
                        name="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <StyledTextField
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        multiline
                        rows={4} />
                    <StyledTextField
                        select
                        id="priority"
                        name="priority"
                        label="Priority"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.priority}
                        error={formik.touched.priority && Boolean(formik.errors.priority)}
                        helperText={formik.touched.priority && formik.errors.priority}
                        fullWidth
                    >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </StyledTextField>
                    {mode === 'Save' && (
                        <StyledTextField
                            id="createdAt"
                            name="createdAt"
                            label="Created At"
                            type="datetime-local"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.createdAt}
                            error={formik.touched.createdAt && Boolean(formik.errors.createdAt)}
                            helperText={formik.touched.createdAt && formik.errors.createdAt}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    )}
                    {mode === 'Update' && (
                        <StyledTextField
                            id="updatedAt"
                            name="updatedAt"
                            label="Updated At"
                            type="datetime-local"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.updatedAt}
                            error={formik.touched.updatedAt && Boolean(formik.errors.updatedAt)}
                            helperText={formik.touched.updatedAt && formik.errors.updatedAt}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    )}
                    <StyledSubmitButton
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </StyledSubmitButton>
                </form>
            </ModalBox>
        </Modal>
    )
})

export default ModalContent
