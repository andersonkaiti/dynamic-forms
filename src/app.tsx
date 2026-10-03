import { LinkItem } from '@components/link-item'
import { Button } from '@components/ui/button'
import { FieldGroup } from '@components/ui/field'
import { useDragging } from '@hooks/use-dragging'
import { useLinks } from '@hooks/use-links'
import { Reorder } from 'framer-motion'
import { PlusCircleIcon } from 'lucide-react'
import { FormProvider } from 'react-hook-form'

export function App() {
  const { form, handleSubmit, links } = useLinks()

  const { handleDragStart, handleDragEnd, handleReorder, draggingIndex } =
    useDragging({ items: links })

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

          <div className="flex w-full flex-col gap-4 sm:flex-row">
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
