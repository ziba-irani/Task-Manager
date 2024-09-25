import { Button, MenuItem, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import styled from 'styled-components'
import ModalContent from "../Modal"
import { FormikProps } from "formik"
import { formikModel } from "../Main-Page/Model"

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 1rem; 
`

const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`

const StyledButton = styled(Button)`
  background-color: #713FFF !important;
  color: white !important;
  padding: 0.75rem 1.25rem !important;
  border-radius: 1.25rem !important;
  text-transform: none !important; 

  .MuiButton-startIcon {
    margin-right: 0.5rem;
    font-size: 2rem;
  }

  .MuiButton-label {
    font-size: 1.125rem;
    font-weight: 600;
  }
`

const StyledTextField = styled(TextField)`
margin-bottom: 1rem;
max-width: 150px;
& .MuiOutlinedInput-root {
    border-radius: 4px;
}
`

interface IProps {
    handleOpenModal: (e: boolean) => void
    openModal: boolean
    mode: string
    formik: FormikProps<formikModel>
    handleMode: (e: string) => void
    handleSetPriority: (e: string) => void
    priority: string
}

const Header = ({ handleOpenModal, openModal, mode, formik, handleMode, handleSetPriority, priority }: IProps) => {
    
    return (
        <>
            <HeaderContainer>
                <Title>Task List</Title>
                <StyledButton
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenModal(true)}
                >
                    Add Task
                </StyledButton>
                <StyledTextField
                    select
                    id="priority"
                    name="priority"
                    label="Priority"
                    variant="outlined"
                    onChange={(e) => handleSetPriority(e.target.value)}
                    value={priority}
                    fullWidth
                    className='!my-2'
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </StyledTextField>
            </HeaderContainer>
            {openModal && <ModalContent handleMode={handleMode} handleOpenModal={handleOpenModal} openModal={openModal} mode={mode} formik={formik} />}
        </>
    )
}

export default Header
