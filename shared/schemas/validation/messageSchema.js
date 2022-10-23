import * as yup from 'yup'

export default yup.object().shape({
    content: yup
        .string()
        .required()
        .min(2, 'Message must be at least 2 characters long'),
})
