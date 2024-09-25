import { useState } from "react"
import Header from "../Header"
import TaskLists from "../Task-Lists"
import { useFormik } from "formik"
import { formikModel } from "./Model"
import * as Yup from 'yup'

const TaskManager = () => {
    const [mode, setMode] = useState('Save')
    const [openModal, setOpenModal] = useState(false)
    const [allTask, setAllTask] = useState<formikModel[]>([])
    const [selectedItems, setselectedItems] = useState<formikModel>()
    const [priority, setPriority] = useState('All')

    const handleMode = (e: string) => {
        setMode(e)
    }

    const handleOpenModal = (e: boolean) => {
        setOpenModal(e)
    }

    const handleSelectedItems = (item: formikModel) => {
        setselectedItems(item)
    }

    const handleAllTasks = (item: formikModel[]) => {
        setAllTask(item)
    }

    const handleSetPriority = (e: string) => {
        setPriority(e)
    }

    const initialFormikValues: formikModel = {
        id: mode === 'Update' ? selectedItems?.id : 0,
        title: mode == 'Update' ? selectedItems?.title : '',
        description: mode == 'Update' ? selectedItems?.description : '',
        priority: mode == 'Update' ? selectedItems?.priority : '',
        createdAt: mode == 'Update' ? selectedItems?.createdAt : '',
        updatedAt: mode == 'Update' ? selectedItems?.updatedAt : ''
    }

    const validationSchema = Yup.object({
        id: Yup.number().required('ID is required'),
        title: Yup.string()
        .min(0, 'Too Short!')
        .max(250, 'Too Long!')
        .required('Title is Required'),
        description: Yup.string()
        .min(0, 'Too Short!')
        .max(1000, 'Too Long!')
        .required('Description is Required'),
        priority: Yup.string().required('Priority is required'),
    })

    const handleSubmit = (values: formikModel) => {

        if (mode == 'Save'){
            setAllTask(prevTasks => [...prevTasks, values])
        }

        if (mode == 'Update'){
            allTask.map((data) => {
                if (data.id == selectedItems?.id) {
                    data.title = values.title
                    data.description = values.description
                    data.priority = values.priority
                    data.updatedAt = values.updatedAt
                }
            })
        }

        handleOpenModal(false)
        formik.resetForm()
        handleMode('Save')
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialFormikValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    })


    return (
        <div>
            <Header priority={priority} handleSetPriority={handleSetPriority} handleOpenModal={handleOpenModal} openModal={openModal} mode={mode} formik={formik} handleMode={handleMode} />
            <TaskLists priority={priority} handleAllTasks={handleAllTasks} handleSelectedItems={handleSelectedItems} allTask={allTask} handleMode={handleMode} handleOpenModal={handleOpenModal} openModal={openModal} mode={mode} formik={formik} />
        </div>
    )
}

export default TaskManager
