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
        { title: 'Link 03', url: 'https://youtube.com' },
        { title: 'Link 04', url: 'https://facebook.com' },
      ],
    },
  })

  const links = useFieldArray({
    control: form.control,
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

                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="self-end"
                  onClick={() => links.remove(index)}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </Field>
            </div>
          ))}
        </FieldGroup>

        <div className="flex w-full gap-4">
          <Button
            type="button"
            className="flex-1 space-y-4 border-dashed"
            variant="outline"
            onClick={() => links.prepend({ title: '', url: '' })}
          >
            <PlusCircleIcon className="size-4" />
            Adicionar novo link no início
          </Button>

          <Button
            type="button"
            className="flex-1 space-y-4 border-dashed"
            variant="outline"
            onClick={() => links.append({ title: '', url: '' })}
          >
            <PlusCircleIcon className="size-4" />
            Adicionar novo link no final
          </Button>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            className="flex-1"
            variant="secondary"
            onClick={() => links.insert(1, { title: '', url: '' })}
          >
            Insert
          </Button>

          {/* Move um link de uma posição para outra, atualizando os índices */}
          <Button
            type="button"
            className="flex-1"
            variant="secondary"
            onClick={() => links.move(3, 1)}
          >
            Move
          </Button>

          <Button
            type="button"
            className="flex-1"
            variant="secondary"
            onClick={() => links.replace([])}
          >
            Replace
          </Button>

          {/* Troca dois links de posição sem atualizar os índices dos demais */}
          <Button
            type="button"
            className="flex-1"
            variant="secondary"
            onClick={() => links.swap(3, 1)}
          >
            Swap
          </Button>
        </div>
      </form>
    </div>
  )
}
