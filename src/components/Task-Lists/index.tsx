import ModalContent from '../Modal'
import { formikModel } from '../Main-Page/Model'
import { FormikProps } from 'formik'
import Task from './Task'



interface IProps {
    handleMode: (e: string) => void
    handleOpenModal: (e: boolean) => void
    openModal: boolean
    mode: string
    formik: FormikProps<formikModel>
    allTask: formikModel[]
    handleSelectedItems: (item: formikModel) => void
    handleAllTasks: (item: formikModel[]) => void
    priority: string
}

const TaskLists = ({ handleMode, handleOpenModal, openModal, mode, formik, allTask, handleSelectedItems, handleAllTasks, priority }: IProps) => {
    

    const handleEdit = (item: formikModel) => {
        handleMode('Update')
        allTask.map((selectedItem)=> {
            if (item.id == selectedItem.id ) {
                handleSelectedItems(selectedItem)
            }
        })
        handleOpenModal(true)
    }

    const handleDeleteItems = (item: formikModel) => {
        const filteredData = allTask.filter(data => data.id !== item.id)
        handleAllTasks(filteredData)
    }
    return (
        <>
            {
                priority == 'All' && (
                    allTask.map((item: formikModel) => {
                        return (
                            <Task item={item} handleDeleteItems={handleDeleteItems} handleEdit={handleEdit}/>
                        )
                    })
                )

            }
            {
                allTask.map((item) => {
                    if (item.priority == priority) {
                        return(
                            <Task item={item} handleDeleteItems={handleDeleteItems} handleEdit={handleEdit}/>
                        )
                    }
                })
            }
            {openModal && <ModalContent handleMode={handleMode} handleOpenModal={handleOpenModal} openModal={openModal} mode={mode} formik={formik} />}
        </>
    )
}

export default TaskLists
