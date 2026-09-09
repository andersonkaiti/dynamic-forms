import { Button } from '@components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@components/ui/field'
import { Input } from '@components/ui/input'
import { cn } from 'cn'
import { Reorder } from 'framer-motion'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
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

  const [draggingIndex, setDraggingIndex] = useState<null | number>(null)

  const handleSubmit = form.handleSubmit(({ links }) => {
    console.log(links)
  })

  function handleDragStart(index: number) {
    setDraggingIndex(index)
  }

  function handleDragEnd() {
    setDraggingIndex(null)
  }

  function handleReorder(newOrder: typeof links.fields) {
    if (draggingIndex === null) {
      return
    }

    const draggingLink = links.fields[draggingIndex]

    newOrder.forEach((link, index) => {
      if (link === draggingLink) {
        links.move(draggingIndex, index)
        setDraggingIndex(index)
      }
    })
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-4 p-5">
      <h1 className="font-semibold text-2xl tracking-tight">Links</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Reorder.Group axis="y" values={links.fields} onReorder={handleReorder}>
          <FieldGroup>
            {links.fields.map((link, index) => (
              <Reorder.Item
                key={link.id}
                value={link}
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                className="relative"
              >
                <div
                  className={cn(
                    'grid grid-cols-2 gap-4 transition-opacity',
                    draggingIndex !== null &&
                      draggingIndex !== index &&
                      'opacity-50',
                  )}
                >
                  <Field className="flex-1">
                    <FieldLabel htmlFor="title">Título</FieldLabel>
                    <Input
                      id="title"
                      {...form.register(`links.${index}.title`)}
                    />
                  </Field>

                  <Field className="flex-1" orientation="horizontal">
                    <Field>
                      <FieldLabel htmlFor="url">URL</FieldLabel>
                      <Input
                        id="url"
                        {...form.register(`links.${index}.url`)}
                      />
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
              </Reorder.Item>
            ))}
          </FieldGroup>
        </Reorder.Group>

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

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </div>
  )
}
