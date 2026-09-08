import { Button } from '@components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@components/ui/field'
import { Input } from '@components/ui/input'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

export function App() {
  const form = useForm({
    defaultValues: {
      links: [
        { title: 'Link 01', url: 'https://jstack.com.br' },
        { title: 'Link 02', url: 'https://instagram.com' },
      ],
    },
  })

  // hook sempre utilizado em formulários dinâmicos
  // mantém os componentes uncontrolled
  const links = useFieldArray({
    // contexto do form
    control: form.control,
    // nome da propriedade do formulário
    name: 'links',
  })

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-4 p-5">
      <h1 className="font-semibold text-2xl tracking-tight">Links</h1>

      <form className="space-y-4">
        <FieldGroup>
          {links.fields.map(({ id }, index) => (
            <div className="grid grid-cols-2 gap-4" key={id}>
              <Field className="flex-1">
                <FieldLabel htmlFor="title">Título</FieldLabel>
                <Input id="title" {...form.register(`links.${index}.title`)} />
              </Field>

              <Field className="flex-1" orientation="horizontal">
                <Field>
                  <FieldLabel htmlFor="url">URL</FieldLabel>
                  <Input id="url" {...form.register(`links.${index}.url`)} />
                </Field>

                <Button size="icon" variant="destructive" className="self-end">
                  <Trash2Icon className="size-4" />
                </Button>
              </Field>
            </div>
          ))}
        </FieldGroup>

        <Button className="w-full space-y-4 border-dashed" variant="outline">
          <PlusCircleIcon className="size-4" />
          Adicionar novo link
        </Button>
      </form>
    </div>
  )
}
