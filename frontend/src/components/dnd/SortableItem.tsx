import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Grid2, Typography } from '@mui/material';
import React from 'react';

import { WidgetContainer } from '../widgets/WidgetContainer';

type Props = {
    id: string;
    label?: string;
    isOverlay?: boolean;
    isPlaceholder?: boolean;
    editMode: boolean;
};

export const SortableItem: React.FC<Props> = ({ id, label, editMode, isOverlay = false, isPlaceholder = false }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    return (
        <Grid2
            size={{ xs: 12, md: 6, lg: 4 }} // Match size with widgets
            ref={!isOverlay ? setNodeRef : undefined}
            {...(!isOverlay ? attributes : {})}
            {...(!isOverlay ? listeners : {})}
            sx={{
                opacity: isDragging ? 0.3 : 1,
                transition,
                transform: transform ? CSS.Transform.toString(transform) : undefined,
            }}
        >
            {isDragging ? (
                // Placeholder box when dragging
                <Box
                    sx={{
                        width: '100%',
                        height: 200,
                        backgroundColor: 'rgba(150, 150, 150, 0.3)', // Light gray placeholder
                        border: '2px dashed gray', // Dashed border for visibility
                        borderRadius: 2,
                    }}
                />
            ) : (
                <WidgetContainer editMode={editMode}>
                    <Typography variant='h6' textAlign='center'>
                        {label}
                    </Typography>
                </WidgetContainer>
            )}
        </Grid2>
    );
};
