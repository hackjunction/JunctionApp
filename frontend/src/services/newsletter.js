import _axios from 'services/axios'

const NewsletterService = {}

NewsletterService.subscribe = (email, country) => {
    return _axios.post('/newsletter', { email, country })
}

export default NewsletterService
