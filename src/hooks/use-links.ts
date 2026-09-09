import { useFieldArray, useForm } from 'react-hook-form'

export function useLinks() {
  const form = useForm({
    defaultValues: {
      links: [
        { title: 'Link 01', url: 'https://jstack.com.br' },
        { title: 'Link 02', url: 'https://instagram.com' },
        { title: 'Link 03', url: 'https://youtube.com' },
        { title: 'Link 04', url: 'https://facebook.com' },
      ],
    },
  })

  const links = useFieldArray({
    control: form.control,
    name: 'links',
  })

  const handleSubmit = form.handleSubmit(({ links }) => {
    console.log(links)
  })

  return {
    form,
    links,
    handleSubmit,
  }
}
