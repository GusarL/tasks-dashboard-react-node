import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFormik, FormikValues, FormikErrors } from 'formik';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { DateTime } from 'luxon';
import { ITask } from './types'

export function FormicTable() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const navigate = useNavigate();

    const handleTaskClick = (taskId: string, description: string | undefined): void => {
        navigate(`/tasks/${taskId}`, { state: { description: description }});
    };
    useEffect(  () => {
        const fetchData = async () => {
            const tasks = await fetch('http://localhost:3000/tasks');
            const json: ITask[] = await tasks.json() as ITask[]
            const activeTasks = json ? json.filter(task => task.obj_status === 'active') : []
            setTasks(activeTasks)
            return json;
        }
        void fetchData()
    }, []);

    const validationSchema = Yup.object({
        id: Yup.string().required(),
        name: Yup.number().required('Required').min(0, 'Must be greater than or equal to 0'),
        creation_date: Yup.date().required(),
        due_date: Yup.date().required(),
        start_date: Yup.date().required(),
        is_completed: Yup.boolean().required(),
        is_archived: Yup.boolean().required(),
        is_high_priority: Yup.boolean(),
        estimated_effort: Yup.number().required(),
        actual_effort: Yup.number().required(),
        physical_progress: Yup.number().required(),
        obj_status: Yup.string().required(),
        description: Yup.string(),
        project_id: Yup.number().required(),
        tags: Yup.array().of(Yup.string())
    });
    const formik = useFormik<{ tasks: ITask[] }>({
        initialValues: {
            tasks: tasks || [],
        },
        validationSchema: Yup.object({
            tasks: Yup.array().of(validationSchema),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
        enableReinitialize: true,
    });
    const handleBlur = (index: number, event: { target: { value: string; }; }) => {
        const { value } = event.target;
        formik.setFieldValue(`tasks[${index}].name`, value);
    };
    return (
        <TableContainer component={Paper}>
            <form onSubmit={formik.handleSubmit}>
                <Table sx={{minWidth: 650, maxWidth: 1200, mx: 'auto'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Tags</TableCell>
                            <TableCell align="center">Actual effort</TableCell>
                            <TableCell align="center">Estimated effort</TableCell>
                            <TableCell align="center">Due date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {formik.values.tasks.map((task: ITask, index: number) => (
                            <TableRow
                                key={task.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {border: 0},
                                    backgroundColor: task.is_high_priority ? '#ffcccc' : 'white'
                                }}
                                onClick={() => handleTaskClick(task.id, task.description)}
                            >
                                <TableCell component="th" scope="row">
                                    <TextField
                                        name={`tasks[${index}].name`}
                                        value={formik.values.tasks[index].name}
                                        onBlur={(event) => handleBlur(index, event)}
                                        onChange={formik.handleChange}
                                        error={Boolean((formik.touched.tasks as FormikValues[])[index]?.name && (formik.errors.tasks as FormikErrors<ITask>[])[index].name)}
                                        helperText={(formik.touched.tasks as FormikValues[])[index].name && (formik.errors.tasks as FormikErrors<ITask>[])[index].name}
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0 } }}
                                    />
                                </TableCell>
                                <TableCell align="center">{task.tags}</TableCell>
                                <TableCell align="center">{task.actual_effort}</TableCell>
                                <TableCell align="center">{task.estimated_effort}</TableCell>
                                <TableCell
                                    align="center">{DateTime.fromISO(task.due_date).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
        </TableContainer>
);
}
