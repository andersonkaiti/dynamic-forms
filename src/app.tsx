import { Button } from '@components/ui/button'
import { FieldGroup } from '@components/ui/field'
import { Reorder } from 'framer-motion'
import { PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { LinkItem } from './components/link-item'

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

      <FormProvider {...form}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Reorder.Group
            axis="y"
            values={links.fields}
            onReorder={handleReorder}
          >
            <FieldGroup>
              {links.fields.map((link, index) => (
                <LinkItem
                  link={link}
                  index={index}
                  key={link.id}
                  isDraggingActive={
                    draggingIndex !== null && draggingIndex !== index
                  }
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onRemove={() => links.remove(index)}
                />
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
      </FormProvider>
    </div>
  )
}
