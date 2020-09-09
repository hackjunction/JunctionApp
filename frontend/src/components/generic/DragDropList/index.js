import React, { useCallback } from 'react'

import { Box, List, ListSubheader } from '@material-ui/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
}

const getItemStyle = (isDragging, draggableStyle) => {
    if (isDragging) {
        return {
            userSelect: 'none',
            background: 'lightgreen',
            ...draggableStyle,
        }
    }

    return {
        userSelect: 'none',
        ...draggableStyle,
    }
}

const getListStyle = isDraggingOver => {
    if (isDraggingOver) {
        return {
            paddingBottom: '50px',
            overflow: 'scroll',
            background: 'rgba(0,0,0,0.10)',
        }
    }
    return {
        paddingBottom: '50px',
        overflow: 'scroll',
        background: 'rgba(0,0,0,0.05)',
    }
}

const DragDropList = ({
    value,
    onChange,
    topTitle,
    bottomTitle,
    renderTopItem = () => {},
    renderBottomItem = () => {},
}) => {
    const state = {
        top: value?.top ?? [],
        bottom: value?.bottom ?? [],
    }

    const handleDragEnd = useCallback(
        result => {
            const { source, destination } = result

            if (!destination) return

            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    state[source.droppableId],
                    source.index,
                    destination.index
                )

                onChange({
                    ...value,
                    [source.droppableId]: items,
                })
            } else {
                const { top, bottom } = move(
                    state[source.droppableId],
                    state[destination.droppableId],
                    source,
                    destination
                )

                onChange({
                    ...value,
                    top,
                    bottom,
                })
            }
        },
        [state, value, onChange]
    )

    return (
        <Box p={2} style={{ background: 'white' }}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="top">
                    {(provided, snapshot) => (
                        <List
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            subheader={
                                <ListSubheader style={{ background: 'white' }}>
                                    {topTitle}
                                </ListSubheader>
                            }
                        >
                            {state.top.map((id, index) => (
                                <Draggable
                                    key={id}
                                    draggableId={id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {renderTopItem(id, index)}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
                <Droppable droppableId="bottom">
                    {(provided, snapshot) => (
                        <List
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            subheader={
                                <ListSubheader style={{ background: 'white' }}>
                                    {bottomTitle}
                                </ListSubheader>
                            }
                        >
                            {state.bottom.map((id, index) => (
                                <Draggable
                                    key={id}
                                    draggableId={id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {renderBottomItem(id, index)}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    )
}

export default DragDropList
