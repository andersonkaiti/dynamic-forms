import { useState } from 'react'
import type { UseFieldArrayReturn } from 'react-hook-form'

type UseFieldArray = Pick<UseFieldArrayReturn, 'fields' | 'move'>

interface IUseDraggingParams<T extends UseFieldArray> {
  items: T
}

export function useDragging<T extends UseFieldArray>({
  items,
}: IUseDraggingParams<T>) {
  const [draggingIndex, setDraggingIndex] = useState<null | number>(null)

  function handleDragStart(index: number) {
    setDraggingIndex(index)
  }

  function handleDragEnd() {
    setDraggingIndex(null)
  }

  function handleReorder(newOrder: T['fields']) {
    if (draggingIndex === null) {
      return
    }

    const draggingItem = items.fields[draggingIndex]

    newOrder.forEach((item, index) => {
      if (item === draggingItem) {
        items.move(draggingIndex, index)
        setDraggingIndex(index)
      }
    })
  }

  return {
    handleDragStart,
    handleDragEnd,
    handleReorder,
    draggingIndex,
  }
}
